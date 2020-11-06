import axios from "axios"

export default {
  state: {
    characteristics: null,
    enableSort: true,
    cloneCharacteristic: null,
    changeCharacteristic: false,
    selectedSizes: null,
    colorData: null,
    sizeData: null
  },
  mutations: {
    setSizeData(state, content) {
      state.sizeData = content
    },
    setSelectedSizes(state, content) {
      console.log(content)
      state.selectedSizes = content
    },
    setColorData(state, content) {
      state.colorData = content
    },
    removeItem(state, index) {
      if (isNaN(index)) {
        const updateArray = state.characteristics.filter(prop => {
          if (!prop.check) {
            return true
          }
        })
        state.characteristics = updateArray
      } else {
        state.characteristics.splice(index, 1)
      }
    },
    cloneItem(state, data) {
      let clone = {}
      for (let key in data.element) {
        clone[key] = data.element[key]
        clone.id = Date.now()
        clone.title = `${data.element.title} (Копия)`
      }
      state.cloneCharacteristic = clone
      // state.characteristics.splice(data.index, 0, clone)
      // setTimeout(() => {
      //   state.changeCharacteristic = true
      // }, 500)
    },
    clearClone(state) {
      state.cloneCharacteristic = null
      state.changeCharacteristic = false
    },
    updateList(state, payload) {
      state.characteristics = payload
      state.colorData = payload[0]
      state.sizeData = payload[1]
      console.log(state.characteristics)
    },
    addItem(state, item) {
      state.characteristics.unshift(item)
    },
    async updateItem(state, item) {
      const id = item.id
      const title = item.title
      const values = item.values
      const characteristics = state.characteristics.concat()

      const idx = characteristics.findIndex(p => p.id === id)
      const prop = characteristics[idx]

      characteristics[idx] = {...prop, title, values }

      state.characteristics = characteristics

      //localStorage.setItem('characteristics', JSON.stringify(state.characteristics))
    },
    updateChip(state, item) {
      console.log(item)
      const code = item.code
      const id = item.id
      const name = item.name
      const selectValue = item.selectValue
      const values = state.colorData.characteristic_color_value.concat()

      const idx = values.findIndex(p => p.id === id)
      const prop = values[idx]

      values[idx] = {...prop, code, name, selectValue }

      state.colorData.characteristic_color_value = values
    },
    editSize(state, item) {
      console.log(item)
      const id = item.id
      const title = item.title
      const values = state.selectedSizes.concat()

      const idx = values.findIndex(p => p.id === id)
      const prop = values[idx]

      values[idx] = {...prop, title}

      state.selectedSizes = values
    },
    deleteChip(state, item) {
      state.colorData.characteristic_color_value.splice(item, 1)
      console.log(item)
      console.log('delete')
    },
    sortList(state) {
      if (state.enableSort) {
        state.characteristics.sort((a, b) => a.title.localeCompare(b.title))
        state.enableSort = false
      } else {
        state.characteristics.sort((b, a) => a.title.localeCompare(b.title))
        state.enableSort = true
      }
    }
  },
  actions: {
    editSize({commit}, value) {
      commit('editSize', value)
    },
    async updateSizes(context, sizes) {
      console.log(sizes)
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      const values = sizes
      try {
        await axios.put(`http://${domain}/api/v1/products/characteristics/updateSizeCharacteristics`,{
          values: values
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        context.commit('setSelectedSizes', sizes)
      } catch (e) {
        console.log(e)
      }
    },
    clearClone({ commit }) {
      commit('clearClone')
    },
    sortList({ commit }) {
      commit('sortList')
    },
    async updateColor(context, item) {
      console.log(item)
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      const values = item.characteristic_value
      try {
        await axios.put(`http://${domain}/api/v1/products/characteristics/updateColorCharacteristics`,{
          values: values
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async updateItem(context, item){
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      const values = item.values
      console.log(item)
      try {
        await axios.put(`http://${domain}/api/v1/products/characteristics/${item.id}`,{
          id: item.id,
          title: item.title,
          values: values
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        context.commit('updateItem', item)
      } catch (e) {
        console.log(e)
      }
    },

    updateChip({ commit }, value) {
      commit('updateChip', value)
    },
    deleteChip({ commit }, value) {
      commit('deleteChip', value)
    },
    cloneItem({ commit }, data) {
      commit('cloneItem', data)
    },
    removeItem({ commit }, content) {
      commit('removeItem', content)
    },

    async fetchData(context) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain

      try {
        const { data: data } = await axios.get(`http://${domain}/api/v1/products/characteristics`,  {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(data.data)
        await context.commit("updateList", data.data[2].characteristics)
        await context.commit("setColorData", data.data[0].characteristic_color)
        await context.commit("setSizeData", data.data[1].characteristic_size)
        await context.commit("setSelectedSizes", data.data[1].characteristic_size.characteristic_value)
      } catch (e) {
        console.log(e)
      }

    },
    async updateDataList( context, payload) {
      context.commit("updateList", payload)
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      try {
        await axios.post(`http://${domain}/api/v1/products/characteristics/sortCharacteristics`, {
          characteristics: payload
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    async createItem( context, item ) {
      const token = await context.rootState.auth.token
      const domain = await context.rootState.auth.user.company.domain
      const values = item.characteristic_value
      console.log(item)
      try {
        const { data: items } = await axios.post(`http://${domain}/api/v1/products/characteristics`, {
          id: item.id,
          title: item.title,
          values: values
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log(items.data)
        await context.commit('addItem', item)
      } catch (e) {
        console.log(e)
      }
    }
  },
  getters: {
    characteristics: s => s.characteristics,
    cloneCharacteristic: s => s.cloneCharacteristic,
    changeCharacteristic: s => s.changeCharacteristic,
    colorData: s => s.colorData,
    sizeData: s => s.sizeData,
    selectedSizes: s => s.selectedSizes,
  }

}