<template>
  <div>
    <single-product-item
        v-for="item in product"
        :key="item._id"
        :id="item._id"
        :name="item.name"
        :picture="item.pictures"
        :description="item.description"
        :category="item.categories"
        :sizes="item.size"
        :price="item.price"
    ></single-product-item>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import SingleProductItem from "@/components/products/SingleProductItem";
export default {
  data () {
    return {
      pathResult: ''
    }
  },
  name: 'product',
  components: {
    SingleProductItem
  },
  created() {
    const path = this.$route.path;
    const pathGetter = path.split("/");
    this.pathResult = pathGetter[2];
  },
  mounted() {
    const path = location.pathname;
    this.$store.commit('guard/CLOSE_MENU');
    this.$store.commit('path/SET_PATH', path);
    this.$store.dispatch('product/GET_PRODUCT', {id: this.pathResult});
  },
  computed: {
    ...mapGetters('product', ['product'])
  }
}
</script>

<style scoped>

</style>