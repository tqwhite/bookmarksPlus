import axios from 'axios';

const makeCellList = function(currentGrid) {
	const outArray = [];

	if (typeof currentGrid == 'undefined') {
		return [];
	}

	const columnWidth = currentGrid.columnWidth;
	const rows = currentGrid.bookmarks.reduce((result, item) => {
		return Math.max(result, item.position.row);
	}, 0);
	for (var row = 0, len = rows; row <= len; row++) {
		for (var col = 0, len2 = columnWidth + 0; col < len2; col++) {
			outArray.push({
				row,
				col,
				id: Math.floor(Math.random() * Math.floor(100000))
			});
		}
	}

	return outArray; //this generates a list of cell coordinate pairs, in row major order
};

// const conditionInputData = (columnWidth, bookmarks) => {
// 	//dev utility for applying changes to entire set of bookmarks
// 	return bookmarks.map(item => {
// 		if (item.anchor.text=='---' || item.anchor.text=='...'){
// 			item.anchor.text=''
// 		}
// 		return item;
// 	});
// };

//====================================================
//====================================================

const state = {
	errorCondition: false,
	editingBookmarks: false,
	dataInitialized: false,
	currentGrid: {},
	currentGridRefId: '',
	responseData: { grids: [] }
};

/*
	IF IT SEEMS that getters are mysteriously not being accessed but also
	not throwing errors, reload the whole page.
*/

const getters = {
	errorCondition: state => state.errorCondition,
	editingBookmarksXXX: state => state.editingBookmarks,
	dataInitialized: state => state.dataInitialized,

	bookmarkList: state => {
		const currentGrid = state.responseData.grids.filter(
			item => (item.refId = state.currentGridRefId)
		)[0];
		//dev utility for applying changes to entire set of bookmarks
		// 		currentGrid.bookmarks = conditionInputData(
		// 			currentGrid.columnWidth,
		// 			currentGrid.bookmarks
		// 		);

		//		currentGrid.bookmarks = currentGrid.bookmarks.slice(0, 12);
		// 		currentGrid.bookmarks.forEach(b =>
		// 			console.log(`A ${b.anchor.text}: ${b.position.row}/${b.position.column}`)
		// 		);

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
					anchor: { text: '', uri: '' },
					position: { row, column: col },
					isPlaceholder: true
				};
			}
			return result;
		});
		return bookmarkList; //this returns a list of bookmarks in the order they appear in the grid
	},

	currentGridRefId: state => state.currentGridRefId,
	gridShape: state => ({
		count: state.currentGrid.bookmarks.length,
		columns: state.currentGrid.columnWidth,
		rows: state.currentGrid.bookmarks.reduce((result, item) => {
			return Math.max(result, item.position.row);
		}, 0)
	}),

	getNextEmptyCell: state => {
		const bookmarks = state.currentGrid.bookmarks;
		const columnWidth = state.currentGrid.columnWidth;

		let lastRow = bookmarks.reduce((result, item) => {
			const row = Math.max(item.position.row, result);
			return row;
		}, 0);
		let lastCol = bookmarks.reduce((result, item) => {
			if (item.position.row == lastRow) {
				const col = Math.max(item.position.column, result);
				return col;
			} else {
				return result;
			}
		}, 0);

		let nextCol = lastCol + 1;
		let nextRow = lastRow; //assume there's room

		if (nextCol >= columnWidth) {
			nextCol = 0;
			nextRow = lastRow + 1;
		}

		return {
			row: nextRow,
			column: nextCol
		};

	}

};

const actions = {
	async fetchBookmarkGrids({ getters, commit }, queryBookmark) {
		//executed by components/MainGrid.vue at startup (created)

		//api.bookmarksplus.org presently points at genericwhite/DEMO (port 9500)

		//getters.token is used instead of state.token since I moved token to accounts.js

		if (typeof getters.token.claims == 'undefined') {
			return false;
		}

		const userRefId = getters.token.claims.userRefId;

		const response = await axios.get(
			`http://api.bookmarksplus.org/bm/api/bookmarks/${userRefId}`
		);
		commit('token', response.data.token);

		const whatShouldBeComingFromAxios = response.data.data.filter(
			item => item.userRefId == userRefId
		)[0];
		commit('responseData', whatShouldBeComingFromAxios); //in future, query will reduce the response to this

		const currentGridRefId = whatShouldBeComingFromAxios.defaultGridRefId;
		commit('currentGridRefId', currentGridRefId);

		const currentGrid = whatShouldBeComingFromAxios.grids.filter(
			item => (item.refId = currentGridRefId)
		)[0];
		commit('currentGrid', currentGrid);

		commit('dataInitialized', true); //tell components it's time to display

		if (Object.keys(queryBookmark).length) {
			const nextEmptyCell = getters.getNextEmptyCell;
			const newBookmark = {
				anchor: queryBookmark,
				position: nextEmptyCell,
				isQueryBookmark:true
			};
			commit('editingBookmarks', true);
			commit('addNewBookmark', newBookmark);
			console.log("HACK: scrolling to bottom for added bookmark visibility (move to component someday)");
			setTimeout(()=>{window.scrollTo(0, 100);}, 100);
		}
	},
	
	async saveBookmarks({ state, commit, getters }) {
		const token = getters.token;
		const id = token.claims._id;
		
		
		
		state.currentGrid.bookmarks = state.currentGrid.bookmarks
			.filter(bookmark => {
				const hasContent =
					bookmark.anchor.text.match(/\w/) || bookmark.anchor.uri.match(/\w/);

				return hasContent ? true : false;
				
			})
			.map(bookmark => {
				Object.keys(bookmark).forEach(keyName => {
					if (!['_id', 'cssClasses', 'anchor', 'position'].includes(keyName)) {
						delete bookmark[keyName];
					}
				});

				return bookmark;
			});
			
			
		const response = await axios.put(
			`http://api.bookmarksplus.org/api/bookmarks/${id}`,
			state.responseData
		);

		if (response.status != 200) {
			commit('errorCondition', response.statusText);
		}
	},

	// 	saveBookmarks({ state }) {
	// 		console.log(state.responseData);
	// 		console.log('NOT SAVING');
	//
	// 		return;
	// 	},

	logBookmark({ state }, b, label = '') {
		state.tmp = false; //this is here only to prevent lint from throwing a non-used error
		console.log(
			`${label ? label + ': ' : ''}${b.anchor.text}: ${b.position.row}/${
				b.position.column
			}`
		);
	}
};

const mutations = {
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
	},
	editingBookmarks: (state, item) => {
		state.editingBookmarks = item;
	},
	errorCondition: (state, item) => {
		state.errorCondition = item;
	},
	addNewBookmark: (state, newBookmark) => {
		state.currentGrid.bookmarks.push(newBookmark);
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
