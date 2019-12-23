<template>
	<div id="app">
		<div id="nav">
			<div id='controls'>
				<BookmarkEditButton />
			</div>
			<div id='links'>
				<router-link to="/">Main Grid</router-link> |
				<router-link to="/viewLinks">Auxilliary Links</router-link>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
//Note: router initialization is router/index.js
import BookmarkEditButton from "@/components/mainGrid/components/BookmarkEditButton.vue"; // @ is an alias to /src


export default {
  name: "APP",
  props: {
    bookmark: {}
  },
  computed: {
  },
  created() {
    //this.doSomething();
  },
  methods: {
  },
  components: {
    BookmarkEditButton
  }
};
</script>


<style lang="less">

@background:#004643;

body {
  background: @background;
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
  display:flex;
  flex-direction:row;
  padding:0px 20px;
}
#links {
	flex-grow:1;
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


#controls {
	flex-grow:1;
  text-align: left;
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
