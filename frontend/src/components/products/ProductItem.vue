<template>
  <div class="card mb-lg-3 shadow-sm">
    <img class="card-img-top" :src="picture[dynamicIndex]" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text"> {{ description }} </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">{{ category[0] }} {{ category[1] }} </li>
    </ul>
    Výběr velikosti
    <select v-model="selectedSize" @click="updateIsStock" style="text-align-last: center">
      <option v-for="size in sizes" :key="size.name" :value="size.name" style="text-align: center">Vybraná velikost: {{ size.name }}</option>
    </select>
    Skladem: {{ isStock }} Ks
    <div class="card-body">
      <a href="#" class="card-link"><button class="btn btn-primary">Add to Cart</button></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicIndex: 0,
      selectedSize: 'S',
      isStock: 0
    }
  },
  methods: {
    updateIsStock() {
      if (this.selectedSize === 'S') {
        this.isStock = this.$props.sizes[0].stock;
      } else if (this.selectedSize === 'M') {
        this.isStock = this.$props.sizes[1].stock;
      } else if (this.selectedSize === 'L') {
        this.isStock = this.$props.sizes[2].stock;
      }
    }
  },
  props: ['key', 'id', 'name', 'picture', 'description', 'stock', 'category', 'sizes'],
  created() {
    return this.updateIsStock();
  }
}
</script>

<style scoped>

</style>