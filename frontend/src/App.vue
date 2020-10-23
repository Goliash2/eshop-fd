<template>
  <div>
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
        if(location.pathname === '/login' || location.pathname === '/cart' || location.pathname === '/register'){
        this.NavbarCmp = 'login-navbar'
        } else if (location.pathname.length > 9 ) {
          this.NavbarCmp = 'single-product-navbar'
        } else {
          this.NavbarCmp = 'navbar'
        }
      }
    },
    created() {
      window.addEventListener('popstate', this.checkURL);
      window.addEventListener('click', this.checkURL);
      return this.checkURL();
    },
    computed: {
      ...mapGetters('auth', ['status'])
    },
    watch: {
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
