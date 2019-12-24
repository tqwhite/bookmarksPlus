<template>
	<drag
		:transfer-data="bookmark"
		class="bookmarkDragging"
		v-if="editingBookmarksXXX=='reorg'"
	>
		<drop
			@drop="handleDrop"
		>
		<template v-if="bookmark.anchor.text">
        	<span  v-html="bookmark.anchor.text" />&nbsp;&nbsp;
			<span v-on:click="moveToEnd" class="moveToEnd" title="send to end of grid" style="font-size:70%;"> 
			<FontAwesomeIcon icon="bullseye" size="xs" /></span>
        </template>
        <template v-else>
        	<span  class='emptyTarget'>drop here (empty)</span>
		</template>
		</drop>
	</drag>
	
	<div v-else v-on:change="addToGridIfNeeded(bookmark)">
			<input v-model="bookmark.anchor.uri" placeholder="uri">
			<input v-model="bookmark.anchor.text" placeholder="anchor text">
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { Drag, Drop } from 'vue-drag-drop';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBullseye,)





export default {
  name: "BookmarGridEditor",
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
    ...mapActions(["logBookmark"]),
    ...mapGetters(["getNextEmptyCell"]),
    ...mapMutations(["addNewBookmark"]),
    handleDrop(movingBookmark){
		//const nextEmptyCell=this.getNextEmptyCell();
		const movingRowHold=movingBookmark.position.row;
		const movingColumnHold=movingBookmark.position.column;

		movingBookmark.position.row=this.bookmark.position.row;
		movingBookmark.position.column=this.bookmark.position.column;
// 		this.bookmark.position.row=nextEmptyCell.row;
// 		this.bookmark.position.column=nextEmptyCell.column;
		this.bookmark.position.row=movingRowHold;
		this.bookmark.position.column=movingColumnHold;
    },
    moveToEnd(){
    
		const nextEmptyCell=this.getNextEmptyCell();
		this.bookmark.position.row=nextEmptyCell.row;
		this.bookmark.position.column=nextEmptyCell.column;
    },
    addToGridIfNeeded(bookmark){
    	if (typeof(bookmark.isPlaceholder)!='undefined'){
    		delete bookmark.isPlaceholder;
			this.addNewBookmark(bookmark);
		}
    }
  },
	components: {
		Drag,
		Drop,
		FontAwesomeIcon
	}
};
</script>

<style  lang="less">


/*css definitions*/
@textColor:#036;
@borderColor:#001e1d;
@background:#6CBBD9;
@errorBackground:red;
@errorText:white;
@navLinkInactiveColor:#036;
@navLinkActiveColor:#666;

input{
	background:@background;
	color:@textColor;
	margin:0px 1px;
	border:.5pt solid rgba(@textColor, .2);
	padding:9px;
	}
.bookmarkDragging{
  	font-size: 12pt;
	color:black;
	cursor:pointer;
}
.bookmarkDragging:hover{
	color:white;
	cursor:pointer;
	border:1pt solid rgba(100%, 100%, 100%, .4);
}

.emptyTarget{
	color:rgba(white, .5);
}

.moveToEnd{
	
}
</style>
