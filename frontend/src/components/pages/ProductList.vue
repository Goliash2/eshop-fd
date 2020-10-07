<template>
  <div>

  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('prods/GET_PRODUCTS')
  }
}
</script>

<style scoped>

</style>