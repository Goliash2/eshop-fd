<template>
  <section id="woman">
    <div class="container" style="margin-top: 20px">
      <div class="card-deck mb-lg-3 text-center">
        <product-item-woman
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
        </product-item-woman>
      </div>
    </div>
  </section>
</template>

<script>
import {mapGetters} from "vuex";
import ProductItemWoman from "@/components/products/ProductItemWoman";
export default {
  components: {
    ProductItemWoman
  },
  mounted() {
    this.$store.dispatch('woman/GET_PRODUCTS')
  },
  computed: {
    ...mapGetters('woman', ['products'])
  },
}
</script>

<style scoped>

</style>