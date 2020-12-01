<template>
  <div class="container" style="padding-top: 50px">
    <Form @submit="next">
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <small-cart></small-cart>
          <div class="p-2 text-center" id="button-lg-cont">
            <button class="btn btn-cvut rounded-pill" style="padding: 15px 40px;" type="submit">Dokončit</button>
          </div>
        </div>
        <!--------------------------------------------------------------------------------------------------------------------------------->
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Kontaktní údaje</h4>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label>Jméno</label>
              <Field name="name" as="input" :rules="validateName" class="form-control" :class="validFirstname" :value="firstname" disabled />
              <ErrorMessage name="name" />
            </div>
            <div class="col-md-6 mb-3">
              <label>Přijímení</label>
              <Field name="surname" as="input" :rules="validateSurname" class="form-control" :class="validSurname" :value="surname" disabled/>
              <ErrorMessage name="surname" />
            </div>
          </div>
          <div class="mb-3">
            <label>Email</label>
            <Field name="email" as="input" class="form-control" :class="validEmail" :rules="validateEmail" :value="email" disabled/>
            <ErrorMessage name="email" />
          </div>
          <div class="mb-3">
            <label>Ulice a číslo popisné</label>
            <Field name="street" as="input" :rules="validateStreet" class="form-control" :class="validStreet" />
            <ErrorMessage name="street" />
          </div>
          <div class="row">
            <div class="col-md-9 mb-3">
              <label>Město</label>
              <Field name="city" as="input" :rules="validateCity" class="form-control" :class="validCity" />
              <ErrorMessage name="city" />
            </div>
            <div class="col-md-3 mb-3">
              <label>PSČ</label>
              <Field name="zip" @keypress="onlyNumber" as="input" :rules="validateZip" class="form-control" :class="validZip" />
              <ErrorMessage name="zip" />
            </div>
          </div>
          <hr class="mb-4">
          <!--<div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" :class="!confirm ? 'is-invalid' : ''" id="save-info" v-model="confirm">
            <label class="custom-control-label" for="save-info">Souhlasím se zpracováním osobních údajů</label>
            <br>
            <span v-if="!confirm">Pro dokončení objednávky musíte souhlasit se zpracováním osobních údajů</span>
          </div>-->
          <Field name="confirmData" type="checkbox" value="confirm" :rules="validateConfirm" /> Souhlasím se zpracováním osobních údajů
            <ErrorMessage name="confirmData" />
          <div id="button-sm-cont">
            <br>
            <div class="p-2 text-center">
              <button class="btn btn-cvut rounded-pill" style="padding: 15px 40px;" type="submit">Dokončit</button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script>
import SmallCart from "@/components/cart/SmallCart";
import {mapGetters} from "vuex";
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
  name: "ContactInfo",
  data() {
    return {
      firstname: '',
      surname: '',
      email: '',
      street: '',
      city: '',
      zip: '',
      validFirstname: '',
      validSurname: '',
      validEmail: '',
      validStreet: '',
      validCity: '',
      validZip: ''
    }
  },
  methods: {
    next() {
      this.$store.commit('stages/SET_STAGE', '/cart/purchased');
      this.$router.push(this.stage)
    },
    setUserInfo() {
      const name =  this.userInfo.name
      const email =  this.userInfo.email
      const result = name.split(" ")
      this.firstname = result[0]
      this.surname = result[1]
      this.email = email
    },
    onlyNumber ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 43) { // 46 is dot
        $event.preventDefault();
      }
    },
    validateEmail(value) {
      if (!value) {
        this.validEmail = 'is-invalid'
        return 'This field is required';
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        this.validEmail = 'is-invalid'
        return 'This field must be a valid email';
      }
      this.validEmail = 'is-valid'
      this.email = value;
      return true;
    },
    validateSurname(value) {
      if (!value) {
        this.validSurname = 'is-invalid'
        return 'This field is required';
      }
      this.validSurname = 'is-valid'
      this.surname = value;
      return true;
    },
    validateName(value) {
      if (!value) {
        this.validFirstname = 'is-invalid'
        return 'This field is required';
      }
      this.validFirstname = 'is-valid'
      this.firstname = value;
      return true;
    },
    validateStreet(value) {
      if (!value) {
        this.validStreet = 'is-invalid'
        return 'This field is required';
      }
      this.validStreet = 'is-valid'
      this.street = value;
      return true;
    },
    validateCity(value) {
      if (!value) {
        this.validCity = 'is-invalid'
        return 'This field is required';
      }
      this.validCity = 'is-valid'
      this.city = value;
      return true;
    },
    validateZip(value) {
      if (!value) {
        this.validZip = 'is-invalid'
        return 'This field is required';
      }
      else if (value.length > 5) {
        this.validZip = 'is-invalid'
        return  'Zadejte max.5 číslic'
      }
      else if (value.length < 5) {
        this.validZip = 'is-invalid'
        return  'Zadejte min.5 číslic'
      }
      this.validZip = 'is-valid'
      this.zip = value;
      return true;
    },
    validateConfirm(value) {
      if (value && value.length) {
        return true;
      }
      return 'Pro dokončení objednávky musíte souhlasit se zpracováním osobních údajů';
    }
  },
  components: {
    SmallCart,
    Form,
    Field,
    ErrorMessage
  },
  computed: {
    ...mapGetters('stages', ['stage']),
    ...mapGetters('user', ['userInfo', 'user'])
  },
  created() {
    if (this.user.length !== 0) {
      this.setUserInfo()
    }
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

span {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
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