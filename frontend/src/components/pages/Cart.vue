<template>
  <section>
    <div class="container">
      <cart-stage></cart-stage>
      <router-view></router-view>
    </div>
  </section>
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
    this.$store.dispatch('path/GET_PATH', path);
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
}

h2 {
  color: #292929;
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 1rem;
}

h3 {
  text-align: center;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>