import { createApp } from 'vue'
import App from './App.vue'
import Bootstrap from './style/css/bootstrap.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import mitt from 'mitt'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import FontAwesomeIcon from './lib/FontAwesomeIcon'

library.add(fas)

const eventBus = mitt();
const app = createApp(App);

app.component('fa', FontAwesomeIcon);

app.use(Bootstrap);
app.use(AOS.init({disable: 'mobile'}));
app.config.globalProperties.eventBus = eventBus;


app.mount('#app')
