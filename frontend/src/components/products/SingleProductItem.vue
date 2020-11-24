<template>
  <div class="container">
    <div class="row" style="margin-top: 40px">
<!-------------------------- SMALL PHOTOS ON THE LEFT SIDE -------------------------------------->
      <div class="col-3 col-md-2">
        <div class="left-side-photos" v-for="(picture, i) in picture" :key="i">
          <img class="small-photo" @click="changeMainPicture(picture, i)" :src="picture" alt="Card image cap">
        </div>
      </div>
<!---------------------------------- PHOTO LIGHTBOX GALLERY ------------------------------------------------------>
      <vue-easy-lightbox
          :visible="visible"
          :imgs="imgs"
          :index="index"
          @hide="hideLightbox"
      ></vue-easy-lightbox>
<!------------------------------------ MAIN PHOTO AND PHOTO SLIDER WHEN DEVICE IS SMALL ---------------------------------------------------->
      <div class="col-12 col-md-4 col-lg-3">
        <div class="img-container">
          <div class="imager-zoom" @click="showLightbox">
            <fai
                icon="expand-alt"
                size="lg"
            ></fai>
          </div>
          <img
               class="mainPhoto"
               :src="mainPicture"
               @click="showLightbox"
               alt="Card image cap">
        </div>
        <photo-slider
              :photos="picture"
              class="slider"
        ></photo-slider>
      </div>
<!------------------------------------ RIGHT CONTENT (DESCRIPTION, PRICE, BUTTON ..) -------------------------------------------------------->
      <div class="col-12 col-md-6 col-lg-6">
        <p class="description">{{ name }}</p>
        <div class="description-info">{{ description }}</div>
        <p class="price">{{ price }} Kč</p>
        <select v-model="selectedSize" @click="updateStock" class="form-control size-select">
          <option v-for="size in sizes" :key="size.name" :value="size.name" style="text-align: center">Vybraná velikost: {{ size.name }}</option>
        </select>
        <div class="stock-quantity">{{ stockQuantity }}</div>
        <br>
        <div class="addToCartBtn">
          <button class="btn btn-cvut rounded-pill" style="padding: 20px" :class="disableButton" :style="disableCursor" @click="addToCart">Přidat do košíku</button>
        </div>
      </div>
    </div>
  </div>
<!---------------------------- BLACK OVERLAY WHEN SIDE CART IS ACTIVE ------------------------------------------------------------------>
  <transition name="para">
    <div v-if="show" @click="close" id="overlay"></div>
  </transition>
<!---------------------------------- SIDE CART COMPONENT ---------------------------------------------------------->
  <side-cart></side-cart>
</template>

<script>
import SideCart from "@/components/ui/SideCart";
import VueEasyLightbox from 'vue-easy-lightbox';
import PhotoSlider from "@/components/ui/PhotoSlider";
export default {
  data() {
    return {
      mainPicture: this.picture[0],
      selectedSize: 'S',
      stock: 0,
      stockQuantity: '',
      disableButton: '',
      disableCursor: '',
      imgs: this.picture,
      visible: false,
      index: 0
    }
  },
  methods: {
    showLightbox() {
      this.visible = true
    },
    hideLightbox() {
      this.visible = false
    },
    changeMainPicture(picture, i) {
      this.mainPicture = picture
      this.index = i
    },
    updateStock() {
      const findSize = this.$props.sizes.find((size) => {
        return size.name === this.selectedSize;
      });
      this.stock = findSize.stock;
      if (this.stock >= 5) {
        this.stockQuantity = 'Skladem: > 5 ks'
        this.disableButton = ''
        this.disableCursor = ''
      } else if (this.stock === 0) {
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
      if (this.stock !== 0) {
        this.$store.commit('cart/addToCart', {
          id: this.id, image: this.picture[0], name: this.name, size: this.selectedSize, price: this.price, sizes: this.sizes
        });
        this.$store.commit('sidebarHandler/SHOW_MENU');
        this.$store.commit('stages/SET_STAGE', '/cart/content');
      }
    },
    close() {
      this.$store.commit('sidebarHandler/CLOSE_MENU');
    }
  },
  props: ['key', 'id', 'name', 'picture', 'description', 'category', 'sizes', 'price'],
  components: {
    SideCart,
    VueEasyLightbox,
    PhotoSlider
  },
  created() {
    this.updateStock();
  },
  computed: {
    show() {
      return this.$store.getters['sidebarHandler/show']
    }
  }
}
</script>

<style scoped>
.img-container {
  display: inline-block;
  position: relative;
  z-index: 1;
}
.imager-zoom {
  background: rgba(102, 102, 102, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 12px;
  right: 12px;
  cursor: pointer;
  text-align: center;
  padding-top: 7px;
  padding-left: 1px;
  color: white;
  z-index: 1;
  transition: 0.3s;
}

.imager-zoom:hover {
  transition: 0.3s;
  background: #666666;
}

.slider {
  z-index: 0;
  display: none;
}
.small-photo {
  height: 94px;
  width: 70px;
  margin-bottom: 10px;
  cursor: pointer;
}
.small-photo:hover {
  border: 1px solid #0065bd;
  transition: 200ms;
}
.left-side-photos {
  display: block;
  flex-basis: 85px;
  max-width: 55px;
  margin-left: auto;
}
.stock-quantity {
  margin-top: 10px;
  width: 100%;
  font-weight: lighter;
  margin-left: 20px;
}
.price {
  font-weight: bold;
  font-size: 40px;
  color: #0065bd;
  margin-top: 10px;
  margin-left: 20px;
}
.description-info {
  font-weight: lighter;
  width: 70%;
  margin-left: 20px;
}
.description {
  font-size: 25px;
  font-weight: 400;
  margin-left: 20px;
}
.mainPhoto {
  height: 420px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}

.size-select {
  width: 70%;
  margin-left: 20px;
}

.btn-cvut {
  width: 70%;
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
  margin-left: 20px;
}

/*@media (max-width: 992px) {
  .container {
    max-width: 790px;
  }
}

@media (max-width: 991px) {
  .left-side-photos {
    padding-right: 30px;
    padding-left: 0;
  }
}*/
@media (max-width: 992px) AND (min-width: 768px) {
  .col-md-6 {
    max-width: 40%;
  }
}

@media (max-width: 991px) {
  .btn-cvut {
    width: 100%;
  }
  .size-select {
    width: 100%;
  }
  .description-info {
    width: 100%;
  }
}

@media (max-width: 1199px) {
  .btn-cvut {
    margin-left: 60px;
  }
  .size-select {
    margin-left: 60px;
  }
  .description-info {
    margin-left: 60px;
  }
  .description {
    margin-left: 60px;
  }
  .price {
    margin-left: 60px;
  }
  .stock-quantity {
    margin-left: 60px;
  }
}

@media (max-width: 767px) {
  .description {
    text-align: center;
    margin-left: 0;
  }
  .slider {
    display: block;
  }
  .img-container {
    display: none;
  }
  .left-side-photos {
    display: none;
  }
  .description-info {
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
  }
  .price {
    text-align: center;
    margin-left: 0;
  }
  .size-select {
    width: 100%;
    text-align-last: center;
    margin-left: 0;
  }
  .stock-quantity {
    text-align: center;
    margin-left: 0;
  }
  .addToCartBtn {
    text-align: center;
    margin-left: 0;
  }
  .mainPhoto {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
  .btn-cvut {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
    margin-left: 0;
  }
}

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

.para-enter-from {
  opacity: 0;
}

.para-enter-active {
  transition: all 0.5s ease-out;
}

.para-enter-to {
  opacity: 1;
}

.para-leave-to {
  opacity: 0;
}

.para-leave-active {
  transition: all 0.5s ease-in;
}

.para-leave-from {
  opacity: 1;
}
</style>