import { createApp } from 'vue'
import App from './App.vue'
import './style/css/bootstrap.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'swiper/swiper-bundle.css'
import mitt from 'mitt'
import store from './store/index'
import router from "@/router";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import BaseDialog from "@/components/ui/BaseDialog";
import BaseButton from "@/components/ui/BaseButton";
import BaseSpinner from "@/components/ui/BaseSpinner";

library.add(faUser);
library.add(faShoppingCart);
library.add(faLongArrowAltLeft);
library.add(faLongArrowAltRight);
library.add(faCheckCircle);
library.add(faEyeSlash);
library.add(faEye);
library.add(faEllipsisV);
library.add(faTruck);
library.add(faClipboardCheck);
library.add(faTimesCircle);
library.add(faShoppingBasket);
library.add(faPlusCircle);


const eventBus = mitt();
const app = createApp(App);

app.component('fai', FontAwesomeIcon)

app.use(AOS.init({disable: 'mobile', once: true}));
app.use(store);
app.use(router);

app.component('base-button', BaseButton)
app.component('base-dialog', BaseDialog)
app.component('base-spinner', BaseSpinner)

app.config.globalProperties.eventBus = eventBus;

app.mount('#app')
