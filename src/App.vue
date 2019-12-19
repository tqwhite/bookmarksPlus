<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Main Grid</router-link> |
      <router-link to="/viewLinks">Auxilliary Links</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
//Note: router initialization is router/index.js
</script>


<style lang="less">
body {
  background: #004643;
  color:white;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
/* https://www.happyhues.co/palettes/10 */
#nav {
  border-bottom: 0.5pt solid #42b983;
  text-align: right;
  a {
    font-weight: bold;
    color: #f9bc60;
    text-decoration: none;

    &.router-link-exact-active {
      color: #aaa;
      cursor: default;
    }
  }
}
</style>
