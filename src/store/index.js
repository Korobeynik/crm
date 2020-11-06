import Vue from 'vue'
import Vuex from 'vuex'
import nav from './modules/nav'
import auth from './modules/auth'
import properties from "@/store/modules/products/properties"
import characteristics from "@/store/modules/products/characteristics"
import categories from "@/store/modules/products/categories"
import alert from "@/store/modules/ui/alert"
import dialog from "@/store/modules/ui/dialog"

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    nav,
    auth,
    properties,
    characteristics,
    categories,
    alert,
    dialog
  },
})
