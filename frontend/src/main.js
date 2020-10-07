import { createApp } from 'vue'
import App from './App.vue'
import './style/css/bootstrap.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import mitt from 'mitt'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import FontAwesomeIcon from './lib/FontAwesomeIcon'
import store from './store/index'


library.add(fas)

const eventBus = mitt();
const app = createApp(App);

app.component('fa', FontAwesomeIcon);

app.use(AOS.init({disable: 'mobile'}));
app.use(store);

app.config.globalProperties.eventBus = eventBus;

app.mount('#app')
