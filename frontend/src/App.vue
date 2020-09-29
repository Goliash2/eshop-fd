<template>
  <div>
   <h1>VUE 3 APP</h1>
    <test-cmp :text="message"></test-cmp>
    <test2-cmp></test2-cmp>
  </div>
</template>

<script>
  import testCmp from './components/test';
  import test2Cmp from './components/test2';
  export default {
    data() {
      return {
        message: 'This is message'
      }
    },
    components: {
      testCmp,
      test2Cmp
    }
  }
</script>

<style>

</style>
