<template>
	<div
		class="bookmark"
	>
		<input v-model="bookmark.anchor.uri" placeholder="uri">
		<input v-model="bookmark.anchor.text" placeholder="nachor text">
		<input v-model="bookmark.position.row" placeholder="row">
		<input v-model="bookmark.position.column" placeholder="column">
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BookmarGridEditor",
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

<style  lang="less">
@background:#004643;
input{
background:@background;
color:white;
margin:0px 1px;
border:.5pt solid @background;
}
</style>
