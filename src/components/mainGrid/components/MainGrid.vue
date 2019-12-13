<template>
  <div>
    <div v-if="dataInitialized">
      <div v-for="bookmark in bookmarkList" v-bind:key="bookmark.id">
        <BookmarkGridCell v-bind:bookmark="bookmark" />
      </div>
    </div>
    <div>{{ dataInitialized }}</div>
  </div>
</template>

<script>
import BookmarkGridCell from "./BookmarkGridCell.vue"; // @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainGrid",
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(["currentGrid", "bookmarkList", "token", "dataInitialized"])
  },
  methods: {
    ...mapActions(["fetchBookmarkGrids"])
  },
  created() {
    this.fetchBookmarkGrids();
  },
  components: {
    BookmarkGridCell
  }
};
</script>

<style scoped lang="less"></style>
