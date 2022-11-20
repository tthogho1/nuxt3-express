<template>
    <div>
      <header>Nuxt3サンプルアプリケーション</header>
      <div class="container">
        <slot />
      </div>
      <footer>
        © 2022 mamezou-tech
      </footer>
    </div>
  </template>
  
  <style scoped>
  header {
    border-bottom-style: solid;
    padding: 1rem;
  }
  footer {
    margin-top: 2rem;
    background-color: #8080ee;
    padding: 1rem;
  }
  .container {
    margin: 2rem;
  }
  </style>