<template>
  <transition :name="transitionName">
    <div v-if="show" class="sidenav" :style="sidebarWidth">
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
      <router-link to="/cart/content">
        <div class="text-center" style="margin-bottom: 20px">
          <button class="btn btn-cvut rounded-pill" @click="close" style="width: 100%; padding: 20px">Vstoupit do Košíku</button>
        </div>
      </router-link>
    </div>
  </transition>
</template>

<script>
import SidebarProducts from "@/components/products/SidebarProducts";
export default {
  data() {
    return {
      sidebarWidth: '',
      transitionName: 'v'
    }
  },
  components: {
    SidebarProducts
  },
  methods: {
    expand() {
      if (window.innerWidth >= 991) {
        this.sidebarWidth = 'width: 370px;'
        this.transitionName = 'v'
      } else {
        this.sidebarWidth = 'width: 100%;'
        this.transitionName = 'large'
      }
    },
    close() {
      this.$store.commit('sidebarHandler/CLOSE_MENU');
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
      return this.$store.getters['sidebarHandler/show']
    }
  },
  created() {
    window.addEventListener('resize', this.expand);
  }
}
</script>

<style scoped>
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
  position: fixed;
  z-index: 1;
  left: 0;
  background-color: #ffffff;
  overflow-x: hidden;
  top:0;
  padding: 25px;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #000000;
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

.v-enter-from {
  transform: translateX(-370px);
}

.v-enter-active {
  transition: all 0.5s ease-out;
}

.v-enter-to {
  transform: translateX(0);
}

.v-leave-to {
  transform: translateX(-370px);
}

.v-leave-active {
  transition: all 0.5s ease-in;
}

.v-leave-from {
  transform: translateX(0);
}

.large-enter-from {
  opacity: 0;
}

.large-enter-active {
  transition: all 0.5s ease-out;
}

.large-enter-to {
  opacity: 1;
}

.large-leave-to {
  opacity: 0;
}

.large-leave-active {
  transition: all 0.5s ease-in;
}

.large-leave-from {
  opacity: 1;
}

</style>