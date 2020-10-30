<template>
  <div v-if="show" data-aos="fade-right" class="sidenav" :style="dynStyle">
    <a class="closebtn" @click="close"><fai icon="long-arrow-alt-left" size="1x" /></a>
    <div class="text-center" style="margin-top: 0; font-size: 20px">Váš košík <div class="badge">{{ quantity }}</div></div>
      <sidebar-products
          v-for="item in cartItems"
          :key="item.productId"
          :prod-id="item.productId"
          :name="item.name"
          :size="item.size"
          :image="item.image"
          :price="item.price"
          :qty="item.qty"
      ></sidebar-products>
    <table class="table" style="margin-top: 20px">
      <tbody>
      <tr>
        <th scope="row">Cena celkem s DPH</th>
        <td>{{ cartTotal }} CZK</td>
      </tr>
      </tbody>
    </table>
    <router-link to="/cart">
      <div class="text-center" style="margin-bottom: 20px">
        <button class="btn btn-cart" style="width: 100%; padding: 20px">Vstoupit do Košíku</button>
      </div>
    </router-link>
  </div>
</template>

<script>
import SidebarProducts from "@/components/products/SidebarProducts";
export default {
  data() {
    return {
      dynStyle: '',
      counter: 0
    }
  },
  components: {
    SidebarProducts
  },
  methods: {
    expand() {
      if (window.innerWidth >= 991) {
        this.dynStyle = 'width: 370px; top:145px; padding: 25px'
      } else {
        this.dynStyle = 'width: 100%; top:0; padding: 25px'
      }
    },
    close() {
      this.$store.dispatch('guard/close');
    }
  },
  watch: {
    show() {
      this.expand();
    }
  },
  computed: {
    cartTotal() {
      return this.$store.getters['cart/totalSum'].toFixed(2);
    },
    cartItems() {
      return this.$store.getters['cart/products']
    },
    quantity() {
      return this.$store.getters['cart/quantity']
    },
    show() {
      return this.$store.getters['guard/show']
    }
  }
}
</script>

<style scoped>
.btn-cart {
  color: #fff;
  background-color: #0065bd;
  border-color: #026dca;
}

.badge {
  position: absolute;
  color: white;
  background-color: #0065bd;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  margin-left: 5px;
  margin-top: 3px;
  text-align: center;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  -webkit-box-align: center;-webkit-box-pack: center;
}

.sidenav {
  height: 100%;
  width: 0;
  position: absolute;
  z-index: 1;
  left: 0;
  background-color: #ffffff;
  overflow-x: hidden;
  transition: 0.5s;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #000000;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 25px;
  cursor: pointer;
}
</style>