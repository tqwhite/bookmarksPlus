<template>
  <MainGrid msg="Welcome to The Main Grid!" />
</template>

<script>
import MainGrid from "@/components/MainGrid.vue"; // @ is an alias to /src

export default {
  name: "home",
  components: {
    MainGrid
  }
};
</script>
