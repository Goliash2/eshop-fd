<template>
  <div class="d-flex justify-content-around navbar navbar-expand-lg fixed-top" id="mainNav" :style="scrolled ? 'background-color:rgba(0,0,0,0.9); transition: 0.5s ease' : 'transition: 0.5s ease'">
    <div>
      <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="../../assets/images/logofd.png" style="height: 60px" alt="LOGO FD" /></a>
    </div>
    <div style="padding-top: 5px" v-if="resized">
      <ul class="navbar-nav text-uppercase">
        <router-link to="/man" class="nav-item"><a class="nav-link js-scroll-trigger" href="#man">MUŽI</a></router-link>
        <router-link to="/woman" class="nav-item"><a class="nav-link js-scroll-trigger" href="#woman">ŽENY</a></router-link>
        <router-link to="/products" class="nav-item"><a class="nav-link js-scroll-trigger" href="#">OSTATNÍ</a></router-link>
      </ul>
    </div>
    <div style="padding-top: 5px; text-align: center" v-if="resized">
      <ul class="navbar-nav">
        <router-link to="/cart" class="nav-item"><a class="nav-link js-scroll-trigger" href="#"><fai icon="shopping-cart" size="lg" /><span class="icon_span">Košík</span></a></router-link>
        <router-link to="/login" class="nav-item"><a class="nav-link js-scroll-trigger"><fai icon="user" size="lg" /><span class="icon_span">Přihlásit se</span></a></router-link>
      </ul>
    </div>
    <div @click="openMenu" style="padding-top: 5px" v-if="!resized">
      <div class="navbar-toggler navbar-toggler-right" :class="menuClass">
        <div class="menu-btn__burger"></div>
        <div class="navbar-nav" style="padding-right: 0">
          <router-link to="/cart" class="nav-item"><a class="nav-link js-scroll-trigger" href="#"><fai icon="shopping-cart" size="lg" /></a></router-link>
        </div>
      </div>
    </div>
  </div>
  <masthead></masthead>
</template>

<script>
import Masthead from "@/components/nav/Masthead";
  export default {
    data() {
      return {
        scrolled: false,
        resized: true,
        menuOpen: false,
        menuClass: 'menu-btn',
      }
    },
    components: {
      Masthead
    },
    methods: {
      openMenu() {
        if (this.menuOpen === false) {
          this.menuClass = "menu-btn open";
          this.showMenu();
        } else {
          this.menuClass = "menu-btn";
          this.hideMenu();
        }
      },
      showMenu() {
        setTimeout(() => {
          this.menuOpen = true
        },500);
      },
      hideMenu() {
        setTimeout(() => {
          this.menuOpen = false
        },500);
      },
      handleScroll() {
        this.scrolled = window.scrollY >= 100;
      },
      handleResize() {
        this.resized = window.outerWidth >= 991;
      }
    },
    created: function() {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('resize', this.handleResize);
      return this.handleResize();
    }
  }
</script>

<style scoped>

  .icon_span {
    display: block;
    padding-top: 5px;
    font-weight: lighter;
  }

  .menu-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    cursor: pointer;
    transition: all .5s ease-in-out;
    /* border: 3px solid #fff; */
  }
  .menu-btn__burger {
    width: 30px;
    height: 4px;
    background: #fff;
    border-radius: 5px;
    transition: all .5s ease-in-out;
  }
  .menu-btn__burger::before,
  .menu-btn__burger::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 4px;
    background: #fff;
    border-radius: 5px;
    transition: all .5s ease-in-out;
  }
  .menu-btn__burger::before {
    transform: translateY(-10px);
  }
  .menu-btn__burger::after {
    transform: translateY(10px);
  }
  /* ANIMATION */
  .menu-btn.open .menu-btn__burger {
    transform: translateX(-50px);
    background: transparent;
    box-shadow: none;
  }
  .menu-btn.open .menu-btn__burger::before {
    transform: rotate(45deg) translate(25px, -25px);
  }
  .menu-btn.open .menu-btn__burger::after {
    transform: rotate(-45deg) translate(25px, 25px);
  }
</style>