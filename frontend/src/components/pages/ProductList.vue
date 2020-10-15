<template>
  <div class="container" style="margin-top: 20px">
    <div class="row">
      <div class="card-deck text-center">
        <product-item
            v-for="product in products"
            :key="product._id"
            :id="product._id"
            :name="product.name"
            :picture="product.pictures"
            :description="product.description"
            :stock="product.stock"
            :category="product.categories"
            :sizes="product.size"
            :price="product.price"
        >
        </product-item>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ProductItem from "@/components/products/ProductItem";

export default {
  components: {
    ProductItem
  },
  mounted() {
    this.$store.dispatch('prods/GET_PRODUCTS')
  },
  computed: {
    ...mapGetters('prods', ['products'])
  }
}
</script>

<style scoped>

</style>