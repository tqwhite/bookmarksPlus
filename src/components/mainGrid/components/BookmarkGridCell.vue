<template>
  <div
    class="bookmark"
  >
  <a class="bookmark" :href="bookmark.anchor.uri">
        <span v-html="bookmark.anchor.text" />
        <span 
        	class="annotation" 
        	v-if="bookmark.anchor.text!='---'"
        > ({{bookmark.position.row}}, {{bookmark.position.column}})</span>
        </a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BookmarGridCell",
  props: {
    bookmark: {}
  },
  computed: {
    ...mapGetters([])
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
/*
the css for this component is defined in its parent
*/
</style>
