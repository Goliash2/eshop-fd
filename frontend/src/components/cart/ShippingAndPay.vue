<template>
  <div class="container" style="padding-top: 50px">
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <small-cart></small-cart>
        <form class="p-2 text-center" id="button-lg-cont">
          <router-link :to="stage">
            <button class="btn btn-cvut rounded-pill" style="padding: 15px 40px;" type="submit" @click="next">Pokračovat</button>
          </router-link>
        </form>
      </div>
      <!--------------------------------------------------------------------------------------------------------------------------------->
      <div class="col-md-8 order-md-1">
        <form class="needs-validation" novalidate>
          <h4 class="mb-3">Způsob dopravy</h4>
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="custom-control custom-radio">
                <input id="ppl" name="shippingMethod" type="radio" class="custom-control-input" checked required>
                <label class="custom-control-label" for="ppl">PPL</label>
              </div>
              <span>ZDARMA</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="custom-control custom-radio">
                <input id="post" name="shippingMethod" type="radio" class="custom-control-input" required>
                <label class="custom-control-label" for="post">Česká pošta</label>
              </div>
              <span>ZDARMA</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="custom-control custom-radio">
                <input id="faculty" name="shippingMethod" type="radio" class="custom-control-input" required>
                <label class="custom-control-label" for="faculty">Zboží si vezvednu na fakultě</label>
              </div>
              <span>ZDARMA</span>
            </li>
          </ul>
          <br>
          <h4 class="mb-3">Způsob platby</h4>
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="custom-control custom-radio">
                <input id="card" name="paymentMethod" type="radio" class="custom-control-input" checked required>
                <label class="custom-control-label" for="card">Platba kartou</label>
              </div>
              <span>ZDARMA</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="custom-control custom-radio">
                <input id="cash" name="paymentMethod" type="radio" class="custom-control-input" required>
                <label class="custom-control-label" for="cash">Platba dobírkou</label>
              </div>
              <span>ZDARMA</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
              <div class="custom-control custom-radio">
                <input id="facultyCash" name="paymentMethod" type="radio" class="custom-control-input" required>
                <label class="custom-control-label" for="facultyCash">Hotově při převzetí na fakultě</label>
              </div>
              <span>ZDARMA</span>
            </li>
          </ul>
        </form>
        <div id="button-sm-cont">
          <br>
          <form class="p-2 text-center">
            <router-link :to="stage">
              <button class="btn btn-cvut rounded-pill" style="padding: 15px 40px;" type="submit" @click="next">Pokračovat</button>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallCart from "@/components/cart/SmallCart";
import {mapGetters} from "vuex";
export default {
name: "ShippingAndPay",
  methods: {
    next() {
      this.$store.commit('stages/SET_STAGE', '/cart/contact');
    }
  },
  components: {
    SmallCart
  },
  computed: {
    ...mapGetters('stages', ['stage']),
  }
}
</script>

<style scoped>
.container {
  max-width: 960px;
}

#button-sm-cont {
  display: none;
}
@media (max-width: 767px) {
  #button-lg-cont {
    display: none;
  }
  #button-sm-cont {
    display: block;
  }
}
</style>