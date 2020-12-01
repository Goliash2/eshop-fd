<template>
  <div v-if="resized" class="d-flex justify-content-around navbar navbar-expand-lg fixed-top" id="mainNav" :style="scrolled ? 'background-color:rgba(0,0,0,0.9); transition: 0.5s ease' : 'transition: 0.5s ease'">
    <div>
      <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="../../assets/images/logo_FD.png" style="height: 50px" alt="LOGO FD" /></a>
    </div>
    <div style="padding-top: 5px" v-if="resized">
      <ul class="navbar-nav text-uppercase">
        <router-link to="/man" class="nav-item"><a class="nav-link js-scroll-trigger" href="#man">MUŽI</a></router-link>
        <router-link to="/woman" class="nav-item"><a class="nav-link js-scroll-trigger" href="#woman">ŽENY</a></router-link>
        <router-link to="/products" class="nav-item"><a class="nav-link js-scroll-trigger" href="#">OSTATNÍ</a></router-link>
      </ul>
    </div>
    <div style="padding-top: 5px; text-align: center" v-if="resized">
      <ul class="navbar-nav">
        <router-link :to="stage" class="nav-item"><a class="nav-link js-scroll-trigger" href="#"><span v-if="quantity !== 0" class="badge">{{ quantity }}</span><fai icon="shopping-cart" size="lg" /><span class="icon_span">Košík</span></a></router-link>
        <router-link v-if="!isAuthenticated" to="/login" class="nav-item"><a class="nav-link js-scroll-trigger"><fai icon="user" size="lg" /><span class="icon_span">Přihlásit se</span></a></router-link>
        <router-link v-if="isAuthenticated" to="/user/orders" class="nav-item"><a class="nav-link js-scroll-trigger"><fai icon="user" size="lg" /><span class="icon_span">Můj účet</span></a></router-link>
      </ul>
    </div>
  </div>
  <burger-menu v-if="!resized"></burger-menu>
  <masthead></masthead>
</template>

<script>
import Masthead from "@/components/nav/Masthead";
import BurgerMenu from "@/components/nav/BurgerMenu";
import {mapGetters} from "vuex";
  export default {
    data() {
      return {
        scrolled: false,
        resized: true
      }
    },
    components: {
      Masthead,
      BurgerMenu
    },
    methods: {
      handleScroll() {
        this.scrolled = window.scrollY >= 100;
      },
      handleResize() {
        this.resized = window.outerWidth >= 991;
      }
    },
    created: function() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
      return this.handleResize();
    },
    computed: {
      ...mapGetters('cart', ['quantity']),
      ...mapGetters('user', ['isAuthenticated']),
      ...mapGetters('stages', ['stage']),
    },
  }
</script>

<style scoped>
  .badge {
    position: absolute;
    color: white;
    background-color: #0065bd;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    text-align: center;
    margin: 12px;
    align-items: center;
    font-weight: 100;
    justify-content: center;
    -webkit-box-align: center;-webkit-box-pack: center;
    transition: opacity 0.3s ease;
  }
  .icon_span {
    display: block;
    padding-top: 8px;
    font-weight: lighter;
  }

</style>