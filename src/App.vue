<template>
	<div id="app">
		<div id="nav">
			<div id='controls'>
				<BookmarkEditButton />
			</div>
			<div id='links'>
				<account /> |
				<router-link to="/">Main Grid</router-link> |
				<router-link to="/viewLinks">Instructions</router-link>
			</div>
		</div>
		<router-view />
	</div>
</template>

<script>
//Note: router initialization is router/index.js
import BookmarkEditButton from "@/components/mainGrid/components/BookmarkEditButton.vue";
import Account from "@/components/account/account.vue"; // @ is an alias to /src

import { mapActions } from 'vuex';


export default {
  name: "APP",
  props: {
    bookmark: {}
  },
  computed: {
  	...mapActions(['getCookies'])
  },
  created() {

  },
  methods: {},
  components: {
    BookmarkEditButton,
    Account
  }
};
</script>


<style lang="less">

/*css definitions*/
@textColor:#036;
@borderColor:#001e1d;
@background:#96cee4;
@errorBackground:red;
@errorText:white;
@navLinkInactiveColor:#036;
@navLinkActiveColor:#666;

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
  border-bottom: 1pt solid rgba(@borderColor, .3);
  display:flex;
  flex-direction:row;
  padding:0px 20px;
  font-size:70%;
}
#links {
	flex-grow:1;
  text-align: right;
  a {
    font-weight: bold;
    color: @navLinkInactiveColor;
    text-decoration: none;

    &.router-link-exact-active {
      color: @navLinkActiveColor;
      cursor: default;
    }
  }
  a:hover{
  	opacity:.4;
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
