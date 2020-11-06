<template>
  <div class="item-area" v-if="characteristic">
    <div class="item-area-col">
      <form class="item-form">
        <div class="item-name">
          <label>{{ $t("page.name") }}</label>
          <input
            @input="changeName"
            type="text"
            :placeholder="$t('page.typeName')"
            v-model.trim="characteristicName"
            :disabled="characteristic.id == 1 || characteristic.id == 2"
          />
          <small class="warn" v-if="clone && clone.id == characteristicEdit.id">Измените название характеристики</small>
          <small class="warn" v-if="exists"
            >Характеристика <b>{{ characteristicName }}</b> уже существует
          </small>
        </div>
        <div class="item-values">
          <div class="values-titles" v-if="characteristic.id === 2">
            <label>Выберите размер</label>
            <label style="text-align: left; max-width: 215px">Свой вариант значения</label>
          </div>
          <label v-else>{{ $t("page.addValueVariant") }}</label>
          <input
            v-if="characteristic.id !== 2"
            @input="checkValue"
            type="text"
            :placeholder="$t('page.typeName')"
            v-model="itemValue.title"
            @keypress.enter="saveChip"
          />
          <small class="warn" v-if="valueExists"
            >Значения свойства <b>{{ itemValue.title }}</b> уже существует
          </small>
          <div class="selection-bar" v-if="characteristic.id === 1">
            <v-btn class="select-btn btn-file" @click="selectFile">
              <div class="text">Выберете файл</div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/bmp"
                @change="previewImage"
              />
            </v-btn>
            <v-menu
              transition="slide-y-transition"
              bottom
              :close-on-content-click="closeOnContentClick"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="select-btn"
                  v-bind="attrs"
                  v-on="on"
                  @click="selectColor"
                >
                  <div class="text">Выбрать цвет</div>
                </v-btn>
              </template>
              <v-color-picker
                hide-mode-switch
                v-model="selectValue"
                show-swatches
              ></v-color-picker>
            </v-menu>
            <div class="select-value" v-if="visibleSelectValue">
              <span>Загружено / Выбрано: </span>
              <div
                class="select-style"
                :style="{ background: selectStyle2 }"
              ></div>
              <svg
                @click="clearSelectValue"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.98676 4.7921L10.2789 0.5L11.9711 2.19222L7.67898 6.48432L12 10.8053L10.3053 12.5L5.98432 8.17898L1.69222 12.4711L0 10.7789L4.2921 6.48676L0.0264792 2.22114L1.72114 0.526477L5.98676 4.7921Z"
                  fill="#BBDBFE"
                />
              </svg>
            </div>
          </div>
          <div class="vendor-code" v-if="characteristic.id === 1">
            <div class="vendor-code-header">
              <input
                type="checkbox"
                id="vendor"
                :checked="vendor"
                v-model="vendor"
              />
              <label for="vendor">Артикул значения</label>
            </div>
            <input
              :disabled="!vendor"
              type="text"
              placeholder="00"
              v-model="vendorCode"
            />
          </div>

          <div class="size-grid" v-if="characteristic.id === 2">
            <div class="digital-sizes size-item">
              <div class="size-item-title">Цифровы размеры</div>
              <simplebar class="size-item-content">
                <div class="check-all" @click="selectAll(0)">
                  <input type="checkbox" id="all-digital-sizes" v-model="allSelectedN" />
                  <label for="all-digital-sizes">Все</label>
                </div>
                <ul class="list-group">
                  <li class="list-group-item" v-for="(item, index) in values.filter(i => i.type === 0)" :key="index">
                    <input
                      :id="item.id"
                      type="checkbox"
                      @change="updateSelectedSizes(item)"
                      :value="item"
                      v-model="sizes"
                    />
                    <label :for="item.id">{{item.title}}</label>
                  </li>
                </ul>
              </simplebar>
            </div>
            <div class="character-sizes size-item">
              <div class="size-item-title">Символьные размеры</div>
              <simplebar class="size-item-content">
                <div class="check-all" @click="selectAll(1)">
                  <input type="checkbox" id="all-character-sizes" v-model="allSelectedS" />
                  <label for="all-character-sizes">Все</label>
                </div>
                <ul class="list-group">
                  <li class="list-group-item" v-for="(item, index) in values.filter(i => i.type === 1)" :key="index">
                    <input
                      :id="item.id"
                      type="checkbox"
                      @change="updateSelectedSizes(item)"
                      :value="item"
                      v-model="sizes"
                    />
                    <label :for="item.id">{{item.title}}</label>
                  </li>
                </ul>
              </simplebar>
            </div>
            <div class="size-item custom-size">
              <div class="custom-size-content">
                <input type="text" v-model="customSize">
                <svg @click="addCustomSize()" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M29.5 15C29.5 23.0081 23.0081 29.5 15 29.5C6.99187 29.5 0.500003 23.0081 0.500003 15C0.500004 6.99187 6.99188 0.499998 15 0.499999C23.0081 0.499999 29.5 6.99187 29.5 15Z" stroke="#9DCCFF"/>
                  <path d="M16.1027 13.8732L20 13.8732L20 16.0765L16.1027 16.0765L16.1027 20L13.8973 20L13.8973 16.0765L10 16.0765L10 13.8732L13.8973 13.8732L13.8973 10L16.1027 10L16.1027 13.8732Z" fill="#9DCCFF"/>
                </svg>
              </div>
            </div>
          </div>
          <v-btn
            v-if="characteristic.id !== 2"
            @click="saveChip"

            class="base-btn"
            >{{ $t("page.addButton") }}</v-btn
          >
        </div>
      </form>
    </div>

    <div class="item-area-col col-list">
      <draggable
        v-if="characteristic.id === 2" class="values-list size-value-list"
        tag="div"
        v-model="sizes"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div
            class="value-item"
            v-for="(value, i) in sizes"
            :key="i"
            :class="{active: value.title === customSize, edit: value.edit}"
          >
            <span>{{ value.title }}</span>
            <svg
              v-if="value.edit"
              class="edit"
              @click="editCustomSize(value, i)"
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4.27778L13.2222 1.5L2.11111 12.6111L1 16.5L4.88889 15.3889L16 4.27778ZM11 3.72222L13.7778 6.5L11 3.72222ZM2.11111 12.6111L4.88889 15.3889L2.11111 12.6111Z"
                stroke="#BBDBFE"
                stroke-width="1.39565"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              @click="deleteChip(value, i)"
              class="close"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.98676 4.7921L10.2789 0.5L11.9711 2.19222L7.67898 6.48432L12 10.8053L10.3053 12.5L5.98432 8.17898L1.69222 12.4711L0 10.7789L4.2921 6.48676L0.0264792 2.22114L1.72114 0.526477L5.98676 4.7921Z"
                fill="#BBDBFE"
              />
            </svg>
          </div>
        </transition-group>
      </draggable>


      <draggable
        v-if="characteristic.id !== 2" class="values-list" :class="{'value-list-color' : characteristic.id === 1 }"
        tag="div"
        v-model="values"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div
            class="value-item"
            v-for="(value, i) in values"
            :key="i"
            :class="{active: value.title.toLowerCase() === itemValue.title.toLowerCase() }"
          >
            <span>{{ value.title }}</span>
            <span v-if="value.code">({{ value.code }})</span>
            <span
              class="select-style"
              :style="{ background: value.selectValue }"
            ></span>
            <svg
              v-if="characteristic.id === 1"
              class="edit"
              @click="editChip(value, i)"
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4.27778L13.2222 1.5L2.11111 12.6111L1 16.5L4.88889 15.3889L16 4.27778ZM11 3.72222L13.7778 6.5L11 3.72222ZM2.11111 12.6111L4.88889 15.3889L2.11111 12.6111Z"
                stroke="#BBDBFE"
                stroke-width="1.39565"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <svg
              @click="deleteChip(value, i)"
              class="close"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.98676 4.7921L10.2789 0.5L11.9711 2.19222L7.67898 6.48432L12 10.8053L10.3053 12.5L5.98432 8.17898L1.69222 12.4711L0 10.7789L4.2921 6.48676L0.0264792 2.22114L1.72114 0.526477L5.98676 4.7921Z"
                fill="#BBDBFE"
              />
            </svg>
          </div>
        </transition-group>
      </draggable>

      <div class="used" v-if="characteristic.categories">
        <div class="title">{{ $t("page.usedCategories") }}</div>
        <div class="used-list">
          <router-link :to="`/products/categories/${item.id}`" v-for="item in characteristic.categories" :key="item.id">
            <span>{{ item.title }}</span>
            <svg
              width="6"
              height="11"
              viewBox="0 0 6 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83709 5.07078L1.29221 0.175731C1.1871 0.0624225 1.04677 1.83024e-07 0.897152 1.56863e-07C0.74753 1.30702e-07 0.607207 0.0624224 0.50209 0.17573L0.167391 0.536134C-0.0504 0.770977 -0.0504001 1.15267 0.167391 1.38715L3.98383 5.49772L0.163154 9.61285C0.0580368 9.72616 -2.03951e-06 9.8772 -2.07277e-06 10.0383C-2.10607e-06 10.1995 0.0580367 10.3506 0.163154 10.464L0.497853 10.8243C0.603053 10.9376 0.743293 11 0.892915 11C1.04254 11 1.18286 10.9376 1.28798 10.8243L5.83709 5.92475C5.94246 5.81108 6.00033 5.65932 6 5.49799C6.00033 5.33603 5.94246 5.18436 5.83709 5.07078Z"
                fill="#BBDBFE"
              />
            </svg>
          </router-link>
        </div>
      </div>
      <v-btn v-if="!clone" @click="updateItem" :disabled="exists || !characteristicName.length" class="base-btn shadow-btn">{{ $t('page.saveButton') }}</v-btn>
      <v-btn v-else @click="createItem" :disabled="exists || !characteristicName.length" class="base-btn shadow-btn">{{ $t('page.saveButton') }}</v-btn>
    </div>
  </div>
</template>

<script>
//import ColorData from "@/components/dashboard/characteristic/ColorData";
import {mapGetters} from 'vuex'
export default {
  name: "characteristicEdit",
  props: {
    characteristicEdit: {
      type: Object,
    },
    closeDetails: {
      type: Function,
    },
    set: {
      type: Boolean,
      default: true,
    },
  },
  components: {
   
  },
  data: () => ({
    sizes: null,
    customSize: '',
    allSelectedS: false,
    allSelectedN: false,
    characteristic: null,
    characteristicName: "",
    itemValue: {
      title: "",
      vendorCode: "",
      selectValue: "",
    },
    editableChip: null,
    editSize: null,
    vendor: "",
    vendorCode: "",
    values: [],
    exists: false,
    valueExists: false,
    closeOnContentClick: false,
    selectImage: "",
    selectValue: "",
    showSelectValue: false,
    visibleSelectValue: false,
    drag: false,
    bgc: {
      background: "",
    },
    rules: [
      (value) =>
        !value ||
        value.size < 2000000 ||
        "Размер картинки не должен превышать 2 МБ!",
    ],
  }),
  computed: {
    ...mapGetters([
      'colorData',
      'sizeData',
      'selectedSizes'
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    },
    selectStyle2: {
      get() {
        if (this.selectImage.length > 0) {
          return `url("${this.selectImage}")`
        } else if (this.selectValue) {
          return this.selectValue
        } else {
          return null
        }
      },
      set() {
        console.log(this.editableChip);
        return {
          background: this.editableChip.selectValue.background,
        };
      },
    },
    selectStyle() {
      if (this.selectImage.length > 0) {
        return {
          background: `url("${this.selectImage}")`,
        };
      } else if (this.selectValue) {
        return {
          background: this.selectValue,
        };
      } else {
        return null;
      }
    },
    clone() {
      return this.$store.getters["cloneCharacteristic"]
    },
    characteristics() {
      return this.$store.getters["characteristics"]
    },
  },
  methods: {
    removeAll() {
      this.sizes.forEach((item, index) => {
        if (item.check == false) {
          this.sizes.splice(index, 1)
        }
      })
    },
    selectAll(type) {
      this.values.filter(i => i.type === type).forEach((item) => {
        if (type === 1) {
          if (!this.allSelectedS) {
            item.check = true
            console.log(item)
            this.sizes.push(item)
          } else {
            item.check = false
            console.log(item)
            this.removeAll()
          }
        } else {
          if (!this.allSelectedN) {
            item.check = true
            console.log(item)
            this.sizes.push(item)
          } else {
            item.check = false
            console.log(item)
            this.removeAll()
          }
        }
      })
    },
    checkSelectedCheckboxes() {
      this.values.filter(i => i.type === 1).forEach((item, index) => {
        if (!item.check) {
          this.values.splice(index, 1)
        }
      });
    },
    async addCustomSize () {
      if (this.editSize) {
        await this.updateCustomSize()
      } else {
        const size = {
          id: Date.now(),
          edit: true,
          title: this.customSize,
          check: false
        }
        try {
          await this.sizes.push(size)
          //await this.$store.dispatch('updateSizes', [this.sizes, size])
          this.customSize = ''
        } catch (e) {
          console.log(e)
        }
      }
    },
    editCustomSize(value) {
      this.customSize = value.title
      this.editSize = value
      // this.$store.dispatch('editSize', this.editSize)
    },
    updateCustomSize() {
      const size = {
        title: this.customSize,
        id: this.editSize.id
      }
      this.$store.dispatch('editSize', size)
      this.editSize = ''
      this.customSize = ''
      this.sizes = this.selectedSizes
    },
    updateSelectedSizes(item) {
      item.sizes = !item.sizes
      item.check = !item.check
      console.log(this.sizes)
      //this.$store.dispatch('updateSizes', [this.sizes, item])
    },
    selectFile() {
      this.visibleSelectValue = true;
    },
    selectColor() {
      this.visibleSelectValue = true;
    },
    previewImage(event) {
      this.selectValue = " "
      let input = event.target
      if (input.files && input.files[0]) {
        let reader = new FileReader()
        reader.onload = (e) => {
          this.selectImage = e.target.result
        };
        reader.readAsDataURL(input.files[0])
      }
      console.log(this.selectImage)
    },
    clearSelectValue() {
      console.log(this.selectStyle2)
      this.selectValue = ""
      this.selectImage = ""
      this.visibleSelectValue = false
      //this.selectValue = null
      console.log(this.selectStyle2)
    },
    checkValue() {
      console.log(this.values)
      if (
        this.values.find(
          (value) =>
            value.title.toLowerCase() === this.itemValue.title.toLowerCase()
        )
      ) {
        this.valueExists = true
      } else {
        this.valueExists = false
      }
    },
    existsCheck() {
      if (
        this.$store.getters["characteristics"].find(
          (prop) => prop.title === this.characteristicName
        )
      ) {
        this.exists = true
      } else {
        this.exists = false
      }
    },
    async changeName() {
      await this.$store.dispatch("clearClone")
      this.existsCheck()
    },
    saveChip() {
      if (this.editableChip) {
        this.updateChip(this.editableChip)
      } else {
        const values = this.values
        const itemValue = {
          title: this.itemValue.title,
          code: this.vendorCode,
          property_id: this.characteristicEdit.id,
          selectValue: this.selectStyle2,
        }
        console.log(itemValue)
        const set = this.set;
        ((set && values.indexOf(itemValue) === -1) || !set) &&
          values.push(itemValue)
        console.log(itemValue)
        this.itemValue.title = ""
        this.vendorCode = ""
        this.vendor = false
        this.clearSelectValue()
        this.valueExists = false
      }
    },
    deleteChip(value, index) {
      if (this.characteristic.id === 1) {
        this.$store.dispatch("deleteChip", index)
      } else if (this.characteristic.id === 2) {
        this.sizes.splice(index, 1)
        //this.$store.dispatch('updateSizes', [this.sizes, value])
      }
      else {
        console.log('delete value')
        console.log(this.values)
        this.values.splice(index, 1)
      }
      console.log(index)
    },
    editChip(value, index) {
      console.log(value)
      console.log(index)
      this.editableChip = value
      console.log(this.editableChip)
      this.itemValue.title = this.editableChip.title
      this.vendorCode = this.editableChip.code
      this.vendor = true
      if (this.editableChip.selectValue) {
        this.selectValue = this.editableChip.selectValue
      } else {
        this.selectValue = '#FF0000FF'
      }
      //this.selectValue = this.editableChip.selectValue
      this.visibleSelectValue = true
    },
    async updateChip() {
      const value = {
        id: this.editableChip.id,
        title: this.itemValue.title,
        code: this.vendorCode,
        selectValue: this.selectStyle2,
      }
      try {
        await this.$store.dispatch("updateChip", value)
        this.values = this.colorData.characteristic_color_value
        this.editableChip = null
        this.itemValue.title = ""
        this.vendorCode = ""
        this.vendor = false
        this.clearSelectValue()
        this.valueExists = false
      } catch (error) {
        console.log(error)
      }
    },
    async updateItem() {
      const item = {
        id: this.characteristicEdit.id,
        title: this.characteristicName,
        values: this.values,
        check: false,
      }
      console.log(item)
      const dataAlert = {
        name:
          localStorage.getItem("locale") == "ru"
            ? "Характеристика"
            : "Характеристика",
        title: this.characteristicEdit.title,
        createdName:
          localStorage.getItem("locale") == "ru" ? "обновлена" : "оновлена",
      };
      try {

        //await this.$store.dispatch("updateItem", item)

        if (this.characteristicEdit.id == 1) {
          await this.$store.dispatch("updateColor", item)
        } else if(this.characteristicEdit.id == 2) {
          await this.$store.dispatch("updateSizes", this.sizes)
        } else {
          await this.$store.dispatch("updateItem", item)
        }

        this.closeDetails()
        console.log(dataAlert)
        await this.$store.dispatch("alertShow", dataAlert)
      } catch (e) {
        console.log(e)
      }
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

  mounted() {
    //console.log(this.editableChip)

    console.log(this.sizes)
    this.characteristic = this.characteristicEdit
    console.log(this.characteristic)

    if (this.selectedSizes) {
      this.sizes = this.selectedSizes
    } else  {
      this.sizes = this.characteristicEdit.characteristic_size_value
    }

    this.characteristicName = this.characteristicEdit.title
    if (this.characteristic.id === 1) {
      console.log("color")
      if (this.colorData) {
        this.values = this.colorData.characteristic_color_value
        console.log( this.values)
      } else {
        this.values = this.characteristic.characteristic_color_value
      }
    } else if (this.characteristic.id === 2) {
      console.log("size")
      if (this.sizeData) {
        this.values = this.sizeData.characteristic_size_value
      } else {
        this.values = this.characteristicEdit.characteristic_value
      }
    }
    else {
      this.values = this.characteristic.characteristic_value
    }
  },
}
</script>

<style scoped>
</style>