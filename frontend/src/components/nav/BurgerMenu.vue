<template>
  <div class="menu-wrap">
    <input type="checkbox" class="toggler" v-model="check" :checked="check">
    <div class="hamburger"><div></div></div>
    <div class="menu">
      <div>
        <div>
          <ul>
            <li><router-link @click="checked" to="/man">MUŽI</router-link></li>
            <li><router-link @click="checked" to="/woman">ŽENY</router-link></li>
            <li><router-link @click="checked" to="/products">OSTATNÍ</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <transition name="cart">
    <div class="cart" v-if="check">
      <router-link :to="stage"><span v-if="quantity !== 0" class="badge2"><div style="margin-top: -2px">{{ quantity }}</div></span><fai icon="shopping-cart" size="lg" style="color: white" /></router-link>
    </div>
  </transition>
  <transition name="profile">
    <div class="profile" v-if="check">
      <router-link to="/login"><fai icon="user" size="lg" style="color: white" /></router-link>
    </div>
  </transition>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "BurgerMenu",
  data() {
    return {
      check: false
    }
  },
  methods: {
    checked() {
      setTimeout(() => {
        this.check = false
      },100)
    }
  },
  computed: {
    ...mapGetters('cart', ['quantity']),
    ...mapGetters('stages', ['stage'])
  },
}
</script>

<style scoped>
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

ul {
  padding-inline-start: 0;
}

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
  background: rgb(19, 19, 19);
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
  font-size: 2.5rem;
  padding: 1rem;
  font-weight: 100;
}

.menu-wrap .menu > div > div > ul > li > a {
  color: inherit;
  text-decoration: none;
  transition: color 0.4s ease;
}

.cart-enter-from {
  transform: translateX(100px);
}

.cart-enter-active {
  transition: all 0.5s ease-out;
}

.cart-enter-to {
  transform: translateX(0);
}

.cart-leave-to {
  transform: translateX(100px);
}

.cart-leave-active {
  transition: all 0.5s ease-in;
  transition-delay: 0.2s;
}

.cart-leave-from {
  transform: translateX(0);
}

.profile-enter-from {
  transform: translateX(100px);
}

.profile-enter-active {
  transition: all 0.5s ease-out;
  transition-delay: 0.2s;
}

.profile-enter-to {
  transform: translateX(0);
}

.profile-leave-to {
  transform: translateX(100px);
}

.profile-leave-active {
  transition: all 0.5s ease-in;
}

.profile-leave-from {
  transform: translateX(0);
}
</style>