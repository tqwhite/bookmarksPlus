<template>
  <div>
    <div v-for="bookmark in allBookmarks" v-bind:key="bookmark._id">
      <a :href="bookmark.anchor.uri"
        ><span>{{ bookmark.anchor.text }}</span></a
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainGrid",
  props: {
    msg: String
  },
  computed: mapGetters(["allBookmarks"]),
  created() {
    this.fetchBookmarks();
  },
  methods: {
    ...mapActions(["fetchBookmarks"])
  }
};
</script>

<style scoped lang="less"></style>
