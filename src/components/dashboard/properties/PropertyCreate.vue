<template>
  <div class="item-area">

    <div class="item-area-col">
      <form class="item-form">
        <div class="item-name">
          <label>{{ $t('page.name') }}</label>
          <input @input="changeName" type="text" :placeholder="$t('page.typeName')" v-model.trim="propertyName">
          <small v-if="exists" class="warn" >Свойство <b>{{propertyName}}</b> уже существует </small>
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
          v-model="property.values"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div class="value-item"
               v-for="(value, i) in  property.values"
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
      <v-btn @click="createProperty" :disabled="!propertyName.length || invalid" class="base-btn shadow-btn">{{ $t('page.saveButton') }}</v-btn>
    </div>

  </div>
</template>

<script>
export default {
  name: "propertyCreate",
  props: {
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
    property: {
      values: []
    },
    valueExists: false,
    invalid: false,
    exists: false,
    drag: false,
  }),
  watch: {
    exists() {
      if (this.$store.getters['properties'].find(prop => prop.name === this.propertyName)) {
        this.invalid = true
      }
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  },
  methods: {
    changeName() {
      this.existsCheck()
    },
    existsCheck() {
      if (this.$store.getters['properties'].find(prop => prop.title.toLowerCase() === this.propertyName.toLowerCase())) {
        this.exists = true
      } else {
        this.exists = false
      }
    },
    checkValue(){
      if (this.property.values.length) {
        if (this.property.values.find(value => value.title.toLowerCase() === this.itemValue.toLowerCase())) {
          this.valueExists = true
        } else {
          this.valueExists = false
        }
      }
    },
    saveChip() {
      const values = this.property.values;
      const itemValue = {
        id: Date.now(),
        order: 0,
        property_id: Date.now(),
        title: this.itemValue
      }
      const set = this.set;
      ((set && values.indexOf(itemValue) === -1) || !set) && values.push(itemValue)
      this.itemValue = ''
      this.valueExists = false
    },
    deleteChip(index) {
      this.property.values.splice(index, 1)
    },
    async createProperty() {
      const property = {
        id: Date.now(),
        title: this.propertyName,
        property_value: this.property.values,
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
        this.closeDetails()
        await this.$store.dispatch('alertShow', dataAlert)
      } catch (e) {
        console.log(e)
      }
    }
  },
}
</script>

<style scoped>

</style>