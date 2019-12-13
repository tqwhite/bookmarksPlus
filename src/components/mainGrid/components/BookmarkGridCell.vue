<template>
  <div
    class="bookmark"
    v-html="makeAnchor(bookmark.position.row, bookmark.position.col, bookmark)"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BookmarGridCell",
  props: {
    bookmark: {}
  },
  computed: {
    ...mapGetters([]),
    makeAnchor: () =>
      function(row, col, bookmark) {
        return `<a class="bookmark" style="text-decoration:none;" href='${bookmark.anchor.uri}'>
        ${bookmark.anchor.text} <span style="font-size:80%;">(${bookmark.position.row}, ${bookmark.position.column})</span>}
        </a>`;
      }
  },
  created() {
    //this.doSomething();
  },
  methods: {
    ...mapActions([])
  }
};
</script>

<style scoped lang="less">
.bookmark {
  font-size: 10pt;
}
</style>
