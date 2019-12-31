<template >
	<div 
		v-if="dataInitialized"
		v-bind:style="setStyle()"
		id="gridContainer"
		class="bookmarkGrid" 
	>
		<div
			v-if="errorCondition"
			class="error"
		>
			{{errorCondition}}
		</div>
		<template 
		v-if="editingBookmarksXXX"
		>
			<BookmarkGridEditor 
				v-for="(bookmark) in bookmarkList" 
				v-bind:key="bookmark.id" 
				v-bind:bookmark="bookmark"
			/>
		</template>
		<template v-else>
			<BookmarkGridCell 
				v-for="(bookmark) in bookmarkList" 
				v-bind:key="bookmark.id" 
				v-bind:bookmark="bookmark"
			/>
		</template>
	</div>
</template>

<script>

import BookmarkGridCell from './BookmarkGridCell.vue'; // @ is an alias to /src
import BookmarkGridEditor from './BookmarkGridEditor.vue'; // @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'MainGrid',
	props: {
		msg: String
	},
	computed: {
		...mapGetters(['errorCondition', 'gridShape', 'bookmarkList', 'token', 'dataInitialized', "editingBookmarksXXX"])
	},
	methods: {
		...mapActions(['fetchBookmarkGrids']),
		setStyle: function() {
			const windowHeight = window.innerHeight;
			const bodyHeight = document.querySelector('body').clientHeight;
			const containerDomObj = document.querySelector('#gridContainer');
			const containerHeight = containerDomObj
				? containerDomObj.clientHeight
				: 0;

			let navHeight;
			let fudgeFactor=20; //arithmetic always overflows space a little, no patience to fix it

			if (containerHeight === 0) {
				navHeight = bodyHeight;
				fudgeFactor=30;
			} else {
				navHeight = windowHeight - containerHeight;
				fudgeFactor=0;
			}
	
			const intendedContainerHeight = windowHeight - navHeight-fudgeFactor;

			const colWidth = Math.floor(100 / this.gridShape.columns);
			const rowHeight = Math.min(Math.floor(
				intendedContainerHeight / this.gridShape.rows
			), 50);
			
			return {
				['grid-template-columns']: `repeat(${this.gridShape.columns}, ${colWidth}vw)`,
				['grid-template-rows']: `repeat(${this.gridShape.rows}, ${rowHeight}px)`
			};
		}
	},
	created() {
console.dir({"this.$route.query [MainGrid.vue.]":this.$route.query});


		this.fetchBookmarkGrids(this.$route.query);
	},
	components: {
		BookmarkGridCell,
		BookmarkGridEditor
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

.bookmarkGrid{
	display:grid;
}
b{
	font-weight:900;
}
.bookmark {
  font-size: 12pt;
  color:@textColor;
  border-bottom:.5pt solid rgba(@borderColor, .2);
	display:flex;
	flex-direction:column;
			justify-content:center;
			align-items:center;
}
.bookmarkLink {
  color:@textColor;
  text-decoration:none;

}
.bookmarkLink:hover {
  color:white;
}

.bookmark div{
}

.error{
	background:@errorBackground;
	color:@errorText;
	text-align:center;
}
</style>
