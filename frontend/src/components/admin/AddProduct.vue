<template>
  <div class="settings">
    <h5><b>Vytváření nového produktu</b></h5>
    <hr>
    <br>
    <form @submit.prevent="addProductToDatabase"></form>
    kategorie
    <input type="text" v-model="category">
    <button @click="addProductCategory">Přidat kategorii</button>
    {{ categories }}
    <br>
    velikost
    <select v-model="size.name">
      <option v-for="size in sizeNames" :key="size">{{ size }}</option>
    </select>
    množství
    <input type="number" v-model.number="size.stock">
    <button @click="addProductSize(this.size.name, this.size.stock)">Přidat velikost a množství</button>
    {{ sizes }}
    <br>
    odkaz fotky
    <input type="text" v-model="picture">
    <button @click="addProductPicture">Přidat fotku</button>
    {{ pictures }}
    <br>
    barva produktu
    <input type="text" v-model="color">
    {{ color }}
    <br>
    jméno produktu
    <input type="text" v-model="name">
    {{ name }}
    <br>
    popis produktu
    <input type="text" v-model="description">
    {{ description }}
    <br>
    pohlaví (M = muž, F = žena)
    <select v-model="sex">
      <option v-for="type in sexTypes" :key="type">{{ type }}</option>
    </select>
    {{ sex }}
    <br>
    cena produktu
    <input type="text" v-model.number="price">
    {{ price }}
    <br>
    manufaktura
    <input type="text" v-model="manufacturer">
    {{ manufacturer }}
    <br>
    <button class="btn btn-cvut" @click="addProductToDatabase">Vytvořit produkt</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "AddProduct",
  data() {
    return {
      categories: [],
      category: '',
      sizes: [],
      sizeNames: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      size: {
        name: 'S',
        stock: null
      },
      pictures: [],
      picture: '',
      color: '',
      name: '',
      description: '',
      sex: 'M',
      sexTypes: ['M', 'F'],
      price: null,
      manufacturer: ''
    }
  },
  methods: {
    addProductCategory() {
      this.categories.push(this.category)
    },
    addProductSize(name, stock) {
      this.sizes.push({
        name: name,
        stock: stock
      })
    },
    addProductPicture() {
      this.pictures.push(this.picture)
    },
    addProductToDatabase() {
      const newProduct = {
        categories: this.categories,
        size: this.sizes,
        pictures: this.pictures,
        color: this.color,
        name: this.name,
        description: this.description,
        sex: this.sex,
        price: this.price,
        manufacturer: this.manufacturer
      }
      this.$store.dispatch('admin/addProductToDatabase', {
        product: newProduct,
        token: this.token
      })
    },
  },
  computed: {
    ...mapGetters('user', ['token'])
  },
}
</script>

<style scoped>
.settings {
  margin-top: 10px;
}
</style>