<template>
  <div class="d-flex justify-content-around navbar navbar-expand-lg" id="mainNav" style="background-color:rgba(0,0,0,0.9)">
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
        <router-link to="/cart" class="nav-item"><a class="nav-link js-scroll-trigger" href="#"><span v-if="quantity !== 0" class="badge">{{ quantity }}</span><fai icon="shopping-cart" size="lg" /><span class="icon_span">Košík</span></a></router-link>
        <router-link to="/login" class="nav-item"><a class="nav-link js-scroll-trigger"><fai icon="user" size="lg" /><span class="icon_span">Přihlásit se</span></a></router-link>
      </ul>
    </div>
    <div @click="openMenu" style="padding-top: 5px" v-if="!resized">
      <div class="navbar-toggler navbar-toggler-right" :class="menuClass">
        <div class="menu-btn__burger"></div>
        <div class="navbar-nav" style="padding-right: 0">
          <router-link to="/cart" class="nav-item"><a class="nav-link js-scroll-trigger" href="#"><span v-if="quantity !== 0" class="badge">{{ quantity }}</span><fai icon="shopping-cart" size="lg" /></a></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
export default {
  data() {
    return {
      scrolled: false,
      resized: true,
      menuOpen: false,
      menuClass: 'menu-btn',
    }
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
    handleResize() {
      this.resized = window.outerWidth >= 991;
    }
  },
  created: function() {
    window.addEventListener('resize', this.handleResize);
    return this.handleResize();
  },
  computed: {
    ...mapGetters('cart', ['quantity'])
  },
}
</script>

<style scoped>

.badge {
  position: absolute;
  color: white;
  background-color: #0065bd;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  text-align: center;
  margin: 12px;
  align-items: center;
  font-weight: 100;
  justify-content: center;
  -webkit-box-align: center;-webkit-box-pack: center;
  transition: opacity 0.3s ease;
}

.icon_span {
  display: block;
  padding-top: 8px;
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