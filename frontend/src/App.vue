<template>
  <div>
    <div class="alert-warning text-center text-uppercase"><b>UPOZORNĚNÍ:</b> jedná se o zkušební verzi webu</div>
    <component :is="NavbarCmp"></component>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./components/nav/Navbar"
import LoginNavbar from "@/components/nav/LoginNavbar";
import SingleProductNavbar from "@/components/nav/SingleProductNavbar";
import Footer from "@/components/footer/Footer";
import {mapGetters} from "vuex";

  export default {
    data() {
      return {
        NavbarCmp: 'navbar'
      }
    },
    components: {
      Navbar,
      LoginNavbar,
      SingleProductNavbar,
      Footer
    },
    methods: {
      changeNavbar() {
        if (location.pathname === '/man' || location.pathname === '/woman' || location.pathname === '/products') {
          this.NavbarCmp = 'navbar'
        } else if (location.pathname === '/login' || location.pathname === '/cart/purchased' || location.pathname === '/cart/content'  || location.pathname === '/cart/shipping' || location.pathname === '/cart/contact') {
          this.NavbarCmp = 'login-navbar'
        } else {
          this.NavbarCmp = 'single-product-navbar'
        }
      }
    },
    mounted() {
      setTimeout(() => {
        window.addEventListener('popstate', this.changeNavbar);
        window.addEventListener('click', this.changeNavbar);
        this.changeNavbar();
      },1)
    },
    computed: {
      ...mapGetters('auth', ['status']),
      ...mapGetters('path', ['path']),
      ...mapGetters('user', ['isAuthenticated', 'isAdmin'])
    },
    watch: {
      path() {
        if (this.isAuthenticated) {
          this.$store.commit('user/token_exp');
        }
      },
      status() {
       setTimeout(() => {
         this.changeNavbar();
       }, 1)
      }
    }
  }
</script>

<style>

</style>
