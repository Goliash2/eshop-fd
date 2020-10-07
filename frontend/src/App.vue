<template>
  <div>
    <navbar></navbar>
    <users-list></users-list>
  </div>
</template>

<script>
import UsersList from './components/pages/UsersList'
import Navbar from "./components/nav/Navbar"
  export default {
    components: {
      UsersList,
      Navbar
    }
  }
</script>

<style>

</style>
