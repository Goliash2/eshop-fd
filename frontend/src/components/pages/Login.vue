<template>
  <div>
    <base-dialog :show="status !== 201 && status !== null || this.error === true && this.isLoading === false || this.checkStatusLimit >= 30" title="Něco se nepovedlo" @close="handleError">
      <p>Při přihlašování došlo k potížím, zkuste to prosím později, nebo použijte jiné přihlašovací údaje.</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Ověřování ..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <form class="form-signin" @submit.prevent="submitForm">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Přihlášení</h1>
      </div>

      <div class="form-label-group">
        <input type="email" id="email" class="form-control" placeholder="Emailová adresa" v-model="email" required autofocus>
        <label for="email">Emailová adresa</label>
      </div>
      <p class="text-center alert-danger" style="border-radius: 1px" v-if="!formIsValid">Prosím zadejte platnou emailovou adresu a heslo.</p>
      <div class="form-label-group">
        <input type="password" id="password" class="form-control" placeholder="Heslo" v-model="password" required>
        <label for="password">Heslo</label>
      </div>
      <div class="text-center mb-3">
        <label>
          <router-link to="/register">Zaregistrovat se</router-link>
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block rounded-pill" type="submit">Přihlásit se</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; ČVUT v Praze 2020</p>
    </form>
  </div>
</template>

<script>
import router from "@/router";
import {mapGetters} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      isLoading: false,
      checkStatusLimit: 0
    }
  },
  methods: {
    async submitForm() {
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6 ) {
        this.formIsValid = false;
      } else {
        this.isLoading = true;
        this.formIsValid = true;
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        });
        this.checkStatus();
      }
    },
    checkStatus() {
      setTimeout(() => {
        if (this.error === false && this.status === null && this.checkStatusLimit <= 30) {
          this.checkStatusLimit++;
          this.checkStatus()
        } else if (this.status === 201) {
          router.push('/products')
          this.isLoading = false
          this.$store.dispatch('auth/removeStatus')
          this.$store.dispatch('auth/removeError')
        } else {
          this.isLoading = false
        }
      }, 500)
    },
    handleError() {
      this.checkStatusLimit = 0
      this.$store.dispatch('auth/removeStatus')
      this.$store.dispatch('auth/removeError')
    }
  },
  computed: {
    ...mapGetters('auth', ['status', 'error'])
  },
  mounted() {
    const path = location.pathname;
    this.$store.dispatch('path/GET_PATH', path);
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

.form-label-group input:not(:-moz-placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:-ms-input-placeholder) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;
  padding-bottom: .25rem;
}

.form-label-group input:not(:-moz-placeholder-shown) ~ label {
  padding-top: .25rem;
  padding-bottom: .25rem;
  font-size: 12px;
  color: #777;
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