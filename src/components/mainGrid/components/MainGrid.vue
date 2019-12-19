<template >
    <div 
    	v-if="dataInitialized"
    	v-bind:style="setStyle()"
    	id="gridContainer"
    	class="bookmarkGrid" 
    >
      <BookmarkGridCell 
      	v-for="(bookmark) in bookmarkList" 
      	v-bind:key="bookmark.id" 
      	v-bind:bookmark="bookmark" 
      />
    </div>
</template>

<script>
import BookmarkGridCell from './BookmarkGridCell.vue'; // @ is an alias to /src
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'MainGrid',
	props: {
		msg: String
	},
	computed: {
		...mapGetters(['gridShape', 'bookmarkList', 'token', 'dataInitialized'])
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

			if (containerHeight === 0) {
				navHeight = bodyHeight;
			} else {
				navHeight = windowHeight - containerHeight;
			}

			const intendedContainerHeight = windowHeight - navHeight;

			const colWidth = 100 / this.gridShape.columns;
			const rowHeight = Math.floor(
				intendedContainerHeight / this.gridShape.rows
			);

			return {
				['grid-template-columns']: `repeat(${
					this.gridShape.columns
				}, ${colWidth}vw)`,
				['grid-template-rows']: `repeat(${this.gridShape.rows}, ${rowHeight}px)`
			};
		}
	},
	created() {
		this.fetchBookmarkGrids();
	},
	components: {
		BookmarkGridCell
	}
};

</script>

<style  lang="less">

.bookmarkGrid{
display:grid;

}
b{
	font-weight:900;
}
.bookmark {
  font-size: 10pt;
  color:#f9bc60;
  text-decoration:none;
  border-bottom:.5pt solid #001e1d;
}

.bookmark .annotation{
  font-size: 80%;
  opacity:.8;
}
</style>
