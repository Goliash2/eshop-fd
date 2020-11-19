<template>
  <div class="container">
    <div class="cart-header" @click="checkURL">
      <router-link v-if="stage === '/cart/content'" to="/cart/content" class="cart-item" style="color: #0065bd"><fai icon="shopping-cart" :size="size" /><span class="icon_span" style="font-weight: normal">Košík</span></router-link>
      <fai v-if="stage === '/cart/content'" icon="long-arrow-alt-right" :size="sizeArrow" style="color: #0065bd" />

      <router-link v-if="stage !== '/cart/content'" to="/cart/content" class="cart-item"><span v-if="stages.content" class="badge"><fai icon="check-circle" style="background-color: white; border-radius: 50%" :size="size" /></span><fai icon="shopping-cart" :size="size" /><span class="icon_span">Košík</span></router-link>
      <fai v-if="stage !== '/cart/content'" icon="long-arrow-alt-right" :size="sizeArrow" />
      <!------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------>
      <router-link v-if="stage === '/cart/shipping'" to="/cart/shipping" class="cart-item" style="color: #0065bd"><fai icon="truck" :size="size" /><span class="icon_span" style="font-weight: normal">Doprava a platba</span></router-link>
      <fai v-if="stage === '/cart/shipping'" icon="long-arrow-alt-right" :size="sizeArrow" style="color: #0065bd" />

      <router-link v-if="stage !== '/cart/shipping'" to="/cart/shipping" class="cart-item"><span v-if="stages.shipping" class="badge"><fai icon="check-circle" style="background-color: white; border-radius: 50%" :size="size" /></span><fai icon="truck" :size="size" /><span class="icon_span">Doprava a platba</span></router-link>
      <fai v-if="stage !== '/cart/shipping'" icon="long-arrow-alt-right" :size="sizeArrow" />
      <!------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------>
      <router-link v-if="stage === '/cart/contact'" to="/cart/contact" class="cart-item" style="color: #0065bd"><fai icon="user" :size="size" /><span class="icon_span" style="font-weight: normal">Kontaktní údaje</span></router-link>
      <fai v-if="stage === '/cart/contact'" icon="long-arrow-alt-right" :size="sizeArrow" style="color: #0065bd" />

      <router-link v-if="stage !== '/cart/contact'" to="/cart/contact" class="cart-item"><span v-if="stages.contact" class="badge"><fai icon="check-circle" style="background-color: white; border-radius: 50%" :size="size" /></span><fai icon="user" :size="size" /><span class="icon_span">Kontaktní údaje</span></router-link>
      <fai v-if="stage !== '/cart/contact'" icon="long-arrow-alt-right" :size="sizeArrow" />
      <!------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------>
      <router-link v-if="stage !== '/cart/purchased'" to="/cart/purchased" class="cart-item"><fai icon="clipboard-check" :size="size" /><span class="icon_span">Hotovo</span></router-link>
      <router-link v-if="stages.complete" to="/cart/purchased" class="cart-item"><fai icon="clipboard-check" :size="size" style="color: #1e7e34" /><span class="icon_span" style="font-weight: normal">Hotovo</span></router-link>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "CartStage",
  data() {
    return {
      size: 'lg',
      sizeArrow: 'xs'
    }
  },
  methods: {
    checkURL() {
      const stage = this.$route.path;
      this.$store.commit('stages/SET_STAGE', stage);
    }
  },
  computed: {
    ...mapGetters('stages', ['stage', 'stages']),
  }
}
</script>

<style scoped>
  .cart-header {
    display: flex;
    align-items: center;
    margin: 25px 0;
    justify-content: space-between;
  }

  .cart-item {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    color: #474747;
  }

  .icon_span {
    display: block;
    padding-top: 8px;
    font-weight: lighter;
    color: #474747;
  }

  .badge {
    position: absolute;
    margin: 12px;
    align-items: center;
    justify-content: center;
    -webkit-box-align: center;-webkit-box-pack: center;
    color: #1e7e34;
  }

  @media (max-width: 800px) {
    .icon_span {
      display: none;
    }
  }
</style>