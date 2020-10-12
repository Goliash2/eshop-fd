<template>
  <li>
    <div>
      <img :src="image" />
    </div>
    <div>
      <h3>{{ name }}</h3>
      <div class="item__data">
        <div>
          Price per Item:
          <strong>CZK{{ price }}</strong>
        </div>
        <div>
          Quantity:
          <strong>{{ qty }}</strong>
        </div>
        <div>
          Size:
          <strong>{{ size }}</strong>
        </div>
      </div>
      <div class="item__total">Total: {{ itemTotal }}</div>
      <button @click="removeFromCart({id: this.prodId, size: this.size})">Remove</button>
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: ['prodId', 'size', 'price', 'name', 'qty', 'image'],
  computed: {
    itemTotal() {
      return (this.price * this.qty).toFixed(2);
    }
  },
  methods: {
    ...mapActions('cart',['removeFromCart'])
  }
};
</script>

<style scoped>


</style>