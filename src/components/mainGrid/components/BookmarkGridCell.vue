<template>
	<div
		class="bookmark"
	>
		<div>
			<a class="bookmarkLink" :href="bookmark.anchor.uri">
				<span v-html="bookmark.anchor.text" />
			</a>
		</div>
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
</style>
