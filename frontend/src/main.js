import { createApp } from 'vue'
import App from './App.vue'
import './style/css/bootstrap.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import mitt from 'mitt'
import store from './store/index'
import router from "@/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'


library.add(faUser);
library.add(faShoppingCart);
library.add(faLongArrowAltLeft);


const eventBus = mitt();
const app = createApp(App);

app.component('fai', FontAwesomeIcon)

app.use(AOS.init({disable: 'mobile'}));
app.use(store);
app.use(router);

app.config.globalProperties.eventBus = eventBus;

app.mount('#app')
