<template >
	<span 
	
	>
		<div
		v-on:click="cancelLogin"
	class='login inputSubmit'>Cancel Login
	</div>
	</span>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Profile',
	props: {
		msg: String
	},
	computed: {
		...mapGetters([])
	},
	methods: {
		...mapActions(["killCookie"]),
		cancelLogin(){
			this.killCookie();
		}
	},
	created() {
	},
	components: {
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
