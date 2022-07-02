import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faHandPointUp, faXmark,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faHandPointUp,faXmark,faMagnifyingGlass)



createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')

