<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home!</router-link> |
      <router-link to="/viewLinks">View Links</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
body {
  background: #efd;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  border-bottom: 0.5pt solid #42b983;
  text-align: right;
  a {
    font-weight: bold;
    color: #42b983;
    text-decoration: none;

    &.router-link-exact-active {
      color: #aaa;
      cursor: default;
    }
  }
}
</style>
