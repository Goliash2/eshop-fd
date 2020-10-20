<template>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <router-link :to="{ name: 'product', params: {productId: id} }">
        <img class="card-img-top" :src="picture[0]" alt="Card image cap">
        <div class="card-body">
          <h6 class="card-title">{{ name }}</h6>
          {{ price }} CZK
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['key', 'id', 'name', 'picture', 'description', 'category', 'sizes', 'price']
}
</script>

<style scoped>
a {
  color: black;
}
</style>