<template>
  <div class="about">
    <VueLinks msg="Welcome to The Beginning of Bookmarks Plus" />
  </div>
</template>

<script>
// @ is an alias to /src
import VueLinks from "@/components/VueLinks.vue";

export default {
  name: "viewLinks",
  components: {
    VueLinks
  }
};
</script>
