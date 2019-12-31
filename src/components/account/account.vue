<template >
	<span >
		<span v-if="isLoggedIn">
			<Profile />
		</span>
		<span v-else>
			<Login />
		</span>
	
	</span>
</template>

<script>

import Login from "./components/login.vue"; // @ is an alias to /src
import Profile from "./components/profile.vue"; // @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Account',
	props: {
		msg: String
	},
	computed: {
		...mapGetters(['isLoggedIn'])
	},
	methods: {
		...mapActions(['getCookies']),
	},
	created() {
		this.getCookies();
	},
	components: {
		Login,
		Profile
	}
};

</script>

<style  lang="less">


/*css definitions*/
@textColor:#036;
@borderColor:#001e1d;
@background:#96cee4;
@errorBackground:red;
@errorText:white;
@navLinkInactiveColor:#036;
@navLinkActiveColor:#666;


.error{
	background:@errorBackground;
	color:@errorText;
	text-align:center;
}
</style>
