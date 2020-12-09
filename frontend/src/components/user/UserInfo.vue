<template>
  <div class="settings">
    <base-dialog :show="status === 200 && status !== null && this.isLoading === false" title="Profil uživatele byl aktualizován" @close="handleError">
      <div class="text-center">
        <fai icon="check-circle" size="6x" style="color: green; padding-top: 15px" />
      </div>
    </base-dialog>
    <base-dialog :show="status !== 200 && status !== null || this.error === true && this.isLoading === false || this.checkStatusLimit >= 30" title="Něco se nepovedlo" @close="handleError">
      <p>Profil uživatele nemohl být aktualizován, zkuste to prosím později.</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Aktualizace profilu ..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <h5><b>Nastavení účtu</b></h5>
    <hr>
    <br>
    <h5><b>Osobní údaje</b></h5>
    <form class="form-signin" @submit.prevent="updateUserInfo">
      <div class="form-label-group">
        <input type="text" id="name" class="form-control" placeholder="Jméno" v-model="name" disabled>
        <label for="name">Jméno</label>
      </div>
      <div class="form-label-group">
        <input type="text" id="surname" class="form-control" placeholder="Přijímení" v-model="surname" disabled>
        <label for="surname">Přijímení</label>
      </div>
      <div class="form-label-group">
        <input type="email" id="email" class="form-control" placeholder="Email" v-model="email" disabled>
        <label for="email">Email</label>
      </div>
      <div class="form-label-group">
        <input type="tel" id="phone" class="form-control" placeholder="Telefon" v-model="phone">
        <label for="phone">Telefon</label>
      </div>
      <br>
      <h5><b>Dodací a fakturační údaje</b></h5>
      <div class="form-label-group" style="margin-top: 20px">
        <input type="text" id="street" class="form-control" placeholder="Ulice" v-model="address.streetAndHouseNumber">
        <label for="street">Ulice</label>
      </div>
      <div class="form-label-group">
        <input type="text" id="city" class="form-control" placeholder="Město" v-model="address.town">
        <label for="city">Město</label>
      </div>
      <div class="form-label-group">
        <input type="text" id="zip" class="form-control" placeholder="PSČ" v-model="address.postCode">
        <label for="zip">PSČ</label>
      </div>
      <br>
      <button class="btn btn-lg btn-cvut btn-block rounded-pill" type="submit">Uložit změny</button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "userInfo",
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: {
        streetAndHouseNumber: '',
        town: '',
        postCode: null
      },
      isLoading: false,
      checkStatusLimit: 0
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo', 'token', 'status', 'error'])
  },
  methods: {
    async updateUserInfo() {
      this.isLoading = true;
      await this.$store.dispatch('user/updateUser', {
        address: this.address,
        phone: this.phone,
        token: this.token,
        userId: this.userInfo.id
      });
      this.checkStatus();
    },
    getNewUserInfo() {
      const userName = this.userInfo.name.split(' ')
      const name = userName[0]
      const surname = userName[1]
      const address = this.userInfo.address[0]
      const phone = this.userInfo.phone
      this.name = name
      this.surname = surname
      this.email = this.userInfo.email
      this.address = address
      this.phone = phone
    },
    checkStatus() {
      setTimeout(() => {
        if (this.error === false && this.status === null && this.checkStatusLimit <= 30) {
          this.checkStatusLimit++;
          this.checkStatus()
        } else if (this.status === 200) {
          this.isLoading = false
        } else {
          this.isLoading = false
        }
      }, 500)
    },
    handleError() {
      this.checkStatusLimit = 0
      this.$store.commit('user/removeStatus')
      this.$store.commit('user/removeError')
    }
  },
  mounted() {
    const path = location.pathname;
    this.$store.commit('path/SET_PATH', path);
    this.getNewUserInfo();
  }
}
</script>

<style scoped>
  .settings {
    margin-top: 10px;
  }
  .form-signin {
    width: 100%;
    max-width: 420px;
    margin-top: 20px;
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