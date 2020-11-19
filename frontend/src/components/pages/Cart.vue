<template>
  <div class="section-stages">
    <cart-stage></cart-stage>
  </div>
  <div class="section-content">
    <router-view></router-view>
  </div>
</template>

<script>
import CartStage from "@/components/cart/CartStage";
import {mapGetters} from "vuex";
export default {
  components: {
    CartStage
  },
  computed: {
    ...mapGetters('stages', ['stage']),
  },
  mounted() {
    const path = location.pathname;
    this.$store.commit('path/SET_PATH', path);
  }
};
</script>

<style scoped>
.section-stages {
  margin: 2rem auto;
  max-width: 40rem;
}

.section-content {
  margin: -2rem auto;
  max-width: 70rem;
}
</style>