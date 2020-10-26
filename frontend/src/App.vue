<template>
  <div>
    <div class="alert-warning text-center text-uppercase"><b>UPOZORNĚNÍ:</b> jedná se o zkušební verzi webu</div>
    <component :is="NavbarCmp"></component>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/nav/Navbar"
import LoginNavbar from "@/components/nav/LoginNavbar";
import SingleProductNavbar from "@/components/nav/SingleProductNavbar";
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
      SingleProductNavbar
    },
    methods: {
      checkURL() {
        if (location.pathname === '/login' && !this.isAuthenticated || location.pathname === '/cart' || location.pathname === '/register' && !this.isAuthenticated || location.pathname === '/user' && !this.isAuthenticated) {
        this.NavbarCmp = 'login-navbar'
        } else if (location.pathname.length > 9 || location.pathname === '/user' && this.isAuthenticated || location.pathname === '/login' && this.isAuthenticated || location.pathname === '/register' && this.isAuthenticated) {
          this.NavbarCmp = 'single-product-navbar'
        } else {
          this.NavbarCmp = 'navbar'
        }
      }
    },
    created() {
      window.addEventListener('popstate', this.checkURL);
      window.addEventListener('click', this.checkURL);
      this.checkURL();
    },
    computed: {
      ...mapGetters('auth', ['status']),
      ...mapGetters('path', ['path']),
      ...mapGetters('user', ['isAuthenticated'])
    },
    watch: {
      path() {
        if (this.isAuthenticated) {
          this.$store.dispatch('user/checkTokenExp');
        }
      },
      status() {
       setTimeout(() => {
         this.checkURL();
       }, 1)
      }
    }
  }
</script>

<style>

</style>
