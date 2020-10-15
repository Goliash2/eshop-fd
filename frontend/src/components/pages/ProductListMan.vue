<template>
  <section id="man">
    <div class="container" style="margin-top: 20px">
      <div class="row">
        <div class="card-deck text-center">
          <product-item-man
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
          </product-item-man>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import ProductItemMan from "@/components/products/ProductItemMan";
export default {
  components: {
    ProductItemMan
  },
  mounted() {
    this.$store.dispatch('man/GET_PRODUCTS')
  },
  computed: {
    ...mapGetters('man', ['products'])
  },
}
</script>

<style scoped>

</style>