import axios from "axios"
export default {

  state: {
    properties: null,
    enableSort: true,
    clone: null,
    changeItem: false,
    domain: JSON.parse(localStorage.getItem('domain'))
  },
  mutations: {
    removeProperty(state, index) {
      let deleted = []
      if (isNaN(index)) {
        const updateArray = state.properties.filter(prop => {
          if (!prop.check) {
            return true
          } else {
            deleted.push(prop.id)
          }
        })
        console.info('Deleted properties', deleted)
        state.properties = updateArray
      } else {
        state.properties.splice(index, 1)
      }
    },
    cloneProperty (state, data) {
      let clone = {}
      for (let key in data.element) {
        clone[key] = data.element[key]
        clone.id = Date.now()
        clone.title = `${data.element.title} (Копия)`
      }
      state.clone = clone
      // state.properties.splice(data.index, 0 , clone)
      // setTimeout(() => {
      //   state.changeItem = true
      // },500)
    },
    clearClone(state) {
      state.clone = null
      state.changeItem = false
    },
    updateProperties (state, payload) {
      state.properties = payload
      console.log(state.properties)
    },
    addProperty(state, property) {
      state.properties.unshift(property)
    },
    async updateProperty(state, property) {
      const id = property.id
      const title = property.title
      const values = property.values
      const properties = state.properties.concat()
      const idx = properties.findIndex(p => p.id === id)
      const prop = properties[idx]

      properties[idx] = {...prop, title, values }
      state.properties = properties
    },
    sortProperties(state) {
      if (state.enableSort) {
        state.properties.sort((a, b) => a.title.localeCompare(b.title))
        state.enableSort = false
      } else {
        state.properties.sort((b, a) => a.title.localeCompare(b.title))
        state.enableSort = true
      }
    }
  },
  actions: {
    clearClone({commit}) {
      commit('clearClone')
    },
    sortProperties({commit}) {
      commit('sortProperties')
    },
    async updateProperty(context, property){
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      const values = property.values.map(val => {
        return val.title
      })
      try {
        await axios.put(`http://${domain}/api/v1/products/properties/${property.id}`,{
          id: property.id,
          title: property.title,
          values: values
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        context.commit('updateProperty', property)
      } catch (e) {
        console.log(e)
      }
    },
    cloneProperty({commit}, data){
      console.log(data)
      commit('cloneProperty', data)
    },

    async removeProperty(context, [removeArrayID, index]){
      const properties = removeArrayID
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      try {
        await axios.post(`http://${domain}/api/v1/products/properties/toArchive`, {
          properties: properties
        } , {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(index, 'Deleted successful')
        context.commit('removeProperty', index)
      } catch (e) {
        console.log(e)
      }
    },

    async fetchProperties(context) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      try {
        const { data: properties } = await axios.get(`http://${domain}/api/v1/products/properties`,  {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(properties.data)
        await context.commit("updateProperties", properties.data)
      } catch (e) {
        console.log(e)
      }
    },
    async updatePropertiesList( context, payload){
      context.commit("updateProperties", payload)
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      try {
        await axios.post(`http://${domain}/api/v1/products/properties/sortProperties`, {
          properties: payload
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async createProperty( context, property) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      const values = property.property_value.map(val => {
        return val.title
      })
      try {
        const { data: properties } = await axios.post(`http://${domain}/api/v1/products/properties`, {
          id: property.id,
          title: property.title,
          values: values
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(properties.data)
        await context.commit('addProperty', property)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    properties: s => s.properties,
    clone: s => s.clone,
    changeItem: s => s.changeItem
  }

}