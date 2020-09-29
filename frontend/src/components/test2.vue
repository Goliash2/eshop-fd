<template>
  <div>
    test 2 cmp
    <button @click="sendText" class="btn btn-info">Click me!</button>
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