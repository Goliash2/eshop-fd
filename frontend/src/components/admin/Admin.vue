<template>
  <div class="container">
    <div class="admin-section">
      <div class="row">
        <div class="col-12 col-lg-2">
          <hr>
          <div class="menu">
            <h5><b>Editovat stránky</b></h5>
            <br>
            <router-link to='/admin/create'><p>Přidat produkt</p></router-link>
            <router-link to='/admin/change'><p>Upravit produkt</p></router-link>
            <router-link to='/admin/remove'><p>Odebrat produkt</p></router-link>
            <br>
            <router-link to='/user/orders'>Nastavení uživatele</router-link>
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
import {mapGetters} from "vuex";

export default {
name: "Admin",
  computed: {
    ...mapGetters('user', ['isAdmin'])
  },
}
</script>

<style scoped>
  .admin-section {
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
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
  @media (max-width: 991px) {
    .menu {
      text-align: center;
    }
  }
</style>