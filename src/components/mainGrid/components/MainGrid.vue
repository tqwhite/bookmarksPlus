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
			let fudgeFactor=0; //arithmetic always overflows space a little, no patience to fix it

			if (containerHeight === 0) {
				navHeight = bodyHeight;
				fudgeFactor=30;
			} else {
				navHeight = windowHeight - containerHeight;
				fudgeFactor=0;
			}
	

			const intendedContainerHeight = windowHeight - navHeight-fudgeFactor;

			const colWidth = Math.floor(100 / this.gridShape.columns);
			const rowHeight = Math.floor(
				intendedContainerHeight / this.gridShape.rows
			);
			const paddingTop=Math.floor(.3*rowHeight);

			return {
				['grid-template-columns']: `repeat(${
					this.gridShape.columns
				}, ${colWidth}vw)`,
				['grid-template-rows']: `repeat(${this.gridShape.rows}, ${rowHeight}px)`,
				['padding-top']:`${paddingTop}px`
			};
		}
	},
	created() {
		this.fetchBookmarkGrids();
	},
	components: {
		BookmarkGridCell,
		BookmarkGridEditor
	}
};

</script>

<style  lang="less">

@textColor:#f9bc60;

.bookmarkGrid{
	display:grid;
}
b{
	font-weight:900;
}
.bookmark {
  font-size: 10pt;
  color:@textColor;
  text-decoration:none;
  border-bottom:.5pt solid #001e1d;
}
.bookmark:hover {
  color:white;
}

.bookmark .annotation{
  font-size: 80%;
  opacity:.8;
}

.error{
	background:red;
	color:white;
	text-align:center;
}
</style>
