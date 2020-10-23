<template>
  <div>
    <button @click="logout">LOGOUT</button>
  </div>
</template>

<script>
export default {
name: "user",
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    }
  }
}
</script>

<style scoped>

</style>