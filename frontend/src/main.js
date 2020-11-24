import { createApp } from 'vue'
import App from './App.vue'

import './style/css/bootstrap.css'
import 'aos/dist/aos.css'
import 'swiper/swiper-bundle.css'

import store from './store/index'
import router from "@/router";
import AOS from 'aos'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '../src/FontAwesomeIcons';

import BaseDialog from "@/components/ui/BaseDialog";
import BaseButton from "@/components/ui/BaseButton";
import BaseSpinner from "@/components/ui/BaseSpinner";

const app = createApp(App);

app.component('fai', FontAwesomeIcon)

app.use(AOS.init({disable: 'mobile', once: true}));
app.use(store);
app.use(router);

app.component('base-button', BaseButton)
app.component('base-dialog', BaseDialog)
app.component('base-spinner', BaseSpinner)

app.mount('#app')
