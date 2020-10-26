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
    const path = location.pathname;
    this.$store.dispatch('path/GET_PATH', path);
    this.$store.dispatch('man/GET_PRODUCTS')
  },
  computed: {
    ...mapGetters('man', ['products'])
  },
}
</script>

<style scoped>

</style>