<template>
  <div class="card mb-4 shadow-sm">
    <div class="card-header">
      <h4 class="my-0 font-weight-normal">{{ name }}</h4>
    </div>
    <div class="card-body">
      <p> {{ username }} </p>
      <p> {{ email }} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['key', 'id', 'name', 'username', 'email']
}
</script>

<style scoped>
  p {
    color: black;
  }
</style>