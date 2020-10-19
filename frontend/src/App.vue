<template>
  <div>
    <component :is="NavbarCmp"></component>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/nav/Navbar"
import LoginNavbar from "@/components/nav/LoginNavbar";

  export default {
    data() {
      return {
        NavbarCmp: 'navbar'
      }
    },
    components: {
      Navbar,
      LoginNavbar
    },
    methods: {
      checkURL() {
        if(location.pathname === '/login' || location.pathname === '/cart'){
        this.NavbarCmp = 'login-navbar'
        } else {
          this.NavbarCmp = 'navbar'
        }
      }
    },
    created() {
      window.addEventListener('popstate', this.checkURL);
      window.addEventListener('click', this.checkURL);
      return this.checkURL();
    }
  }
</script>

<style>

</style>
