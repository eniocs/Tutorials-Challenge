import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueSmoothScroll from 'vue3-smooth-scroll'
import { createStore } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'/* import the fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' /* import font awesome icon component */
import { faHandPointUp, faXmark,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons' /* import specific icons */
library.add(faHandPointUp,faXmark,faMagnifyingGlass) /* add icons to the library */


//Local
import router from './router'
//import store from './store/index'



// Create a new store instance.
const store = createStore({
    state : {
      
        isLoading: false
      
    },
    mutations: {
        DoLoading (state) {
            state.isLoading =true
          },
        NotLoading (state) {
            state.isLoading =false
        }
    },
    actions: {
        DoLoadingM (context) {
          context.commit('DoLoading')
        },
        NotLoadingM (context) {
            context.commit('NotLoading')
          },
        
      }
  })
  


const app =  createApp(App);

app.use(VueSmoothScroll, {
  duration: 700,
  offset: 0,
  updateHistory: false,
  easingFunction: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
}) ;
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')

