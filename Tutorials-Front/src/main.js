import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import router from './router'
//import store from './store/index'


import { createStore } from 'vuex'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faHandPointUp, faXmark,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faHandPointUp,faXmark,faMagnifyingGlass)

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
  

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')

