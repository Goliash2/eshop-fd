<template>
  <div v-if="resized" class="d-flex justify-content-around navbar navbar-expand-lg" id="mainNav" style="background-color:rgba(0,0,0,0.9)">
    <div>
      <a class="navbar-brand js-scroll-trigger" href="#page-top"><img src="../../assets/images/logo_FD.png" style="height: 50px" alt="LOGO FD" /></a>
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
        <router-link :to="stage" class="nav-item"><a class="nav-link js-scroll-trigger" href="#"><span v-if="quantity !== 0" class="badge">{{ quantity }}</span><fai icon="shopping-cart" size="lg" /><span class="icon_span">Košík</span></a></router-link>
        <router-link v-if="!isAuthenticated" to="/login" class="nav-item"><a class="nav-link js-scroll-trigger"><fai icon="user" size="lg" /><span class="icon_span">Přihlásit se</span></a></router-link>
        <router-link v-if="isAuthenticated" to="/user" class="nav-item"><a class="nav-link js-scroll-trigger"><fai icon="user" size="lg" /><span class="icon_span">Můj účet</span></a></router-link>
      </ul>
    </div>
  </div>
  <div class="menu-wrap" v-if="!resized">
    <input type="checkbox" class="toggler" v-model="check" :checked="check">
    <div class="hamburger"><div></div></div>
    <div class="menu">
      <div>
        <div>
          <ul>
            <li><router-link @click="checked" to="/man">Muži</router-link></li>
            <li><router-link @click="checked" to="/woman">Ženy</router-link></li>
            <li><router-link @click="checked" to="/products">Ostatní</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="cart" data-aos="fade-left" data-aos-duration="500" v-if="!resized && check">
    <router-link :to="stage"><span v-if="quantity !== 0" class="badge2"><div style="margin-top: -2px">{{ quantity }}</div></span><fai icon="shopping-cart" size="lg" style="color: white" /></router-link>
  </div>
  <div class="profile" data-aos="fade-left" data-aos-duration="1000" v-if="!resized && check">
    <router-link to="/login"><fai icon="user" size="lg" style="color: white" /></router-link>
  </div>
  <!--<div v-if="!resized && check">
    <div class="eye" @click="hideMenu" v-if="showMenu" style="color: white; cursor: pointer">
      <fai icon="eye-slash" size="lg" />
    </div>
    <div class="eye" @click="hideMenu" v-if="!showMenu" style="opacity: 50%; color: white; cursor: pointer">
      <fai icon="ellipsis-v" size="lg" />
    </div>
  </div>-->
</template>

<script>

import {mapGetters} from "vuex";
export default {
  data() {
    return {
      scrolled: false,
      resized: true,
      check: false
    }
  },
  methods: {
    handleResize() {
      this.resized = window.outerWidth >= 991;
    },
    checked() {
      setTimeout(() => {
        this.check = false
      },100)
    }
  },
  created: function() {
    window.addEventListener('resize', this.handleResize);
    return this.handleResize();
  },
  computed: {
    ...mapGetters('cart', ['quantity']),
    ...mapGetters('user', ['isAuthenticated']),
    ...mapGetters('stages', ['stage'])
  }
}
</script>

<style scoped>
.eye {
  top: 180px;
  right: 0;
  width: 60px;
  height: 60px;
  background: #000000;
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*----------------------------------------------------------------------*/
.profile {
  top: 120px;
  right: 0;
  width: 60px;
  height: 60px;
  background: #002248;
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

/*------------------------------------------------------------------------*/
.cart {
  top: 60px;
  right: 0;
  width: 60px;
  height: 60px;
  background: #00468a;
  position: fixed;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
/*---------------------------------------------------------------------------*/
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

.badge2 {
  position: absolute;
  color: white;
  background-color: red;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  text-align: center;
  margin: 12px;
  align-items: center;
  justify-content: center;
  -webkit-box-align: center;-webkit-box-pack: center;
  transition: opacity 0.3s ease;
}

.icon_span {
  display: block;
  padding-top: 8px;
  font-weight: lighter;
}

/*-------------------------------------------------------------------------------------------------------*/

.menu-wrap {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
}

.menu-wrap .toggler {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: pointer;
  width: 50px;
  height: 50px;
  opacity: 0;
}

.menu-wrap .hamburger {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  width: 60px;
  background: #0065bd;
  height: 60px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hamburger Line */
.menu-wrap .hamburger > div {
  position: relative;
  flex: none;
  width: 100%;
  height: 2px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
}

/* Hamburger Lines - Top & Bottom */
.menu-wrap .hamburger > div::before,
.menu-wrap .hamburger > div::after {
  content: '';
  position: absolute;
  z-index: 1;
  top: -10px;
  width: 100%;
  height: 2px;
  background: inherit;
}

/* Moves Line Down */
.menu-wrap .hamburger > div::after {
  top: 10px;
}

/* Toggler Animation */
.menu-wrap .toggler:checked + .hamburger > div {
  transform: rotate(135deg);
}

/* Turns Lines Into X */
.menu-wrap .toggler:checked + .hamburger > div:before,
.menu-wrap .toggler:checked + .hamburger > div:after {
  top: 0;
  transform: rotate(90deg);
}

/* Rotate On Hover When Checked */
.menu-wrap .toggler:checked:hover + .hamburger > div {
  transform: rotate(225deg);
}

/* Show Menu */
.menu-wrap .toggler:checked ~ .menu {
  visibility: visible;
}

.menu-wrap .toggler:checked ~ .menu > div {
  transform: scale(1);
  transition-duration: 0.75s;
}

.menu-wrap .toggler:checked ~ .menu > div > div {
  opacity: 1;
  transition:  opacity 0.4s ease 0.4s;
}

.menu-wrap .menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-wrap .menu > div {
  background: rgba(31, 31, 31, 0.95);
  border-radius: 50%;
  width: 300vw;
  height: 300vw;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  transform: scale(0);
  transition: all 0.4s ease;
}

.menu-wrap .menu > div > div {
  text-align: center;
  max-width: 90vw;
  max-height: 100vh;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.menu-wrap .menu > div > div > ul > li {
  list-style: none;
  color: #fff;
  font-size: 1.5rem;
  padding: 1rem;
}

.menu-wrap .menu > div > div > ul > li > a {
  color: inherit;
  text-decoration: none;
  transition: color 0.4s ease;
}

</style>