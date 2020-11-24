<template>
  <swiper
      :slides-per-view="1"
      :space-between="10"
      :pagination="{ clickable: true }"
  >
    <swiper-slide v-for="photo in photos" :key="photo"><img class="slide-image" :src="photo" alt="foto"></swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Pagination, A11y } from 'swiper';
SwiperCore.use([Pagination, A11y]);
export default {
name: "PhotoSlider",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['photos']
}
</script>

<style scoped>
  .slide-image {
    height: 500px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 40px;
  }
</style>