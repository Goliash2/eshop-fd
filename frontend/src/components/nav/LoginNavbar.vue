<template>
  <div class="d-flex justify-content-around navbar navbar-expand-lg" id="mainNav" style="background-color:rgba(0,0,0,0.9); transition: 0.5s ease">
    <div style="padding-top: 5px">
      <ul class="navbar-nav">
        <router-link to="/" class="nav-item"><a class="nav-link js-scroll-trigger"><fai icon="long-arrow-alt-left" size="1x" /> Obchod</a></router-link>
      </ul>
    </div>
    <div>
      <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="../../assets/images/logofd.png" style="height: 60px" alt="LOGO FD" /></a>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      scrolled: false,
    }
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY >= 150;
    }
  },
  created: function() {
    window.addEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>

.icon_span {
  display: block;
  padding-top: 5px;
  font-weight: lighter;
}

</style>