<template>
  <div
  	v-if="editingBookmarksXXX"
  	v-on:click="cancelEditing"
    class="editButtonCancel"
  >
CANCEL EDITING
  </div>
  <div v-else
  	v-on:click="activateEditing"
    class="editButtonActivate"
  >
EDIT
  </div>
  
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "BookmarkEditButton",
  props: {
    bookmark: {}
  },
  computed: {
    ...mapGetters(["editingBookmarksXXX"])
  },
  created() {
    //this.doSomething();
  },
  methods: {
    ...mapMutations(["editingBookmarks","token"]),
    ...mapActions(["saveBookmarks"]),
	activateEditing:function(){
		this.editingBookmarks(true);
	},
	cancelEditing:function(){
		this.editingBookmarks(false);
		this.saveBookmarks();
	}
  }
};
</script>

<style scoped lang="less">

@textColor:#f9bc60;

.editButtonActivate{
	color:@textColor;
	width:150px;
	font-size:90%;
	padding-top:5% 0px;
}
.editButtonCancel{
	background:#f25042;
	width:150px;
	font-size:90%;
	padding-top:5% 0px;
}
</style>
