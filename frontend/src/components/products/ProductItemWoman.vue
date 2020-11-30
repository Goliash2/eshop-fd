<template>
  <div class="product-card" @mouseenter="changeImage" @mouseleave="changeImage">
    <router-link :to="{ name: 'product', params: {productId: id} }">
      <div class="product-image">
        <transition name="zoom">
          <div class="zoom-image" v-if="displayZoom">
            <fai icon="search-plus"></fai>
          </div>
        </transition>
        <div class="new" v-if="productIsNew">
          NOVÉ
        </div>
        <img :src="mainImage">
      </div>
      <div class="product-info">
        <h6>{{ name }}</h6>
        <p>{{ price }} CZK</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ['key', 'id', 'name', 'picture', 'description', 'category', 'sizes', 'price', 'created'],
  data() {
    return {
      mainImage: this.picture[0],
      displayZoom: false,
      productIsNew: false
    }
  },
  methods: {
    changeImage() {
      if (this.mainImage === this.picture[0]) {
        this.mainImage = this.picture[1]
        this.displayZoom = true
      } else {
        this.mainImage = this.picture[0]
        this.displayZoom = false
      }
    }
  },
  created() {
    const today = new Date()
    const then = Date.parse(this.created)
    const diffTime = Math.abs(then - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.productIsNew = diffDays < 14;
  }
}
</script>

<style scoped>
.new {
  bottom: 0;
  height: 20px;
  width:80px;
  background-color: #0065bd;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-weight: 400;
  font-size: 13px;
}
.discount {
  bottom: 0;
  height: 20px;
  width:80px;
  background-color: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  font-weight: 400;
  font-size: 13px;
}
.zoom-image {
  height: 40px;
  width: 40px;
  background-color: #282828;
  position: absolute;
  margin-top: 0;
  margin-left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: 0.3s;
}

.zoom-image:hover {
  color: #0065bd;
  transition: 0.3s;
}

h6 {
  font-weight: 400;
}
a {
  color: black;
}
.product-card {
  display: flex;
  flex-direction: column;

  padding: 2%;
  flex-basis: 25%;

  background-color: #FFF;
}
.product-image {
  position: relative;
}
.product-image img {
  width: 100%;
}

.product-info {
  margin-top: auto;
  padding-top: 20px;
  text-align: center;
}

@media ( max-width: 920px ) {

  .product-card {
    flex-basis: 33%;
  }

}

@media ( max-width: 600px ) {

  .product-card {
    flex-basis: 50%;
  }

}
.zoom-enter-from {
  opacity: 0
}

.zoom-enter-active {
  transition: all 0.3s ease-out;
}

.zoom-enter-to {
  opacity: 1
}

.zoom-leave-to {
  opacity: 0;
}

.zoom-leave-active {
  transition: all 0.3s ease-in;
}

.zoom-leave-from {
  opacity: 1
}

</style>