<template>
  <div class="item">
    <div class="image">
      <img :style="imgStyle" :src="image" alt="" />
    </div>
    <div class="description">
      <span>{{ name }}</span>
      <span>Velikost: {{ size }}</span>
    </div>
    <div class="quantity">
      <button v-if="qty === 1" class="amount-btn" style="background: none; cursor: default">{{ space }}</button>
      <button @click="decrease" v-if="qty > 1" class="amount-btn">
        -
      </button>
      {{'\xa0' + qty + '\xa0'}}
      <button @click="increase" class="amount-btn" type="button" name="button">
        +
      </button>
    </div>
    <div class="total-price">CZK {{ itemTotal }}</div>
    <div class="buttons" v-if="resized">
      <span class="delete-btn" @click="removeItem"><fai icon="times-circle" size="lg" style="color: #ff4444"></fai></span>
    </div>
    <div class="description" v-if="!resized">
      <button class="btn btn-danger rounded-pill" @click="removeItem">Odstranit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['key', 'prodId', 'size', 'price', 'name', 'qty', 'image', 'sizes'],
  data() {
    return {
      imgStyle: '',
      resized: true,
      space: '\xa0'
    }
  },
  computed: {
    itemTotal() {
      return (this.price * this.qty).toFixed(2);
    }
  },
  methods: {
    removeItem() {
      this.$store.commit('cart/removeProductFromCart', {
        id: this.prodId, size: this.size
      });
    },
    increase() {
      this.$store.commit('cart/increaseItem', {
        id: this.prodId, size: this.size, sizes: this.sizes
      });
    },
    decrease() {
      this.$store.commit('cart/decreaseItem', {
        id: this.prodId, size: this.size
      });
    },
    resizeImg() {
      if (window.innerWidth <= 800) {
        this.resized = false
        this.imgStyle = 'width: 100%'
      } else {
        this.resized = true
        this.imgStyle = 'height: 190px'
      }
    }
  },
  created() {
    window.addEventListener('resize', this.resizeImg);
    return this.resizeImg();
  }
};
</script>

<style scoped>
.item {
  padding: 20px 100px;
  display: flex;
  border-top:  1px solid #E1E8EE;
  border-bottom:  1px solid #E1E8EE;
}

.buttons {
  position: relative;
  padding-top: 70px;
  margin-left: 70px;
}

.delete-btn {
  width: 18px;
  height: 17px;
  display: inline-block;
  Cursor: pointer;
}

.image {
  margin-right: 50px;
}

.description {
  padding-top: 56px;
  margin-right: 60px;
  width: 131px;
}

.description span {
  display: block;
  font-size: 18px;
  color: #43484D;
  font-weight: 400;
}

.quantity {
  padding-top: 70px;
  margin-right: 60px;
}

.amount-btn {
  width: 30px;
  height: 30px;
  background-color: #E1E8EE;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.total-price {
  width: 100px;
  padding-top: 70px;
  text-align: center;
  font-size: 18px;
  color: #43484D;
  font-weight: 300;
}

@media (max-width: 800px) {
  .item {
    height: auto;
    flex-wrap: wrap;
    justify-content: center;
  }

  .image,
  .quantity,
  .description {
    width: 100%;
    text-align: center;
    margin: 6px 0;
  }

  .description {
    padding-top: 10px;
  }

  .quantity {
    padding-top: 0;
  }
  .buttons {
    text-align: center;
    margin-left: 24px;
    margin-bottom: 5px;
    margin-top: -3px;
  }

  .total-price {
    padding-top: 8px;
  }
}

</style>