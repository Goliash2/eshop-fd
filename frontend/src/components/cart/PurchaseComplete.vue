<template>
  <section>
    Purchased
    <router-link to="/">
      <button class="btn btn-cvut rounded-pill" @click="next">Zpět do obchodu</button>
    </router-link>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "PurchaseComplete",
  methods: {
    next() {
      this.$store.dispatch('stages/GET_STAGE', '/cart/content');
    }
  },
  computed: {
    ...mapGetters('stages', ['stage']),
  }
}
</script>

<style scoped>

</style>