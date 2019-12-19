import axios from 'axios';

const makeCellList = function(currentGrid) {
	const outArray = [];
	
	//HACK: the old version of the system was, insanely, one based, sort of. Will fix later in db.
	const hackRowStart=1;
	const hackColStart=1;
	
	
	if (typeof currentGrid != 'undefined') {
		const columnWidth = currentGrid.columnWidth;
		const rows = currentGrid.bookmarks.reduce((result, item) => {
			return Math.max(result, item.position.row);
		}, hackRowStart);

		for (var row = hackRowStart, len = (rows+hackRowStart); row < len; row++) {
			for (var col = hackColStart, len2 = (columnWidth+hackColStart); col < len2; col++) {
				outArray.push({
					row,
					col,
					id: Math.floor(Math.random() * Math.floor(100000))
				});
			}
		}
	}
	return outArray; //this generates a list of cell coordinate pairs, in row major order
};

//====================================================
//====================================================

const state = {
	dataInitialized: false,
	currentGrid: {},
	token: {},
	currentGridRefId: '',
	responseData: { grids: [] }
};

const getters = {
	dataInitialized: state => state.dataInitialized,

	bookmarkList: state => {
		const currentGrid = state.responseData.grids.filter(
			item => (item.refId = state.currentGridRefId)
		)[0];
		//HACK to deal with error in previous version; will fix in db later.
		currentGrid.bookmarks = currentGrid.bookmarks.filter(item=>(item.position.row!==0));

		const cellCoordsList = makeCellList(currentGrid);

		const bookmarkList = cellCoordsList.map(item => {
			const row = item.row;
			const col = item.col;

			const possibleBookmark = currentGrid.bookmarks.filter(item => {
				return item.position.row == row && item.position.column == col;
			});



			let result = item;

			if (possibleBookmark.length) {
				result = possibleBookmark[0];
			} else {
				result = {
					anchor: { text: '...', uri: '' },
					position: { row, col }
				};
			}

			return result;
		});
		return bookmarkList; //this returns a list of bookmarks in the order they appear in the grid
	},
	currentGridDISCARD: state => {
		const currentGrid = state.responseData.grids.filter(
			item => (item.refId = state.currentGridRefId)
		)[0];

		//currentGrid.bookmarks = currentGrid.bookmarks.slice(0, 10);

		return currentGrid;
	},
	token: state => state.token,
	currentGridRefId: state => state.currentGridRefId,
	gridShape: state => ({
		count:state.currentGrid.bookmarks.length,
		columns:state.currentGrid.columnWidth, 
		rows:state.currentGrid.bookmarks.reduce((result, item) => {
			return Math.max(result, item.position.row);
		}, 0)}),
};

const actions = {
	async fetchBookmarkGrids({ commit }) {
		//executed by components/MainGrid.vue at startup (created)
		
		const response = await axios.get('http://api.bookmarksplus.org/');
		commit('token', response.data.token);

		const whatShouldBeComingFromAxios = response.data.data.filter(
			item => item.userRefId == 'tqwhiteUserRefId'
		)[0];
		commit('responseData', whatShouldBeComingFromAxios); //in future, query will reduce the response to this

		const currentGridRefId = whatShouldBeComingFromAxios.defaultGridRefId;
		commit('currentGridRefId', currentGridRefId);

		const currentGrid = whatShouldBeComingFromAxios.grids.filter(
			item => (item.refId = currentGridRefId)
		)[0];
		commit('currentGrid', currentGrid);
		
		commit('dataInitialized', true); //tell components it's time to display
	}
};

const mutations = {
	token: (state, token) => {
		state.token = token;
	},
	currentGridRefId: (state, item) => {
		state.currentGridRefId = item;
	},
	responseData: (state, item) => {
		state.responseData = item;
	},
	currentGrid: (state, item) => {
		state.currentGrid = item;
	},
	dataInitialized: (state, item) => {
		state.dataInitialized = item;
	},
	columnWidth: (state, item) => {
		state.currentGrid.columnWidth = item;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
