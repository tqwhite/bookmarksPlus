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

const conditionInputData = (columnWidth, bookmarks) => {
	//checks for duplicates and moves them to the nextEmptyCell
	const alreadyUsedCoords = [];

	const isDuplicateActual = alreadyUsedCoords => nextPair => {
		const isEqual = (a, b) => {
			return (
				a.position.row == b.position.row &&
				a.position.column == b.position.column
			);
		};

		const isDuplicate =
			alreadyUsedCoords.filter(item => {
				return isEqual(nextPair, item);
			}).length > 0;

		alreadyUsedCoords.push(nextPair);
		return isDuplicate;
	};
	const isDuplicate = isDuplicateActual(alreadyUsedCoords);

	const getNextEmptyCellActual = (columnWidth, bookmarks) => {
		return () => {
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
			
			let nextCol=lastCol+1;
			let nextRow=lastRow; //assume there's room
			


			if (nextCol >= columnWidth) {
				nextCol = 0;
				nextRow = lastRow+1;
			}

			return {
				row: nextRow,
				column: nextCol
			};
		};
	};
	const getNextEmptyCell = getNextEmptyCellActual(columnWidth, bookmarks);

	return bookmarks.map(item => {
		if (isDuplicate(item)) {

			const { row, column } = getNextEmptyCell();

			item.position.row = row;
			item.position.column = column;
		}

		return item;
	});
};

//====================================================
//====================================================

const state = {
	errorCondition: false,
	editingBookmarks: false,
	dataInitialized: false,
	currentGrid: {},
	token: {},
	currentGridRefId: '',
	responseData: { grids: [] }
};

/*
	if it seems that getters are mysteriously not being accessed but also
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

		//currentGrid.bookmarks = currentGrid.bookmarks.slice(0, 12);
		
// 		currentGrid.bookmarks.forEach(b =>
// 			console.log(`A ${b.anchor.text}: ${b.position.row}/${b.position.column}`)
// 		);

		currentGrid.bookmarks = conditionInputData(
			currentGrid.columnWidth,
			currentGrid.bookmarks
		);
		
		// currentGrid.bookmarks.forEach(item=>{
		// 	item.position.row=item.position.row-1;
		// 	item.position.column=item.position.column-1;
		// });

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
					position: { row, column: col }
				};
			}

			return result;
		});
		return bookmarkList; //this returns a list of bookmarks in the order they appear in the grid
	},

	token: state => state.token,
	currentGridRefId: state => state.currentGridRefId,
	gridShape: state => ({
		count: state.currentGrid.bookmarks.length,
		columns: state.currentGrid.columnWidth,
		rows: state.currentGrid.bookmarks.reduce((result, item) => {
			return Math.max(result, item.position.row);
		}, 0)
	})
};

const actions = {
	async fetchBookmarkGrids({ commit }) {
		//executed by components/MainGrid.vue at startup (created)

		//api.bookmarksplus.org presently points at genericwhite/DEMO (port 9500)

		const response = await axios.get(
			'http://api.bookmarksplus.org/bm/api/bookmarks'
		);
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
	},

		async saveBookmarks({ state, commit }) {
	
			const id = state.token.claims._id;
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
// 	}
};

const mutations = {
	token: (state, item) => {
		state.token = item;
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
	},
	editingBookmarks: (state, item) => {
		state.editingBookmarks = item;
	},
	errorCondition: (state, item) => {
		state.errorCondition = item;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
