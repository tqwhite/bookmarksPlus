<template>
	<drag
		:transfer-data="bookmark"
		class="bookmarkDragging"
		v-if="editingBookmarksXXX=='reorg'"
	>
		<drop
			@drop="handleDrop"
		>
			<div 	
				v-if="bookmark.anchor.text"
				v-bind:class="{ recentArrival: bookmark.recentArrival, recentSource: bookmark.recentSource }"
			>
				<span  v-html="bookmark.anchor.text" />&nbsp;&nbsp;
				<span v-on:click="moveToEnd" class="moveToEnd" title="send to end of grid" style="font-size:70%;"> 
				<FontAwesomeIcon icon="bullseye" size="xs" /></span>
			</div>
			<div
				v-else
			>
				<span
					class='emptyTarget'
				>
						drop here (empty)
				</span>
			</div>
		</drop>
	</drag>
	
	<div v-else v-on:change="addToGridIfNeeded(bookmark)"
	
		
	>
			<input v-model="bookmark.anchor.uri" placeholder="uri"  v-bind:class="{ isQueryBookmark: bookmark.isQueryBookmark }">
			<input v-model="bookmark.anchor.text" placeholder="anchor text"  v-bind:class="{ isQueryBookmark: bookmark.isQueryBookmark }">
	</div>
</template>

<script>
/*

Has a section on transitions
https://alligator.io/vuejs/understanding-transitions/

use for this
			v-bind:class="{ recentArrival: bookmark.recentArrival, recentSource: bookmark.recentSource }"


*/

import { mapGetters, mapActions, mapMutations } from "vuex";
import { Drag, Drop } from 'vue-drag-drop';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faBullseye,)





export default {
  name: "BookmarGridEditor",
  props: ['bookmark'],
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
		const sourceBookmark=this.bookmark;
		
		const movingRowHold=movingBookmark.position.row;
		const movingColumnHold=movingBookmark.position.column;

		movingBookmark.position.row=this.bookmark.position.row;
		movingBookmark.position.column=this.bookmark.position.column;
		
		this.$set(movingBookmark, 'recentArrival', true);
		
// 		sourceBookmark.position.row=nextEmptyCell.row;
// 		sourceBookmark.position.column=nextEmptyCell.column;
		sourceBookmark.position.row=movingRowHold;
		sourceBookmark.position.column=movingColumnHold;
		this.$set(this.bookmark, 'recentSource', true);
		
		setTimeout(()=>{
			this.$set(sourceBookmark, 'recentSource', false);
			setTimeout(()=>{
				this.$set(movingBookmark, 'recentArrival', false);
			}, 500);
		}, 3000);
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
@background:#96cee4;
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

.isQueryBookmark{
	color:red;
	background:white;
}

.recentArrival{
	background:rgba(white, .3);
	transition-property:background;
	transition-duration:2s;
}

.recentSource{
	background:rgba(black, .1);
}

</style>
