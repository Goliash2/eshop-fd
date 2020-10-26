<template>
  <div>
    <button @click="logout">LOGOUT</button>
    {{ userInfo }}
  </div>
</template>

<script>
import {mapGetters} from "vuex";
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
        this.$store.dispatch('user/logout');
      },1)
    }
  },
  mounted() {
    const path = location.pathname;
    this.$store.dispatch('path/GET_PATH', path);
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated', 'userInfo'])
  },
  created() {
    if (this.isAuthenticated) {
      this.$store.dispatch('user/checkTokenExp');
    }
  }
}
</script>

<style scoped>

</style>