<template>
  <div class="d-flex justify-content-around navbar navbar-expand-lg" style="background-color:rgba(0,0,0,0.9); transition: 0.5s ease">
    <div style="padding-top: 5px">
      <ul class="navbar-nav">
        <router-link to="/" class="nav-item"><a class="nav-link js-scroll-trigger"><button class="btn btn-primary rounded-pill" style="font-weight: 400"><fai icon="long-arrow-alt-left" size="1x" /> Obchod</button></a></router-link>
      </ul>
    </div>
    <div>
      <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="../../assets/images/logo_FD.png" style="height: 50px" alt="LOGO FD" /></a>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      resized: true
    }
  },
  methods: {
    handleResize() {
      this.resized = window.outerWidth >= 991;
    }
  },
  created: function() {
    window.addEventListener('resize', this.handleResize);
    return this.handleResize();
  },
}
</script>

<style scoped>

.icon_span {
  display: block;
  padding-top: 5px;
  font-weight: lighter;
}

</style>