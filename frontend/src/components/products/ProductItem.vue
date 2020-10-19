<template>
  <div class="col-md-3 col-sm-6">
    <div class="card">
      <router-link :to="{ name: 'product', params: {productId: id} }">
        <img class="card-img-top" :src="picture[0]" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ name }}</h5>
          <p class="card-text"> {{ description }} </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ category[0] }} {{ category[1] }} </li>
          <li class="list-group-item"> {{ price }} CZK </li>
        </ul>
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

</style>