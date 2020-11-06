<template>
  <div class="app-footer" v-click-outside="hide">
    <div class="bookmarks">
      <div class="bookmarks-menu-wrap" v-if="isOpenMenu">
        <div class="menu-title">
          <div class="title">Добавить закладку</div>
          <div class="bookmarks-count">{{ selectedBookmarks.length}} / 7</div>
        </div>
        <ul class="bookmarks-menu">
          <li>
            <input type="checkbox" :checked="bookmarks.length" class="custom-input">
            <a href="#">Товары</a>
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.83709 5.07078L1.29221 0.17573C1.1871 0.0624223 1.04677 0 0.897152 0C0.74753 0 0.607207 0.0624223 0.50209 0.17573L0.167391 0.536134C-0.0503999 0.770977 -0.0503999 1.15267 0.167391 1.38715L3.98384 5.49772L0.163156 9.61285C0.0580385 9.72616 -3.12529e-07 9.8772 -3.17625e-07 10.0383C-3.22727e-07 10.1995 0.0580385 10.3506 0.163156 10.464L0.497855 10.8243C0.603055 10.9376 0.743295 11 0.892917 11C1.04254 11 1.18286 10.9376 1.28798 10.8243L5.83709 5.92475C5.94246 5.81108 6.00033 5.65932 6 5.49799C6.00033 5.33603 5.94246 5.18436 5.83709 5.07078Z" fill="#5893D4"/>
            </svg>
            <div class="sub-bookmarks-menu">
              <div v-for="(link, index) in menu.products" :key="index">
                <input
                    :id="link.url" type="checkbox"
                    @change="updateSelectedBookmarks(link)"
                    :disabled="bookmarks.length > 6 && bookmarks.indexOf(link) === -1"
                    :value="link"
                    v-model="bookmarks">
                <label :for="link.url">{{link.title}}</label>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="bookmark-btn" @click="toggleMenu">
        <img src="@/assets/icons/bookmark.svg" alt="">
      </div>
      <div class="bookmarks-list" v-if="selectedBookmarks.length">
        <router-link v-for="(link, index) in selectedBookmarks" :key="index" :to="link.url">
          {{ link.title }}
        </router-link>
      </div>
    </div>
    <div class="footer-actions">
      <div class="calendar" @click="toggleCalendar">
        <img v-if="!isOpenCalendar" src="@/assets/icons/calendar.svg" alt="">
        <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7408 0.256974C13.8222 0.338225 13.8869 0.434749 13.931 0.541015C13.9751 0.647282 13.9978 0.761204 13.9978 0.876257C13.9978 0.991309 13.9751 1.10523 13.931 1.2115C13.8869 1.31776 13.8222 1.41429 13.7408 1.49554L1.49508 13.7412C1.33084 13.9055 1.10807 13.9978 0.875798 13.9978C0.643522 13.9978 0.420759 13.9055 0.256515 13.7412C0.0922711 13.577 1.73059e-09 13.3542 0 13.122C-1.73059e-09 12.8897 0.0922711 12.6669 0.256515 12.5027L12.5022 0.256974C12.5835 0.175517 12.68 0.110889 12.7863 0.0667934C12.8925 0.0226976 13.0064 0 13.1215 0C13.2366 0 13.3505 0.0226976 13.4567 0.0667934C13.563 0.110889 13.6595 0.175517 13.7408 0.256974Z" fill="white"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.256974 0.256974C0.175517 0.338225 0.110889 0.434749 0.0667934 0.541015C0.0226976 0.647282 0 0.761204 0 0.876257C0 0.991309 0.0226976 1.10523 0.0667934 1.2115C0.110889 1.31776 0.175517 1.41429 0.256974 1.49554L12.5027 13.7412C12.6669 13.9055 12.8897 13.9978 13.122 13.9978C13.3542 13.9978 13.577 13.9055 13.7412 13.7412C13.9055 13.577 13.9978 13.3542 13.9978 13.122C13.9978 12.8897 13.9055 12.6669 13.7412 12.5027L1.49554 0.256974C1.41429 0.175517 1.31776 0.110889 1.2115 0.0667934C1.10523 0.0226976 0.991309 0 0.876257 0C0.761204 0 0.647282 0.0226976 0.541015 0.0667934C0.434749 0.110889 0.338225 0.175517 0.256974 0.256974Z" fill="white"/>
        </svg>
      </div>
      <v-date-picker
          v-if="isOpenCalendar"
          v-model="datePicker"
          color="orange lighten-1"
          locale="ru-Ru"
      ></v-date-picker>
      <calculator :isOpenCalculator="isOpenCalculator" />
      <div class="lang-switch">
        <div class="lang-btn"
             v-for="(lang, index) in languages"
             :class="{ active: lang.code === currentLanguage() }"
             @click="setLocale(lang.code)"
             :key="index"
        >
          {{ lang.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calculator from "@/components/ui/calculator/Calculator";
import ClickOutside from 'vue-click-outside'
import {mapGetters} from 'vuex'
export default {
  name: "Footer",
  components: {
    Calculator
  },
  data: () => ({
    bookmarks: [],
    isOpenMenu: false,
    isOpenCalendar: false,
    isOpenCalculator: false,
    orange: '#FF9F2F',
    datePicker: new Date().toISOString().substr(0, 7),
    languages: [
      {
        code: 'ru',
        name: 'Рус',
      },
      {
        code: 'ua',
        name: 'Укр',
      },
    ]
  }),
  beforeCreate() {
    this.$store.commit('initialiseMenu')
  },
  methods: {
    setLocale(locale){
      this.$i18n.locale = locale
      console.log(this.$i18n.locale)
      localStorage.setItem('locale', this.$i18n.locale )
    },
    currentLanguage(){
      return this.$i18n.locale
    },
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu
    },
    toggleCalendar() {
      this.isOpenCalculator = false
      this.isOpenCalendar = !this.isOpenCalendar
    },
    toggleCalculator() {
      this.isOpenCalendar = false
      this.isOpenCalculator = !this.isOpenCalculator
    },
    hide () {
      this.isOpenMenu = false
    },
    updateSelectedBookmarks(link) {
      link.bookmark = !link.bookmark
      this.$store.dispatch('updateBookmarks', [this.bookmarks, link])
    },
  },
  computed: {
    ...mapGetters([
      'menu',
      'selectedBookmarks'
    ]),
  },
  mounted() {
   this.bookmarks = this.selectedBookmarks
  },

  directives: {
    ClickOutside
  }

}
</script>

<style scoped>

</style>