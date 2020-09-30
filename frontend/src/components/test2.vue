<template>
  <div>
    test 2 cmp
    <button @click="sendText" class="btn btn-info" >Add To Cart! <fa icon="shopping-cart" style="height: 20px"></fa></button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        variable: ''
      }
    },
    methods: {
      sendText() {
        this.variable = 'text has been set!'
        this.eventBus.emit('send-text', this.variable);
      }
    }
  }
</script>