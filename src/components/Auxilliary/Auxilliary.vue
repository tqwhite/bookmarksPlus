<template>
  <div class="about">
    <VueLinks msg="Auxilliary Static Links for Development" />
  </div>
</template>

<script>
// @ is an alias to /src
import VueLinks from "@/components/Auxilliary/components/Auxilliary.vue";

export default {
  name: "viewLinks",
  components: {
    VueLinks
  }
};
</script>
