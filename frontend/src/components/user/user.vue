<template>
  <div class="container">
    <div class="account-settings">
      <div class="row">
        <div class="col-12 col-lg-2">
          <hr>
          <div class="menu">
            <h5><b>Můj profil</b></h5>
            <br>
            <router-link :to="isAuthenticated ?'/user/orders' : '/login'"><p>Moje objednávky</p></router-link>
            <router-link :to="isAuthenticated ?'/user/settings' : '/login'"><p>Nastavení účtu</p></router-link>
            <br>
            <p @click="logout" class="logout">Odhlásit se</p>
          </div>
          <hr>
          <div class="menu" v-if="isAdmin">
            <router-link to="/admin"><button class="btn btn-dark rounded-pill" type="button"><fai icon="tools"></fai> Spravovat</button></router-link>
          </div>
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
import {mapGetters} from "vuex";
export default {
name: "user",
  methods: {
    logout() {
      router.push('/')
      setTimeout(() => {
        this.$store.commit('user/user_logout');
      },1)
    }
  },
  mounted() {
    const path = location.pathname;
    this.$store.commit('path/SET_PATH', path);
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'isAdmin'])
  },
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