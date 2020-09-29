<template>
  <div>
    {{ text }}
    <br>
    {{ variable2 }}
    <br>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        variable2: ''
      }
    },
    props: ['text'],
    created() {
      this.eventBus.on('send-text', data => {
        this.variable2 = data;
      });
    }
  }
</script>