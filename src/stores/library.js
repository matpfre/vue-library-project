import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
const day = 86400000
export const dateLabel = (value) => new Date(value).toLocaleDateString('pt-BR')
export const loanStatus = (loan) =>
  Date.now() > loan.dueAt
    ? 'Atrasado'
    : loan.dueAt - Date.now() <= 2 * day
      ? 'Vence em breve'
      : 'No prazo'
const seeds = [
  [
    'Dom Casmurro',
    'Machado de Assis',
    'Literatura brasileira',
    1899,
    '9788535914849',
    'olive',
    'Uma história. Muitas versões.',
    '01',
  ],
  [
    'O pequeno príncipe',
    'Antoine de Saint-Exupéry',
    'Literatura estrangeira',
    1943,
    '9788522031443',
    'sand',
    'O essencial é invisível aos olhos.',
    '02',
  ],
  [
    'A hora da estrela',
    'Clarice Lispector',
    'Literatura brasileira',
    1977,
    '9788535914840',
    'rose',
    'Quanto ao futuro.',
    '03',
  ],
  [
    '1984',
    'George Orwell',
    'Ficção científica',
    1949,
    '9788535914841',
    'blue',
    'O grande irmão está de olho.',
    '04',
  ],
  [
    'O cortiço',
    'Aluísio Azevedo',
    'Literatura brasileira',
    1890,
    '9788535914842',
    'rust',
    'Um retrato do Brasil.',
    '05',
  ],
  [
    'Sapiens',
    'Yuval Noah Harari',
    'História',
    2011,
    '9788535914843',
    'cream',
    'Uma breve história da humanidade.',
    '06',
  ],
  [
    'A revolução dos bichos',
    'George Orwell',
    'Literatura estrangeira',
    1945,
    '9788535914844',
    'olive',
    'Todos os animais são iguais.',
    '07',
  ],
  [
    'Hábitos atômicos',
    'James Clear',
    'Desenvolvimento pessoal',
    2018,
    '9788535914845',
    'sand',
    'Pequenas mudanças, grandes resultados.',
    '08',
  ],
  [
    'Capitães da areia',
    'Jorge Amado',
    'Literatura brasileira',
    1937,
    '9788535914846',
    'blue',
    'As ruas também contam histórias.',
    '09',
  ],
  [
    'O universo numa casca de noz',
    'Stephen Hawking',
    'Ciência',
    2001,
    '9788535914847',
    'rose',
    'Uma viagem pelo espaço e pelo tempo.',
    '10',
  ],
  [
    'Orgulho e preconceito',
    'Jane Austen',
    'Romance',
    1813,
    '9788535914848',
    'rust',
    'O amor além das primeiras impressões.',
    '11',
  ],
  [
    'Clean Code',
    'Robert C. Martin',
    'Tecnologia',
    2008,
    '9788535914850',
    'olive',
    'A arte de escrever código limpo.',
    '12',
  ],
].map((b, i) => ({
  id: String(i + 1),
  title: b[0],
  author: b[1],
  category: b[2],
  year: b[3],
  isbn: b[4],
  color: b[5],
  subtitle: b[6],
  edition: b[7],
  copies: i === 3 ? 1 : 3,
}))
function saved(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}
export const useLibrary = defineStore('library', () => {
  const books = ref(saved('library.books', seeds))
  const users = ref(
    saved('library.users', [
      { id: '1', name: 'Ana Oliveira', email: 'ana@biblioteca.com', type: 'Aluno' },
      { id: '2', name: 'Pedro Santos', email: 'pedro@biblioteca.com', type: 'Professor' },
      { id: '3', name: 'Mariana Costa', email: 'mariana@biblioteca.com', type: 'Aluno' },
    ]),
  )
  const loans = ref(
    saved('library.loans', [
      {
        id: '1',
        bookId: '4',
        userId: '2',
        createdAt: Date.now() - 10 * day,
        dueAt: Date.now() - 3 * day,
        returnedAt: null,
      },
      {
        id: '2',
        bookId: '3',
        userId: '1',
        createdAt: Date.now() - 6 * day,
        dueAt: Date.now() + day,
        returnedAt: null,
      },
    ]),
  )
  const session = ref(saved('library.session', null))
  for (const [key, value] of Object.entries({ books, users, loans, session }))
    watch(value, (v) => localStorage.setItem('library.' + key, JSON.stringify(v)), { deep: true })
  const active = computed(() => loans.value.filter((l) => !l.returnedAt))
  const categories = computed(() => [...new Set(books.value.map((b) => b.category))])
  const userLoans = (id) => active.value.filter((l) => l.userId === id)
  const available = (book) => book.copies - active.value.filter((l) => l.bookId === book.id).length
  const status = (book) =>
    active.value.some((l) => l.bookId === book.id && loanStatus(l) === 'Atrasado')
      ? 'Atrasado'
      : available(book) > 0
        ? 'Disponível'
        : 'Emprestado'
  function lend(bookId, userId) {
    const book = books.value.find((b) => b.id === bookId)
    if (!users.value.some((u) => u.id === userId)) throw Error('Selecione um usuário.')
    if (!book || available(book) < 1) throw Error('Este livro não possui exemplares disponíveis.')
    if (userLoans(userId).some((l) => loanStatus(l) === 'Atrasado'))
      throw Error('Este usuário possui empréstimo atrasado.')
    if (userLoans(userId).length >= 3)
      throw Error('O usuário atingiu o limite de 3 empréstimos ativos.')
    loans.value.push({
      id: crypto.randomUUID(),
      bookId,
      userId,
      createdAt: Date.now(),
      dueAt: Date.now() + 7 * day,
      returnedAt: null,
    })
  }
  function removeBook(id) {
    if (active.value.some((l) => l.bookId === id))
      throw Error('Não é possível excluir um livro com empréstimos ativos.')
    books.value = books.value.filter((b) => b.id !== id)
  }
  function login(email, password) {
    if (password !== '123456') throw Error('E-mail ou senha incorretos.')
    if (email === 'admin@biblioteca.com')
      session.value = { name: 'Helena Martins', role: 'admin', email }
    else {
      const user = users.value.find((u) => u.email === email)
      if (!user) throw Error('E-mail ou senha incorretos.')
      session.value = { ...user, role: 'reader' }
    }
  }
  return {
    books,
    users,
    loans,
    session,
    active,
    categories,
    userLoans,
    available,
    status,
    lend,
    removeBook,
    login,
  }
})
