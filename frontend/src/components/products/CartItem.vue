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
      <button @click="decrease" v-if="qty === 1" class="amount-btn" style="background: none" type="button" name="button">{{ space }}</button>
      <button @click="decrease" v-if="qty > 1" class="amount-btn" type="button" name="button">
        -
      </button>
      {{'\xa0' + qty + '\xa0 '}}
      <button @click="increase" class="amount-btn" type="button" name="button">
        +
      </button>
    </div>
    <div class="total-price">CZK {{ itemTotal }}</div>
    <div class="buttons" v-if="resized">
      <span class="delete-btn" @click="removeFromCart({id: this.prodId, size: this.size})"><fai icon="times-circle" size="lg" style="color: #ff4444"></fai></span>
    </div>
    <div class="description" v-if="!resized">
      <button class="btn btn-danger rounded-pill" @click="removeFromCart({id: this.prodId, size: this.size})">Odstranit</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['key', 'prodId', 'size', 'price', 'name', 'qty', 'image', 'sizes'],
  data() {
    return {
      imgStyle: 'height: 99px; width 70px',
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
    ...mapActions('cart',['removeFromCart']),
    increase() {
      this.$store.dispatch('cart/increaseItem', {
        id: this.prodId, size: this.size, sizes: this.sizes
      });
    },
    decrease() {
      this.$store.dispatch('cart/decreaseItem', {
        id: this.prodId, size: this.size
      });
    },
    resizeImg() {
      if (window.innerWidth <= 800) {
        this.resized = false
        this.imgStyle = 'width: 50%'
      } else {
        this.resized = true
        this.imgStyle = 'height: 99px; width 70px'
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
  padding: 20px 30px;
  display: flex;
  border-top:  1px solid #E1E8EE;
  border-bottom:  1px solid #E1E8EE;
}

.buttons {
  position: relative;
  padding-top: 30px;
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
  padding-top: 10px;
  margin-right: 60px;
  width: 115px;
}

.description span {
  display: block;
  font-size: 14px;
  color: #43484D;
  font-weight: 400;
}

.description span:first-child {
  margin-bottom: 5px;
}
.description span:last-child {
  font-weight: 300;
  margin-top: 8px;
  color: #86939E;
}
.quantity {
  padding-top: 25px;
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

.amount-btn:focus {
  outline:0;
}

.total-price {
  width: 100px;
  padding-top: 27px;
  text-align: center;
  font-size: 16px;
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