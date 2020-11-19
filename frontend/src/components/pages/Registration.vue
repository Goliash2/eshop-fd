<template>
  <div>
    <base-dialog :show="status === 201 && status !== null && this.isLoading === false" title="Registrace byla úspěšná!" @close="handleSuccess">
      <div class="text-center">
        <fai icon="check-circle" size="6x" style="color: green; padding-top: 15px" />
      </div>
    </base-dialog>
    <base-dialog :show="status !== 201 && status !== null || this.error === true && this.isLoading === false" title="Něco se nepovedlo" @close="handleError">
      <p>Při registraci došlo k potížím, zkuste to prosím později, nebo použijte jiné přihlašovací údaje.</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Ověřování ..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <Form class="form-signin" @submit="submitForm">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Registrace</h1>
      </div>

      <div class="form-label-group">
        <Field id="name" name="name" class="form-control" :class="validName" :rules="validateName" placeholder="Jméno" :value="name" />
        <label for="name">Jméno</label>
        <ErrorMessage name="name" />
      </div>

      <div class="form-label-group">
        <Field id="surname" name="surname" class="form-control" :class="validSurname" :rules="validateSurname" placeholder="Přijímení" :value="surname" />
        <label for="surname">Přijímení</label>
        <ErrorMessage name="surname" />
      </div>

      <div class="form-label-group">
        <Field id="email" name="email" class="form-control" :class="validEmail" :rules="validateEmail" placeholder="Email" :value="email" />
        <label for="email">Email</label>
        <ErrorMessage name="email" />
      </div>

      <div class="form-label-group">
        <Field id="password" type="password" name="password" class="form-control" :class="validPassword" :rules="validatePassword" placeholder="Heslo" :value="password" />
        <label for="password">Heslo</label>
        <ErrorMessage name="password" />
      </div>

      <div class="text-center" style="padding-bottom: 30px">
        <button @click="showMore = !showMore" class="btn btn-dark rounded-pill" type="button"><fai icon="plus-circle"></fai> Přidat dodací údaje</button>
      </div>

      <div v-if="showMore">
        <div class="form-label-group" data-aos="fade-right" data-aos-duration="500" data-aos-delay="300">
          <Field id="street" name="street" class="form-control" :class="validStreet" :rules="validateStreet" placeholder="Ulice" :value="street" />
          <label for="street">Ulice</label>
          <ErrorMessage name="street" />
        </div>

        <div class="form-label-group" data-aos="fade-right" data-aos-duration="500" data-aos-delay="600">
          <Field id="city" name="city" class="form-control" :class="validCity" :rules="validateCity" placeholder="Město" :value="city" />
          <label for="city">Město</label>
          <ErrorMessage name="city" />
        </div>

        <div class="form-label-group" data-aos="fade-right" data-aos-duration="500"  data-aos-delay="900">
          <Field id="zip" @keypress="onlyNumber" name="zip" class="form-control" :class="validZip" :rules="validateZip" placeholder="PSČ" :value="zip" />
          <label for="zip">PSČ</label>
          <ErrorMessage name="zip" />
        </div>
      </div>

      <div class="text-center mb-3">
        <label>
          <router-link to="/login">Přihlásit se</router-link>
        </label>
      </div>
      <button class="btn btn-lg btn-cvut btn-block rounded-pill" type="submit">Zaregistrovat se</button>
    </Form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import router from "@/router";
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
  name: "Registration",
  data() {
    return {
      email: '',
      password: '',
      name: '',
      surname: '',
      fullName: '',
      username: '',
      street: '',
      city: '',
      zip: '',
      validName: '',
      validSurname: '',
      validUsername: '',
      validEmail: '',
      validPassword: '',
      validStreet: '',
      validCity: '',
      validZip: '',
      isLoading: false,
      showMore: false
    }
  },
  methods: {
    async submitForm() {
      this.isLoading = true;
      this.formIsValid = true;
      this.fullName = this.name + ' ' + this.surname;
      await this.$store.dispatch('auth/register', {
        name: this.fullName,
        username: this.username,
        email: this.email,
        password: this.password
      });
      this.checkStatus();
    },
    checkStatus() {
      setTimeout(() => {
        if (this.error === false && this.status === null) {
          this.checkStatus()
        } else {
          this.isLoading = false
        }
      }, 500)
    },
    handleError() {
      this.$store.dispatch('auth/removeStatus')
      this.$store.dispatch('auth/removeError')
    },
    handleSuccess() {
      router.push('/login')
      this.$store.dispatch('auth/removeStatus')
      this.$store.dispatch('auth/removeError')
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
        this.validName = 'is-invalid'
        return 'This field is required';
      }
      this.validName = 'is-valid'
      this.name = value;
      return true;
    },
    validatePassword(value) {
      if (!value) {
        this.validPassword = 'is-invalid'
        return 'This field is required';
      }
      else if (value.length < 6) {
        this.validPassword = 'is-invalid'
        return 'Heslo musí obsahovat minimálně 6 znaků';
      }
      this.validPassword = 'is-valid'
      this.password = value;
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
    onlyNumber ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 43) { // 46 is dot
        $event.preventDefault();
      }
    },
  },
  computed: {
    ...mapGetters('auth', ['status', 'error'])
  },
  mounted() {
    const path = location.pathname;
    this.$store.dispatch('path/GET_PATH', path);
  },
  components: {
    Form,
    Field,
    ErrorMessage
  }
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}
.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}
.form-label-group input,
.form-label-group label {
  height: 3.125rem;
  padding: .75rem;
}
.form-label-group label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
}
.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}
.form-label-group input::-moz-placeholder {
  color: transparent;
}
.form-label-group input:-ms-input-placeholder {
  color: transparent;
}
.form-label-group input::-ms-input-placeholder {
  color: transparent;
}
.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:-ms-input-placeholder) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}
.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:-ms-input-placeholder) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
}
.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
}

span {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
  }
  .form-label-group label {
    position: static;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}
</style>