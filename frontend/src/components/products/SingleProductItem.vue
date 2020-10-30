<template>
  <div class="container">
    <div class="card">
      <img class="card-img-top" style="height: 200px; width: 170px" :src="picture[dynamicIndex]" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ name }}</h5>
        <p class="card-text"> {{ description }} </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ category[0] }} {{ category[1] }} </li>
        <li class="list-group-item"> {{ price }} CZK </li>
      </ul>
      Výběr velikosti
      <select v-model="selectedSize" @click="updateIsStock" style="text-align-last: center">
        <option v-for="size in sizes" :key="size.name" :value="size.name" style="text-align: center">Vybraná velikost: {{ size.name }}</option>
      </select>
      {{ stockQuantity }}
      <div class="card-body">
        <button class="btn btn-primary" :class="disableButton" :style="disableCursor" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
  <div v-if="show" @click="close" id="overlay"></div>
  <side-cart></side-cart>
</template>

<script>
import SideCart from "@/components/ui/SideCart";
export default {
  data() {
    return {
      dynamicIndex: 0,
      selectedSize: 'S',
      isStock: 0,
      stockQuantity: '',
      disableButton: '',
      disableCursor: ''
    }
  },
  methods: {
    updateIsStock() {
      const findSize = this.$props.sizes.find((size) => {
        return size.name === this.selectedSize;
      });
      this.isStock = findSize.stock;
      if (this.isStock >= 5) {
        this.stockQuantity = 'Skladem: > 5 ks'
        this.disableButton = ''
        this.disableCursor = ''
      } else if (this.isStock === 0) {
        this.stockQuantity ='Není skladem'
        this.disableButton = 'disabled'
        this.disableCursor = 'cursor:not-allowed'
      } else {
        this.stockQuantity = 'Skladem: < 5 ks'
        this.disableButton = ''
        this.disableCursor = ''
      }
    },
    addToCart() {
      if (this.isStock !== 0) {
        this.$store.dispatch('cart/addToCart', {
          id: this.id, image: this.picture[0], name: this.name, size: this.selectedSize, price: this.price, sizes: this.sizes
        });
        this.$store.dispatch('guard/show');
      }
    },
    close() {
      this.$store.dispatch('guard/close');
    }
  },
  props: ['key', 'id', 'name', 'picture', 'description', 'category', 'sizes', 'price'],
  components: {
    SideCart
  },
  created() {
    this.updateIsStock();
  },
  computed: {
    show() {
      return this.$store.getters['guard/show']
    }
  }
}
</script>

<style scoped>
#overlay {
  position: fixed; /* Sit on top of the page content */
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 1; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
</style>