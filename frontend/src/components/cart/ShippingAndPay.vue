<template>
  <section>
    shipping and pay
    <router-link :to="stage">
      <button class="btn btn-cvut rounded-pill" @click="next">Pokračovat</button>
    </router-link>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
export default {
name: "ShippingAndPay",
  methods: {
    next() {
      this.$store.dispatch('stages/GET_STAGE', '/cart/contact');
    }
  },
  computed: {
    ...mapGetters('stages', ['stage']),
  }
}
</script>

<style scoped>

</style>