<template>
  <div id="app">
    <RwvHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import RwvHeader from "@/components/TheHeader";

export default {
  name: "App",
  components: {
    RwvHeader
  }
};
</script>

<style></style>
