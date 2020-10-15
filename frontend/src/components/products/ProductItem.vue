<template>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <img class="card-img-top" :src="picture[dynamicIndex]" alt="Card image cap">
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
</template>

<script>
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
      }
    }
  },
  props: ['key', 'id', 'name', 'picture', 'description', 'stock', 'category', 'sizes', 'price'],
  created() {
    this.updateIsStock();
  }
}
</script>

<style scoped>

</style>