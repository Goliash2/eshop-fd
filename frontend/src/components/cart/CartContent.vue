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
  <div class="totalSum">
    <div class="totalSummary">
      <div class="totalSummaryItem">
        <span class="totalText">Celkem k zaplacení s DPH:</span>
        <span><b>{{ cartTotal }} Kč</b></span>
      </div>
      <hr>
      <router-link :to="stage">
        <button class="btn btn-cvut rounded-pill" style="padding: 15px 40px;" @click="next">Pokračovat</button>
      </router-link>
    </div>
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
.totalText {
  padding-right: 50px;
  text-align: left;
}

.totalSummary {
  background: none;
  max-width: 325px;
  padding: 5px 0;
  margin-right: 0;
}

.totalSummaryItem {
  -webkit-box-align: center;
  align-items: center;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
}

.totalSum {
  margin-top: -45px;
  margin-left: 691px;
  text-align: right;
}

.shopping-cart {
  width: 920px;
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

  .totalSum {
    margin: 45px;
    text-align: center;
  }
}
</style>