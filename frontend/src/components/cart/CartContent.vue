<template>
  <div class="shopping-cart">
    <!-- Title -->
    <div class="title">
      Obsah košíku
    </div>
    <cart-item
        v-for="item in cartItems"
        :key="item.productId"
        :prod-id="item.productId"
        :name="item.name"
        :size="item.size"
        :sizes="item.sizes"
        :image="item.image"
        :price="item.price"
        :qty="item.qty"
    ></cart-item>
  </div>
  <div class="container">
    <router-link :to="stage">
      <div style="text-align: right">
        <button class="btn btn-danger" @click="next">Pokračovat</button>
      </div>
    </router-link>
  </div>
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
.shopping-cart {
  width: 750px;
  margin: 80px auto;
  background: #FFFFFF;
  box-shadow: 1px 2px 3px 0 rgba(0,0,0,0.10);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}
.title {
  height: 60px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px 30px;
  color: #5E6977;
  font-size: 18px;
  font-weight: 400;
}

@media (max-width: 800px) {
  .shopping-cart {
    width: 100%;
    height: auto;
    overflow: hidden;
  }
}
</style>