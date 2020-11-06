<template>
  <div class="item-area">
    <div class="item-area-col">
      <form class="item-form">
        <div class="item-name">
          <label>{{ $t('page.name') }}</label>
          <input type="text" :placeholder="$t('page.typeName')" v-model.trim="characteristicName">
          <small v-if="invalid" class="warn" >Свойство <b>{{characteristicName}}</b> уже существует </small>
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

      <div class="used">
        <div class="title">{{ $t('page.usedCategories') }}</div>
        <div class="used-list">
          <router-link to="/">
            <span>Ноутбуки</span>
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.83709 5.07078L1.29221 0.175731C1.1871 0.0624225 1.04677 1.83024e-07 0.897152 1.56863e-07C0.74753 1.30702e-07 0.607207 0.0624224 0.50209 0.17573L0.167391 0.536134C-0.0504 0.770977 -0.0504001 1.15267 0.167391 1.38715L3.98383 5.49772L0.163154 9.61285C0.0580368 9.72616 -2.03951e-06 9.8772 -2.07277e-06 10.0383C-2.10607e-06 10.1995 0.0580367 10.3506 0.163154 10.464L0.497853 10.8243C0.603053 10.9376 0.743293 11 0.892915 11C1.04254 11 1.18286 10.9376 1.28798 10.8243L5.83709 5.92475C5.94246 5.81108 6.00033 5.65932 6 5.49799C6.00033 5.33603 5.94246 5.18436 5.83709 5.07078Z" fill="#BBDBFE"/>
            </svg>
          </router-link>
        </div>
      </div>
      <v-btn @click="createItem" :disabled="!characteristicName.length || invalid" class="base-btn shadow-btn">{{ $t('page.saveButton') }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "characteristicCreate",
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
    characteristicName: '',
    itemValue: '',
    values: [],
    valueExists: false,
    invalid: false,
    drag: false,
  }),
  watch: {
    exists() {
      if (this.$store.getters['characteristics'].find(prop => prop.name === this.characteristicName)) {
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
    checkValue(){
      if (this.values.length) {
        if (this.values.find(value => value.title.toLowerCase() === this.itemValue.toLowerCase())) {
          this.valueExists = true
        } else {
          this.valueExists = false
        }
      }
    },
    saveChip() {
      const values = this.values;
      const itemValue = {
        id: Date.now(),
        order: 0,
        characteristic_id: Date.now(),
        title: this.itemValue
      }
      const set = this.set;
      ((set && values.indexOf(itemValue) === -1) || !set) && values.push(itemValue)
      this.itemValue = ''
      this.valueExists = false
    },
    deleteChip(index) {
      this.values.splice(index, 1)
    },
    async createItem() {
      const item = {
        id: Date.now(),
        title: this.characteristicName,
        characteristic_value: this.values,
        check: false
      }
      const dataAlert = {
        name: localStorage.getItem('locale') == 'ru' ? 'характеристика' : 'характеристика',
        title: this.characteristicName,
        createdName: localStorage.getItem('locale') == 'ru' ? 'создана' : 'створена'
      }
      try {
        await this.$store.dispatch('createItem', item)
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