<template>
  <div class="container">
    <div class="account-settings">
      <div class="row">
        <div class="col-12 col-lg-2">
          <hr>
          <div class="menu">
            <h5><b>Můj profil</b></h5>
            <br>
            <router-link to="/user/orders"><p>Moje objednávky</p></router-link>
            <router-link to="/user/settings"><p>Nastavení účtu</p></router-link>
            <br>
            <p @click="logout" class="logout">Odhlásit se</p>
          </div>
          <hr>
        </div>
        <div class="col-12 col-lg-10">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
name: "user",
  data() {
    return {
      date: null
    }
  },
  methods: {
    logout() {
      router.push('/products')
      setTimeout(() => {
        this.$store.commit('user/user_logout');
      },1)
    }
  },
  mounted() {
    const path = location.pathname;
    this.$store.commit('path/SET_PATH', path);
  },
  created() {
    if (this.isAuthenticated) {
      this.$store.commit('user/token_exp');
    }
  }
}
</script>

<style scoped>
.logout {
  cursor: pointer;
}
.logout:hover {
  font-weight: bold;
}
a {
  text-decoration: none;
  color: black;
}
a:hover,
a:active,
a.router-link-active {
  font-weight: bold;
}
.menu {
  text-align: left;
}
.account-settings {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
}
@media (max-width: 991px) {
  .menu {
    text-align: center;
  }
}
</style>