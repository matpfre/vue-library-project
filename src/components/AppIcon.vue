<script setup>
defineProps({ name: String, size: { default: 20 } })
const paths = {
  book: 'M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4z M12 5v15',
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  stack: 'm3 7 9-4 9 4-9 4z M3 12l9 4 9-4 M3 17l9 4 9-4',
  loan: 'M4 7h15m-4-4 4 4-4 4 M20 17H5m4-4-4 4 4 4',
  users:
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-4 M16 3a4 4 0 0 1 0 8',
  chart: 'M4 3v18h17 M8 16v-5 M13 16V6 M18 16v-8',
  settings:
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z',
  help: 'M9 9a3 3 0 1 1 5 2c-2 1-2 2-2 3 M12 17h.01 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20',
  logout: 'M9 4H4v16h5 M10 12h11m-4-4 4 4-4 4',
  search: 'M21 21l-5-5 M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14',
  bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  chevron: 'm8 10 4 4 4-4',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  plus: 'M12 5v14 M5 12h14',
  close: 'm6 6 12 12 M6 18 18 6',
  clock: 'M12 8v4l3 2 M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20',
}
</script>
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.book" />
  </svg>
</template>
