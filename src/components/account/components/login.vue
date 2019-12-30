<template >
	<div 
		class='loginContainer'
	>
			<input class='login inputEntry' v-model="auth.userName" placeholder="user name">
			<input class='login inputEntry' v-model="auth.password" placeholder="password" type='password'>
	<div
		v-on:click="submitLogin"
	class='login inputSubmit'>Submit Login</div>
	</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Login',
	props: {},
	computed: {
		...mapGetters(['auth'])
	},
	methods: {
		...mapActions(['login']),
		submitLogin(){
			this.login(this.auth);
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

.login{
	height:12px;
	padding:1px 4px 5px 4px;
}

.loginContainer{
	display:inline-block;
	margin-bottom:2px;
}

.inputEntry{
	background:white;
}
.inputSubmit{
	background:@textColor;
	color:white;
	display:inline-block;
	cursor:pointer;
}

.inputSubmit:hover{
	background:@navLinkActiveColor;
}

.error{
	background:@errorBackground;
	color:@errorText;
	text-align:center;
}
</style>
