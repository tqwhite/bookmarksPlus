<template>
<div 

  	v-if="editingBookmarksXXX"
  	>
  <div
  	v-on:click="cancelEditing"
    id="editButtonSave"
    class="buttonDiv"
  >
SAVE
  </div>
  <div
  	v-on:click="discardEdits"
    id="editButtonDiscard"
    class="buttonDiv"
  >
DISCARD
  </div>
  </div>
  <div v-else>
	  <div 
		v-on:click="activateEditing"
		id="editButtonEdit"
   	 class="buttonDiv"
	  >
	EDIT
	  </div>
	  <div 
		v-on:click="activateReorg"
		id="editButtonReorg"
 	   class="buttonDiv"
	  >
	REORG
	  </div>
	   | <a title='drag to favorites bar' id='bookmarkletButton' v-on:click.prevent href="javascript:(function(){location.href='http://BookmarksPlus.org/#/?uri='+encodeURIComponent(location.href)+'&text='+encodeURIComponent(document.title);})();">Bookmarklet</a>
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
    ...mapActions(["saveBookmarks", "fetchBookmarkGrids"]),
	activateReorg:function(){
		this.editingBookmarks('reorg');
	},
	activateEditing:function(){
		this.editingBookmarks(true);
	},
	cancelEditing:function(){
		this.editingBookmarks(false);
		this.saveBookmarks();
	},
	discardEdits:function(){
		this.fetchBookmarkGrids();
		this.editingBookmarks(false);
	}
  }
};
</script>

<style scoped lang="less">


/*css definitions*/
@textColor:#036;
@borderColor:#001e1d;
@background:#96cee4;
@errorBackground:red;
@errorText:white;
@navLinkInactiveColor:#036;
@navLinkActiveColor:#666;

.buttonDiv{
	display:inline-block;
	color:@textColor;
	font-size:80%;
	font-weight:bold;
	padding:2px;
	margin-right:2px;
	cursor:pointer;
}




#editButtonEdit:hover{
color:rgba(@textColor, .4);
}
#editButtonReorg:hover{
color:rgba(@textColor, .4);}

#editButtonSave{
background:rgba(red, .5);
padding:0px 13px;
}
#editButtonDiscard{
color:rgba(@textColor, .8);
font-size:80%;}

#editButtonDiscard:hover{
color:rgba(white, .8);
}
#editButtonSave:hover{
background:rgba(red, .8);
}

#bookmarkletButton{
color:black;
border:.5pt solid #666;
}
</style>
