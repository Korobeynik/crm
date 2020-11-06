<template>
  <div class="item-area">
    <div class="item-area-col">
      <form class="item-form">
        <div class="item-name">
          <label>{{ $t('page.name') }}</label>
          <input @input="changeName" type="text" :placeholder="$t('page.typeName')"  v-model.trim="propertyName">
          <small class="warn" v-if="clone && clone.id == categoryEdit.id">Измените название свойства</small>
          <small class="warn" v-if="exists">Свойство <b>{{propertyName}}</b> уже существует </small>
        </div>
        <div class="item-values">
          <label>{{ $t('page.addValueVariant') }}</label>
          <input @input="checkValue" type="text" :placeholder="$t('page.typeName')" v-model="itemValue" @keypress.enter="saveChip">
          <small class="warn" v-if="valueExists">Значения свойства <b>{{itemValue}}</b> уже существует </small>
          <v-btn @click="saveChip" :disabled="!itemValue.length" class="base-btn">{{ $t('page.addButton') }}</v-btn>
        </div>
      </form>
    </div>
    <div class="item-area-col col-list">
      <draggable
          class="values-list"
          tag="div"
          v-model="values"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div class="value-item"
               v-for="(value, i) in values"
               :key="i"
               :class="{'active' : value.title.toLowerCase() === itemValue.toLowerCase()}"
          >
            <span>{{value.title}}</span>
            <svg @click="deleteChip(i)" class="close" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.98676 4.7921L10.2789 0.5L11.9711 2.19222L7.67898 6.48432L12 10.8053L10.3053 12.5L5.98432 8.17898L1.69222 12.4711L0 10.7789L4.2921 6.48676L0.0264792 2.22114L1.72114 0.526477L5.98676 4.7921Z" fill="#BBDBFE"/>
            </svg>
          </div>
        </transition-group>
      </draggable>
      <div class="used" v-if="usedCategories && usedCategories.length > 0">
        <div class="title">{{ $t('page.usedCategories') }}</div>
        <div class="used-list">
          <router-link to="/" v-for="item in usedCategories" :key="item.id">
            <span>{{ item.title }}</span>
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.83709 5.07078L1.29221 0.175731C1.1871 0.0624225 1.04677 1.83024e-07 0.897152 1.56863e-07C0.74753 1.30702e-07 0.607207 0.0624224 0.50209 0.17573L0.167391 0.536134C-0.0504 0.770977 -0.0504001 1.15267 0.167391 1.38715L3.98383 5.49772L0.163154 9.61285C0.0580368 9.72616 -2.03951e-06 9.8772 -2.07277e-06 10.0383C-2.10607e-06 10.1995 0.0580367 10.3506 0.163154 10.464L0.497853 10.8243C0.603053 10.9376 0.743293 11 0.892915 11C1.04254 11 1.18286 10.9376 1.28798 10.8243L5.83709 5.92475C5.94246 5.81108 6.00033 5.65932 6 5.49799C6.00033 5.33603 5.94246 5.18436 5.83709 5.07078Z" fill="#BBDBFE"/>
            </svg>
          </router-link>
        </div>
      </div>
      <v-btn v-if="!clone" @click="updateProperty" :disabled="exists || !propertyName.length" class="base-btn shadow-btn">{{ $t('page.saveButton') }}</v-btn>
      <v-btn v-else @click="createProperty" :disabled="exists || !propertyName.length" class="base-btn shadow-btn">{{ $t('page.saveButton') }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyEdit",
  props: {
    categoryEdit: {
      type: Object
    },
    closeDetails: {
      type: Function
    },
    set: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    propertyName: '',
    itemValue: '',
    values: [],
    exists: false,
    valueExists: false,
    drag: false,
    usedCategories: null
  }),
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    },
    clone() {
      return this.$store.getters['clone']
    },
    properties() {
      return this.$store.getters['properties']
    }
  },
  methods: {
    checkValue(){
      if (this.values.find(value => value.title.toLowerCase() === this.itemValue.toLowerCase())) {
        this.valueExists = true
      } else {
        this.valueExists = false
      }
    },
    existsCheck() {
      if (this.$store.getters['properties'].find(prop => prop.name === this.propertyName)) {
        this.exists = true
      } else {
        this.exists = false
      }
    },
    async changeName() {
      await this.$store.dispatch('clearClone')
      this.existsCheck()
    },
    saveChip() {
      const values = this.categoryEdit.property_value;
      const itemValue = {
        id: Date.now(),
        order: 0,
        property_id: this.categoryEdit.id,
        title: this.itemValue
      }
      //debugger
      console.log(itemValue)
      console.log(values)
      const set = this.set;
      ((set && values.indexOf(itemValue) === -1) || !set) && values.push(itemValue)
      this.itemValue = ''
      this.valueExists = false
    },
    deleteChip(index) {
      console.log(index)
      console.log(this.categoryEdit.property_value)
      this.categoryEdit.property_value.splice(index, 1)
    },
    async createProperty() {
      const property = {
        id: Date.now(),
        title: this.propertyName,
        property_value: this.values,
        check: false
      }
      console.log(property)
      const dataAlert = {
        name: localStorage.getItem('locale') == 'ru' ? 'Свойство' : 'Властивість',
        title: this.propertyName,
        createdName: localStorage.getItem('locale') == 'ru' ? 'создано' : 'створено'
      }
      try {
        await this.$store.dispatch('createProperty', property)
        if (this.closeDetails) {
          this.closeDetails()
        }
        await this.$store.dispatch('alertShow', dataAlert)
      } catch (e) {
        console.log(e)
      }
    },

    async updateProperty() {
      console.log('Update from category')
      const property = {
        id: this.categoryEdit.id,
        title: this.propertyName,
        values: this.values,
        check: false
      }
      console.log(property)
      const dataAlert = {
        name: localStorage.getItem('locale') == 'ru' ? 'Свойство' : 'Властивість',
        title: this.categoryEdit.title,
        createdName: localStorage.getItem('locale') == 'ru' ? 'обновлено' : 'оновлено'
      }
      try {
        await this.$store.dispatch('updateProperty', property)

        /* JSON Server modify data with PUT request */

        if (this.closeDetails) {
          this.closeDetails()
        }
        await this.$store.dispatch('alertShow', dataAlert)
      } catch (e) {
        console.log(e)
      }
    }
  },

  mounted() {
    console.log(this.categoryEdit)
    this.propertyName = this.categoryEdit.title
    this.values = this.categoryEdit.property_value
    this.usedCategories = this.categoryEdit.categories
    console.log(this.usedCategories)
  }
}
</script>

<style scoped>

</style>