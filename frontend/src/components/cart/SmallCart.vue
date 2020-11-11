<template>
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-muted">Váš košík</span>
      <span class="badge badge-secondary badge-pill">{{ quantity }}</span>
    </h4>
    <ul class="list-group mb-3">
      <small-cart-item
          v-for="product in cartItems"
          :key="product.productId"
          :name="product.name"
          :size="product.size"
          :price="product.price"
          :qty="product.qty"
      ></small-cart-item>
      <li class="list-group-item d-flex justify-content-between">
        <span>Cena celkem</span>
        <strong>{{ cartTotal }} Kč</strong>
      </li>
    </ul>
</template>

<script>
import SmallCartItem from "@/components/cart/SmallCartItem";
export default {
name: "SmallCart",
  components: {
    SmallCartItem
  },
  computed: {
    cartTotal() {
      return this.$store.getters['cart/totalSum'].toFixed(0);
    },
    cartItems() {
      return this.$store.getters['cart/products']
    },
    quantity() {
      return this.$store.getters['cart/quantity']
    }
  }
}
</script>

<style scoped>

</style>