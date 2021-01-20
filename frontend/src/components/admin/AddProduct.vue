<template>
  <div class="settings">
    <h5><b>Vytváření nového produktu</b></h5>
    <hr>
    <br>
    <form @submit.prevent="addProductToDatabase"></form>
    <input class="form-control product-info-input" placeholder="Název produktu" type="text" v-model="name">
    <br>
    <textarea class="form-control product-info-input" placeholder="Popis produktu" rows="3" v-model="description"></textarea>
    <br>
    <input type="number" class="form-control product-info-input" placeholder="Cena v Kč" v-model.number="price">
    <br>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Přidat kategorii (oblečení, mikiny ..)" v-model="category" @keypress.enter="addProductCategory">
      <div class="input-group-append">
        <button @click="addProductCategory" class="btn btn-cvut">Přidat kategorii</button>
      </div>
    </div>
    <div style="display: inline-block" v-for="(tag, index) in categories" :key="index">
      <span @click="removeTag(index)" class="badge badge-pill badge-primary"><fai icon="times-circle" size="1x" /> {{ tag }}</span>
    </div>
    <br>
    <div class="input-group">
      <select class="form-control" v-model="size.name">
        <option v-for="size in sizeNames" :key="size">Velikost: {{ size }}</option>
      </select>
      <input @keypress.enter="addProductSize(this.size.name, this.size.stock)" class="form-control" placeholder="množství" type="number" v-model.number="size.stock">
      <div class="input-group-append">
        <button class="btn btn-cvut" @click="addProductSize(this.size.name, this.size.stock)">Přidat velikost</button>
      </div>
    </div>
    <div style="display: inline-block" v-for="(size, index) in sizes" :key="index">
      <span @click="removeSize(index)" class="badge badge-pill badge-primary"><fai icon="times-circle" size="1x" /> Vel: {{ size.name }} Počet: {{ size.stock }}</span>
    </div>
    <br>
    <!--odkaz fotky
    <input type="text" v-model="picture">
    <button @click="addProductPicture">Přidat fotku</button>
    {{ pictures }}-->
   <!-- <input type="file" @change="addFile">
    <button @click="encodeImage">Encode Photo</button>
    {{ pictures }}
    <br>-->
    <input class="form-control product-info-input" placeholder="Barva produktu" type="text" v-model="color">
    <br>
    <input type="text" class="form-control product-info-input" placeholder="Manufaktura" v-model="manufacturer">
    <br>
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" value="M" v-model="sex">
      <label class="custom-control-label" for="customRadioInline1">Muži</label>
    </div>
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" value="F" v-model="sex">
      <label class="custom-control-label" for="customRadioInline2">Ženy</label>
    </div>
    <div class="custom-control custom-radio custom-control-inline">
      <input type="radio" id="customRadioInline3" name="customRadioInline1" class="custom-control-input" value="O" v-model="sex">
      <label class="custom-control-label" for="customRadioInline3">Ostatní</label>
    </div>
    <br>
    <br>
    <button class="btn btn-cvut" @click="addProductToDatabase">Vytvořit produkt</button>
    <hr>
    <!------------------------------------------------------------------------------------------------>
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
        name: 'Velikost: S',
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
      manufacturer: '',
      selectedFile: null,
      test: null
    }
  },
  methods: {
    removeTag(index) {
      this.categories.splice(index, 1)
    },
    addProductCategory() {
      this.categories.push(this.category)
      this.category = ''
    },
    removeSize(index) {
      this.sizes.splice(index, 1)
    },
    addProductSize(name, stock) {
      const velikost = name.split(' ')
      this.sizes.push({
        name: velikost[1],
        stock: stock
      })
    },
   /* addProductPicture() {
      this.pictures.push(this.picture)
    },*/
    addFile(event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
    },
    encodeImage() {
      const picture = this.selectedFile;
      const reader = new FileReader();
      reader.onloadend = (event) => {
        this.pictures.push(event.target.result)
        console.log(event)
      }
      reader.readAsDataURL(picture);
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
        listed: Date.now(),
        price: this.price,
        manufacturer: this.manufacturer
      }
      this.$store.dispatch('admin/addProductToDatabase', {
        product: newProduct,
        token: this.token
      })
    }
  },
  computed: {
    ...mapGetters('user', ['token'])
  },
}
</script>

<style scoped>
.product-info-input {
  width: 50%;
}
.input-group {
  width: 50%;
}
.settings {
  margin-top: 10px;
}
.badge-primary {
  cursor: pointer;
  font-size: 15px;
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
}
.badge-primary:hover {
  background-color: #0065bd;
}
@media (max-width: 991px) {
  .product-info-input {
    width: 100%;
  }
  .input-group {
    width: 100%;
  }
}
</style>