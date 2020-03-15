<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Training</h1>
      </div>
    </div>
    <div v-if="!isAuthenticated">Require auth</div>
    <div v-if="isAuthenticated">List of items</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "training",
  components: {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["isAuthenticated", "tags"]),
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
