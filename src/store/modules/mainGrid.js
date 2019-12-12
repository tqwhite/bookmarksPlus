import axios from "axios";

const state = {
  bookmarks: []
};
const getters = {
  allBookmarks: state => state.bookmarks
};
const actions = {
  async fetchBookmarks({ commit }) {
    const response = await axios.get("http://api.bookmarksplus.org/");

    commit("setBookmarks", response.data.data[0].grids[0].bookmarks);
  }
};
const mutations = {
  setBookmarks: (state, bookmarks) => {
    state.bookmarks = bookmarks;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
