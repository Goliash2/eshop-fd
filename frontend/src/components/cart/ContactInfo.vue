<template>
  <section>
    Contact info
    <router-link :to="stage">
      <button class="btn btn-cvut rounded-pill" @click="next">Pokračovat</button>
    </router-link>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "ContactInfo",
  methods: {
    next() {
      this.$store.dispatch('stages/GET_STAGE', '/cart/purchased');
    }
  },
  computed: {
    ...mapGetters('stages', ['stage']),
  }
}
</script>

<style scoped>

</style>