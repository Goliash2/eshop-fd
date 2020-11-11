<template>
  <div class="container" style="padding-top: 50px">
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <small-cart></small-cart>
        <form class="p-2 text-center" id="button-lg-cont">
          <router-link :to="stage">
            <button class="btn btn-cvut rounded-pill" style="padding: 15px 40px;" type="submit" @click="next">Dokončit</button>
          </router-link>
        </form>
      </div>
      <!--------------------------------------------------------------------------------------------------------------------------------->
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Kontaktní údaje</h4>
        <form class="needs-validation" novalidate>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">Jméno</label>
              <input type="text" class="form-control" id="firstName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Přijímení</label>
              <input type="text" class="form-control" id="lastName" placeholder="" value="" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="you@example.com">
            <div class="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div class="mb-3">
            <label for="address">Ulice a číslo popisné</label>
            <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
            <div class="invalid-feedback">
              Please enter your shipping address.
            </div>
          </div>

          <div class="row">
            <div class="col-md-9 mb-3">
              <label for="city">Město</label>
              <input type="text" class="form-control" id="city" placeholder="" required>
              <div class="invalid-feedback">
                Město je požadováno
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="zip">PSČ</label>
              <input type="text" class="form-control" id="zip" placeholder="" required>
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>
          </div>
          <hr class="mb-4">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="save-info">
            <label class="custom-control-label" for="save-info">Souhlasím se zpracováním osobních údajů</label>
          </div>
        </form>
        <div id="button-sm-cont">
          <br>
          <form class="p-2 text-center">
            <router-link :to="stage">
              <button class="btn btn-cvut rounded-pill" style="padding: 15px 40px;" type="submit" @click="next">Dokončit</button>
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
  name: "ContactInfo",
  methods: {
    next() {
      this.$store.dispatch('stages/GET_STAGE', '/cart/purchased');
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