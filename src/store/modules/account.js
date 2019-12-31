import axios from 'axios';
import VueCookies from 'vue-cookies';

console.dir({"VueCookies [account.js.]":VueCookies});

//====================================================
//====================================================

const state = {
	token: {},
	isLoggedIn: false,
	authx:{
		userName:'',
		password:''
	},
	auth:{
		userName:'tqwhite',
		password:'shairWord!0'
	}
};

/*
	IF IT SEEMS that getters are mysteriously not being accessed but also
	not throwing errors, reload the whole page.
*/

const getters = {
	token: (state) => state.token,
	isLoggedIn: state => state.isLoggedIn,
	auth: state => state.auth,
};

const actions = {
		loginHOLD({ dispatch, commit }, auth){
			console.dir({"auth [account.js.actions]":auth});
			dispatch('fetchBookmarkGrids')
			commit('isLoggedInXXX', true);
		},
		
		async login({ dispatch, commit }, auth) {
	
			const response = await axios.post(
				`http://api.bookmarksplus.org/api/user/`,
				auth
			);
	
			if (response.status != 200) {
				commit('errorCondition', response.statusText);
			}
			else{			
				commit('token', response.data.token);
				commit('isLoggedInXXX', true);
				dispatch('fetchBookmarkGrids');
			}
		},
		
		killCookie({commit}){
			VueCookies.remove('token');
				commit('isLoggedInXXX', false);
				commit('dataInitialized', false);
				commit('token', {});
		},
		getCookies({commit}){
			const tokenCookie=VueCookies.get('token');
			if (tokenCookie.claims){
				commit('isLoggedInXXX', true);
console.log(`\n=-=============   dataInitialized xxx ========================= [account.js.actions]\n`);


				commit('token', tokenCookie);
			}
		}
};

const mutations = {
	token: (state, item) => {
		state.token = item;
		VueCookies.set('token', item);
	},
	isLoggedInXXX: (state, item) => {
		state.isLoggedIn = item;
console.log("state.isLoggedIn="+state.isLoggedIn+" [account.js.mutations]");

	},
	
	auth: (state, item) => {
		state.auth = item;
	}
	
	};

export default {
	state,
	getters,
	actions,
	mutations
};
