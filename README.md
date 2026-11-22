# Biblioteca

Sistema acadêmico de gestão de biblioteca com Vue 3, Composition API, Vite, Vue Router, Pinia e Chart.js.

## Executar

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Acesso de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Bibliotecária | admin@biblioteca.com | 123456 |
| Leitora | ana@biblioteca.com | 123456 |

O catálogo e as categorias são públicos. As rotas de acervo, usuários e painel exigem perfil de bibliotecário. Leitores autenticados acompanham apenas seus próprios empréstimos.

## Organização

- `src/components`: componentes reutilizáveis de interface e formulários.
- `src/views`: páginas do sistema.
- `src/stores/library.js`: dados, persistência e regras de negócio.
- `src/router/index.js`: rotas e controle de acesso.
- `src/assets/main.css`: identidade visual e layout responsivo.

## Fluxo principal

1. Entre com a conta de bibliotecária.
2. Cadastre um livro em Acervo e um leitor em Usuários.
3. Abra o livro e selecione Emprestar livro.
4. Escolha o usuário e confirme o empréstimo.
5. Acompanhe o prazo em Empréstimos e registre a devolução.

Os empréstimos duram 7 dias. Um leitor pode ter até 3 empréstimos ativos e não pode fazer novos empréstimos enquanto possuir atraso. A disponibilidade e os status são calculados a partir dos empréstimos ativos. O ISBN aceita exatamente 10 ou 13 dígitos. A quantidade de exemplares não pode ficar abaixo da quantidade emprestada.

Os dados e a sessão são persistidos em localStorage. A autenticação é simulada para fins acadêmicos; uma aplicação de produção exige servidor e autenticação real. As capas são composições em CSS e não dependem de imagens externas.
