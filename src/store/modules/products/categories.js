import axios from "axios";

export default {
  state: {
    categories: null,
    category: null,
    editCategory: null,
    dataCreate: null,
    dataEdit: null,
    IDCreatedCategory: null
  },
  mutations: {
    updateCategories: (state, payload) => {
      state.categories = payload
    },
    setCategory: (state, payload) => {
      state.category = payload
    },
    setEditCategory: (state, payload) => {
      state.editCategory = payload
    },
    setDataCreate(state, payload) {
      state.dataCreate = payload
    },
    setDataEdit(state, payload) {
      state.dataEdit = payload
    },
    clearDataEdit(state) {
      state.dataEdit = null
    },
    setIDCreatedCategory(state, payload) {
      state.IDCreatedCategory = payload
    },
    addCategory(state, category) {
      state.categories.unshift(category)
    },
  },
  actions: {

    /* Edit characteristics */
    async editCharacteristic(context, element) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      let url
      if (element.id == 1) {
        url = 'editColorCharacteristics'
      } else if (element.id == 2) {
        url = 'editSizeCharacteristics'
      } else {
        url = `${element.id}/edit`
      }
      try {
        const { data: data } = await axios.get(`http://${domain}/api/v1/products/characteristics/${url}`,  {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(data.data)
        await context.commit("setDataEdit", data.data)
      } catch (e) {
        console.log(e)
      }
    },

    /* Edit property */
    async editProperty(context, element) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      try {
        const { data: data } = await axios.get(`http://${domain}/api/v1/products/properties/${element.id}/edit`,  {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(data.data)
        await context.commit("setDataEdit", data.data)
      } catch (e) {
        console.log(e)
      }
    },

    clearDataEdit(context) {
      context.commit("clearDataEdit")
    },

    updateCategories: ({ commit }, payload) => {
      commit("updateCategories", payload);
    },
    async fetchCategories(context) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain

      try {
        const { data: data } = await axios.get(`http://${domain}/api/v1/products/categories`,  {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(data.data)
        await context.commit("updateCategories", data.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchEditCategory(context, id) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain

      try {
        const { data: data } = await axios.get(`http://${domain}/api/v1/products/categories/${id}/edit`,  {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        context.commit("setEditCategory", data.data)
        console.log(data.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchCategory(context, id) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain

      try {
        const { data: data } = await axios.get(`http://${domain}/api/v1/products/categories/${id}`,  {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        context.commit("setCategory", data.data)
        console.log(data.data)
      } catch (e) {
        console.log(e)
      }
    },
    async fetchDataCreate(context) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      try {
        const { data: data } = await axios.get(`http://${domain}/api/v1/products/categories/create`,  {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        context.commit("setDataCreate", data.data)
        console.log(data.data)
      } catch (e) {
        console.log(e)
      }
    },
    async updateCategory(context, category) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain

      try {
        await axios.put(`http://${domain}/api/v1/products/categories/${category.id}`, {
          title: category.title,
          desc: category.desc,
          image: category.image,
          id: category.id,
          properties: category.properties,
          characteristics: category.characteristics,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        await context.dispatch('fetchCategories')
        await context.commit('setIDCreatedCategory', category.id)
      } catch (e) {
        console.log(e)
      }
    },
    async addNewCategory(context, data) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain

      try {
        const { data: items } = await axios.post(`http://${domain}/api/v1/products/categories`, {
          title: data.title,
          desc: data.desc,
          image: data.image,
          id: data.id,
          parent_id: data.parent_id,
          characteristics: data.characteristics,
          properties: data.properties,
          categories: data.categories
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(items.data)
        //await context.commit('addCategory', items.data )
        await context.dispatch('fetchCategories')
        await context.commit('setIDCreatedCategory', items.data.id)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    categories: s => s.categories,
    category: s => s.category,
    editCategory: s => s.editCategory,
    dataCreate: s => s.dataCreate,
    dataEdit: s => s.dataEdit,
    IDCreatedCategory: s => s.IDCreatedCategory,
    categoryById: s => id => s.categories.find(t => t.id === id)
  }

}