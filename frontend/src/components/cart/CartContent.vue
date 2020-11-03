<template>
  <ul>
    <cart-item
        v-for="item in cartItems"
        :key="item.productId"
        :prod-id="item.productId"
        :name="item.name"
        :size="item.size"
        :image="item.image"
        :price="item.price"
        :qty="item.qty"
    ></cart-item>
  </ul>
  <router-link :to="stage">
    <button class="btn btn-cvut rounded-pill" @click="next">Pokračovat</button>
  </router-link>
</template>

<script>
import CartItem from "@/components/products/CartItem";
import {mapGetters} from "vuex";
export default {
name: "CartContent",
  components: {
    CartItem
  },
  methods: {
    next() {
      this.$store.dispatch('stages/GET_STAGE', '/cart/shipping');
    }
  },
  computed: {
    cartTotal() {
      return this.$store.getters['cart/totalSum'].toFixed(2);
    },
    cartItems() {
      return this.$store.getters['cart/products']
    },
    quantity() {
      return this.$store.getters['cart/quantity']
    },
    ...mapGetters('stages', ['stage']),
  }
}
</script>

<style scoped>

</style>