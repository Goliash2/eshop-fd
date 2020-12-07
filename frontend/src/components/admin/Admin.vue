<template>
  <div>
    {{ isAdmin }}
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

</style>