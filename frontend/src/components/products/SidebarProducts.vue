<template>
  <table class="table" style="margin-top: 20px">
    <tbody>
    <tr>
      <th scope="row" @click="removeFromCart({id: this.prodId, size: this.size})" style="font-size: 25px; cursor: pointer; font-weight: 400">&times;</th>
      <td><img :src="image" alt="photo" style="width: 70px; height: 93px"></td>
      <td>{{ name }} ({{ size }})</td>
      <td>{{ qty }} ks</td>
      <td>{{ price }} CZK</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {mapActions} from "vuex";

export default {
name: "SidebarProducts",
  props: ['prodId', 'size', 'price', 'name', 'qty', 'image'],
  methods: {
    ...mapActions('cart',['removeFromCart'])
  }
}
</script>

<style scoped>

</style>