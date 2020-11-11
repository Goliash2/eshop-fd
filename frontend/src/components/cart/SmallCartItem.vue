<template>
  <li class="list-group-item d-flex justify-content-between lh-condensed">
    <div>
      <h6 class="my-0">{{ name }}</h6>
      <small class="text-muted">Velikost {{ size }} - {{ qty }} Ks</small>
    </div>
    <span class="text-muted">{{ itemTotal }} Kč</span>
  </li>
</template>

<script>
export default {
  name: "SmallCartItem",
  props: ['key', 'name', 'size', 'price', 'qty'],
  computed: {
    itemTotal() {
      return (this.price * this.qty).toFixed(0);
    }
  }
}
</script>

<style scoped>

</style>