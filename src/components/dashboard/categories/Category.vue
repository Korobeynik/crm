<template>
  <div class="category">
    <div class="category-top-line">
      <div class="detail-close" @click="$router.push('/products/categories/')">
        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.162909 6.42922L4.70779 11.3243C4.8129 11.4376 4.95323 11.5 5.10285 11.5C5.25247 11.5 5.39279 11.4376 5.49791 11.3243L5.83261 10.9639C6.0504 10.729 6.0504 10.3473 5.83261 10.1128L2.01616 6.00228L5.83684 1.88715C5.94196 1.77384 6 1.6228 6 1.46173C6 1.30049 5.94196 1.14944 5.83684 1.03604L5.50215 0.67573C5.39695 0.562422 5.25671 0.5 5.10708 0.5C4.95746 0.5 4.81714 0.562422 4.71202 0.67573L0.162909 5.57525C0.0575425 5.68892 -0.000329774 5.84068 2.08512e-06 6.00201C-0.000329813 6.16397 0.0575425 6.31564 0.162909 6.42922Z" fill="#5893D4"/>
        </svg>
        <span>Назад</span>
      </div>
      <div class="progress">
        <div class="progress-item">
          <div class="progress-number">40%</div>
          <v-progress-linear value="40"></v-progress-linear>
        </div>
        <div class="progress-item">
          <div class="progress-number">40%</div>
          <v-progress-linear value="40"></v-progress-linear>
        </div>
      </div>
      <div class="change-history">
        <span>История изменения категории</span>
      </div>
    </div>
    <div class="category-content" v-if="category">
      <v-skeleton-loader
          :loading="loading"
          type="list-item-avatar, list-item-three-line, card-heading, image, actions"
      >
        <div class="category-header">
          <div class="category-photo">
            <img v-if="category.image" :src="category.image" alt="">
            <span v-else>Загрузите фото</span>
          </div>
          <div class="category-info">
            <div class="switch-nesting">
              <span class="switch-text">Скрыть</span>
              <v-switch color="#4ECA80" v-model="switchShow" inset></v-switch>
              <span class="switch-text">Показать на сайте</span>
            </div>
            <div class="breadcrumbs">
              <a href="#">{{category.title}}</a>
            </div>
          </div>
        </div>
        <div class="label-title">Единица измерения</div>
        <div class="unit">Шт</div>
        <p class="category-description">
          {{category.desc}}
        </p>
        <div class="category-characteristics" v-if="category.characteristics.length">
          <div class="label-title">Характеристики товаров</div>
          <div class="values-list">
            <div class="value-item" v-for="(value, i) in category.characteristics" :key="i">
              <span style="margin-right: 15px">{{value.title}}</span>
              <svg @click="editCharacteristic(value)" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="item-edit"><path data-v-4f6ba5be="" d="M16 4.27778L13.2222 1.5L2.11111 12.6111L1 16.5L4.88889 15.3889L16 4.27778ZM11 3.72222L13.7778 6.5L11 3.72222ZM2.11111 12.6111L4.88889 15.3889L2.11111 12.6111Z" stroke="#BBDBFE" stroke-width="1.39565" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </div>
        </div>
        <div class="category-properties" v-if="category.properties.length">
          <div class="label-title">Свойства товаров</div>
          <div class="values-list">
            <div class="value-item" v-for="(value, i) in category.properties" :key="i">
              <span style="margin-right: 15px">{{value.title}}</span>
              <svg @click="editProperty(value)" width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="item-edit"><path data-v-4f6ba5be="" d="M16 4.27778L13.2222 1.5L2.11111 12.6111L1 16.5L4.88889 15.3889L16 4.27778ZM11 3.72222L13.7778 6.5L11 3.72222ZM2.11111 12.6111L4.88889 15.3889L2.11111 12.6111Z" stroke="#BBDBFE" stroke-width="1.39565" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </div>
          </div>
        </div>
      </v-skeleton-loader>
    </div>

    <!-- Characteristic edit -->
    <v-dialog
        max-width="1230px"
        overlay-opacity="0.7"
        v-model="dialogCharacteristic"
        class="dialog-large update-item"
    >
      <div class="dialog-header">
        <div class="header-text">
          <span>Редактирование характеристики</span>
        </div>
        <div class="dialog-header-actions">
          <div class="alert-save">Изменения сохранены</div>
          <v-btn icon color="#5893D4">
            <svg class="attach" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.19206 0L15 4.76753L14.0841 6.44527L12.0646 6.33063L9.77483 10.525L10.7434 14.4718L9.36953 16.9884L5.46556 14.6047L3.63377 17.9601L1.47914 20L2.07218 17.0066L3.90397 13.6512L0 11.2674L1.37384 8.7508L5.09007 7.66445L7.3798 3.47011L6.27616 1.67774L7.19206 0Z" fill="#BBDBFE"/>
            </svg>
          </v-btn>
          <v-btn icon color="#5893D4" class="action-btn sortable-btn" @click="closeCharacteristic()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.98235 5.7228L13.7052 0L15.9614 2.25629L10.2386 7.97909L16 13.7405L13.7405 16L7.97909 10.2386L2.25629 15.9614L0 13.7052L5.7228 7.98235L0.0353056 2.29485L2.29485 0.0353032L7.98235 5.7228Z" fill="#BBDBFE"/>
            </svg>
          </v-btn>
        </div>
      </div>
      <div class="dialog-content dialog-content-large page characteristic-page">
        <div class="detail-close" @click="closeCharacteristic()">
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.162909 6.42922L4.70779 11.3243C4.8129 11.4376 4.95323 11.5 5.10285 11.5C5.25247 11.5 5.39279 11.4376 5.49791 11.3243L5.83261 10.9639C6.0504 10.729 6.0504 10.3473 5.83261 10.1128L2.01616 6.00228L5.83684 1.88715C5.94196 1.77384 6 1.6228 6 1.46173C6 1.30049 5.94196 1.14944 5.83684 1.03604L5.50215 0.67573C5.39695 0.562422 5.25671 0.5 5.10708 0.5C4.95746 0.5 4.81714 0.562422 4.71202 0.67573L0.162909 5.57525C0.0575425 5.68892 -0.000329774 5.84068 2.08512e-06 6.00201C-0.000329813 6.16397 0.0575425 6.31564 0.162909 6.42922Z" fill="#5893D4"/>
          </svg>
          <span>Назад к категории</span>
        </div>
        <CharacteristicEdit
            :characteristicEdit="characteristicEdit"
            :key="componentKey"
            ref="updateItem"
        ></CharacteristicEdit>
        <div class="dialog-actions popup-buttons">
          <v-btn
              class="popup-btn transparent-btn"
              color="#5893D4"
              text
              style="font-size: 13px"
              @click="closeCharacteristic()"
          >
            Назад
          </v-btn>
          <v-btn
              class="popup-btn"
              color="#5893D4"
              dark
              style="font-size: 13px"
              @click="updateItem()"
          >
            Сохранить и добавить
          </v-btn>
        </div>
      </div>
    </v-dialog>

    <!-- Property edit -->
    <v-dialog
        max-width="1230px"
        overlay-opacity="0.7"
        v-model="dialogProperty"
        class="dialog-large update-item"
    >
      <div class="dialog-header">
        <div class="header-text">
          <span>Редактирование свойства</span>
        </div>
        <div class="dialog-header-actions">
          <div class="alert-save">Изменения сохранены</div>
          <v-btn icon color="#5893D4">
            <svg class="attach" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.19206 0L15 4.76753L14.0841 6.44527L12.0646 6.33063L9.77483 10.525L10.7434 14.4718L9.36953 16.9884L5.46556 14.6047L3.63377 17.9601L1.47914 20L2.07218 17.0066L3.90397 13.6512L0 11.2674L1.37384 8.7508L5.09007 7.66445L7.3798 3.47011L6.27616 1.67774L7.19206 0Z" fill="#BBDBFE"/>
            </svg>
          </v-btn>
          <v-btn icon color="#5893D4" class="action-btn sortable-btn" @click="closeProperty()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.98235 5.7228L13.7052 0L15.9614 2.25629L10.2386 7.97909L16 13.7405L13.7405 16L7.97909 10.2386L2.25629 15.9614L0 13.7052L5.7228 7.98235L0.0353056 2.29485L2.29485 0.0353032L7.98235 5.7228Z" fill="#BBDBFE"/>
            </svg>
          </v-btn>
        </div>
      </div>
      <div class="dialog-content dialog-content-large page characteristic-page">
        <div class="detail-close" @click="closeProperty()">
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.162909 6.42922L4.70779 11.3243C4.8129 11.4376 4.95323 11.5 5.10285 11.5C5.25247 11.5 5.39279 11.4376 5.49791 11.3243L5.83261 10.9639C6.0504 10.729 6.0504 10.3473 5.83261 10.1128L2.01616 6.00228L5.83684 1.88715C5.94196 1.77384 6 1.6228 6 1.46173C6 1.30049 5.94196 1.14944 5.83684 1.03604L5.50215 0.67573C5.39695 0.562422 5.25671 0.5 5.10708 0.5C4.95746 0.5 4.81714 0.562422 4.71202 0.67573L0.162909 5.57525C0.0575425 5.68892 -0.000329774 5.84068 2.08512e-06 6.00201C-0.000329813 6.16397 0.0575425 6.31564 0.162909 6.42922Z" fill="#5893D4"/>
          </svg>
          <span>Назад к категории</span>
        </div>
        <PropertyEdit
            :categoryEdit="categoryEdit"
            :key="componentKey"
            ref="updateProperty"
        ></PropertyEdit>
        <div class="dialog-actions popup-buttons">
          <v-btn
              class="popup-btn transparent-btn"
              color="#5893D4"
              text
              style="font-size: 13px"
              @click="closeProperty()"
          >
            Назад
          </v-btn>
          <v-btn
              class="popup-btn"
              color="#5893D4"
              dark
              style="font-size: 13px"
              @click="updateProperty()"
          >
            Сохранить и добавить
          </v-btn>
        </div>
      </div>
    </v-dialog>

  </div>
</template>

<script>

import CharacteristicEdit from "@/components/dashboard/characteristic/CharacteristicEdit"
import PropertyEdit from "@/components/dashboard/properties/PropertyEdit"
import {mapGetters} from 'vuex'

export default {
  name: "Category",
  props: {
    closeDetails: {
      type: Function
    }
  },
  components: {
    CharacteristicEdit,
    PropertyEdit
  },
  data: () => ({
    photo: false,
    switchShow: true,
    loading: true,
    dialogCharacteristic: false,
    dialogProperty: false,
    componentKey: 0,
    characteristicEdit: null,
    categoryEdit: null
  }),

  created () {
    this.fetchData()
  },

  computed: {
    ...mapGetters([
      'category',
      'dataEdit'
    ])
  },

  watch: {
    $route: 'fetchData'
  },

  methods: {
    updateItem() {
      this.closeCharacteristic()
      this.$refs.updateItem.updateItem()
    },
    updateProperty() {
      this.closeProperty()
      this.$refs.updateProperty.updateProperty()
    },
    async fetchData () {
      await this.$store.dispatch('fetchCategory', this.$route.params.id)
    },
    openCharacteristic() {
      this.dialogCharacteristic = true
    },
    async editCharacteristic(element) {
      console.log(element)
      try {
        await this.$store.dispatch('clearDataEdit')
        await this.$store.dispatch('editCharacteristic', element)
        this.characteristicEdit = this.dataEdit
        console.log(this.characteristicEdit)
        this.forceRerender()
        this.dialogCharacteristic = true
      } catch (e) {
        console.log(e)
      }
    },

    async editProperty(element) {
      console.log(element)
      try {
        await this.$store.dispatch('clearDataEdit')
        await this.$store.dispatch('editProperty', element)
        this.categoryEdit = this.dataEdit
        console.log(this.categoryEdit)
        this.forceRerender()
        this.dialogProperty = true
      } catch (e) {
        console.log(e)
      }
    },
    closeCharacteristic() {
      this.$store.dispatch('clearDataEdit')
      this.dialogCharacteristic = false
    },
    closeProperty() {
      this.$store.dispatch('clearDataEdit')
      this.dialogProperty = false
    },
    forceRerender() {
      this.componentKey += 1;
    },

  },

  beforeDestroy() {
    this.closeDetails()
  },

  async mounted() {
    this.closeDetails()
    await this.$store.dispatch('fetchCategory', this.$route.params.id)
    this.loading = false
    //console.log(this.category.id)
  }
}
</script>

<style scoped>

</style>