<template>
  <div class="container" style="margin-top: 20px">
    <div class="card-deck mb-3 text-center">
      <user-item
          v-for="user in users"
          :key="user.id"
          :id="user.id"
          :name="user.name"
          :username="user.username"
          :email="user.email"
      >
      </user-item>
    </div>
  </div>
</template>

<script>
import UserItem from "@/components/users/UserItem";
import { mapGetters } from 'vuex';
export default {
  components: {
    UserItem
  },
  computed: {
    ...mapGetters('usr', ['users'])
  },
  mounted() {
    this.$store.dispatch('usr/GET_USERS')
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
  text-align: center;
}
</style>