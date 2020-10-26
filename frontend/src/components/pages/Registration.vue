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
    <form class="form-signin" @submit.prevent="submitForm">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Registrace</h1>
      </div>

      <div class="form-label-group">
        <input id="name" class="form-control" placeholder="Jméno" v-model="name" required>
        <label for="name">Jméno</label>
      </div>

      <div class="form-label-group">
        <input id="surname" class="form-control" placeholder="Přijímení" v-model="surname" required>
        <label for="surname">Přijímení</label>
      </div>

      <div class="form-label-group">
        <input id="username" class="form-control" placeholder="Username" v-model="username" required>
        <label for="username">Username</label>
      </div>

      <div class="form-label-group">
        <input type="email" id="email" class="form-control" placeholder="Emailová adresa" v-model="email" required autofocus>
        <label for="email">Emailová adresa</label>
      </div>

      <div class="form-label-group">
        <input type="password" id="password" class="form-control" placeholder="Heslo" v-model="password" required>
        <label for="password">Heslo</label>
      </div>
      <div class="text-center mb-3">
        <label>
          <router-link to="/login">Přihlásit se</router-link>
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block rounded-pill" type="submit">Zaregistrovat se</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; ČVUT v Praze 2020</p>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import router from "@/router";
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
      formIsValid: true,
      isLoading: false,
    }
  },
  methods: {
    async submitForm() {
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6 ) {
        this.formIsValid = false;
      }
      else {
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
      }
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