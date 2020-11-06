import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import VueAnime from 'vue-animejs'
import {i18n} from "@/plugins/i18n"
import draggable from "vuedraggable"
import simplebar from 'simplebar-vue'
import VueContext from 'vue-context'
import VuetifyDraggableTreeview from 'vuetify-draggable-treeview'
import {DraggableTree} from 'vue-draggable-nested-tree'
import GSignInButton from 'vue-google-signin-button'


import 'simplebar-vue/dist/simplebar.min.css'
import 'vue-context/src/sass/vue-context.scss'


Vue.component('draggable', draggable)
Vue.component('DraggableTree', DraggableTree)
Vue.component('simplebar', simplebar)
Vue.component('VueContext', VueContext)

export const eventBus = new Vue()
Vue.use(VuetifyDraggableTreeview)
Vue.use(VueAnime)
Vue.use(Vuelidate)
Vue.use(GSignInButton)
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
