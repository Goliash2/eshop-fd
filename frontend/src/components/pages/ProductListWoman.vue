<template>
  <section id="woman">
    <div class="container" style="margin-top: 20px">
      <div class="row">
        <section class="products">
          <product-item
              v-for="product in products"
              :key="product._id"
              :id="product._id"
              :name="product.name"
              :picture="product.pictures"
              :description="product.description"
              :category="product.categories"
              :sizes="product.size"
              :price="product.price"
              :created="product.listed"
          >
          </product-item>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import ProductItem from "@/components/products/ProductItem";
export default {
  components: {
    ProductItem
  },
  mounted() {
    const path = location.pathname;
    this.$store.commit('path/SET_PATH', path);
    this.$store.dispatch('woman/GET_PRODUCTS')
  },
  computed: {
    ...mapGetters('woman', ['products'])
  },
}
</script>

<style scoped>
.products {
  display: flex;
  flex-wrap: wrap;
}
</style>