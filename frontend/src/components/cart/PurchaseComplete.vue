<template>
  <section>
    Purchased
    <router-link to="/">
      <button class="btn btn-cvut rounded-pill" @click="next">Zpět do obchodu</button>
    </router-link>
  </section>
</template>

<script>
export default {
  name: "PurchaseComplete",
  methods: {
    next() {
      this.$store.commit('stages/SET_STAGE', '/cart/content');
    }
  }
}
</script>

<style scoped>

</style>