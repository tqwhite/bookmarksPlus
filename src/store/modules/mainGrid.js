import axios from "axios";

const makeCellList = function(currentGrid) {
  const outArray = [];
  if (typeof currentGrid != "undefined") {
    const columnWidth = currentGrid.columnWidth;
    const rows = currentGrid.bookmarks.reduce((result, item) => {
      return Math.max(result, item.position.row);
    }, 0);

    for (var row = 0, len = rows; row < len; row++) {
      for (var col = 0, len2 = columnWidth; col < len2; col++) {
        outArray.push({
          row,
          col,
          id: Math.floor(Math.random() * Math.floor(100000))
        });
      }
    }
  }
  return outArray;
};

//====================================================

const state = {
  dataInitialized: false,
  currentGrid: {},
  token: {},
  currentGridRefId: "",
  responseData: { grids: [] }
};
const getters = {
  dataInitialized: state => state.dataInitialized,

  bookmarkList: state => {
    const currentGrid = state.responseData.grids.filter(
      item => (item.refId = state.currentGridRefId)
    )[0];
    currentGrid.bookmarks = currentGrid.bookmarks.slice(0, 10);

    const cellCoordsList = makeCellList(currentGrid);

    const tmp2 = cellCoordsList.map(item => {
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
          anchor: { text: "...", uri: "" },
          position: { row, col }
        };
      }

      return result;
    });
    return tmp2;
  },
  currentGrid: state => {
    console.log(
      `\n=-=============   currentGrid state ========================= [mainGrid.js.getters]\n`
    );

    const currentGrid = state.responseData.grids.filter(
      item => (item.refId = state.currentGridRefId)
    )[0];

    currentGrid.bookmarks = currentGrid.bookmarks.slice(0, 10);

    return currentGrid;
  },
  token: state => state.token,
  currentGridRefId: state => state.currentGridRefId
};
const actions = {
  async fetchBookmarkGrids({ commit }) {
    const response = await axios.get("http://api.bookmarksplus.org/");
    commit("token", response.data.token);

    const whatShouldBeComingFromAxios = response.data.data.filter(
      item => item.userRefId == "tqwhiteUserRefId"
    )[0];
    commit("responseData", whatShouldBeComingFromAxios); //in future, query will reduce the response to this

    const currentGridRefId = whatShouldBeComingFromAxios.defaultGridRefId;
    commit("currentGridRefId", currentGridRefId);

    const currentGrid = whatShouldBeComingFromAxios.grids.filter(
      item => (item.refId = currentGridRefId)
    )[0];
    commit("currentGrid", currentGrid);

    commit("dataInitialized", true);
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
