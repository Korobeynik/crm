<template>
  <div>
    <div class="drawer-top">
      <router-link to="/" class="logo">
        <img alt="crm" src="@/assets/img/logo.svg">
      </router-link>
      <div class="organization">CRM TEST</div>
    </div>

    <ul class="main-nav">
      <router-link tag="li" class="nav-item" active-class="active" to="/products">
        <a>
          <span class="nav-icon">
          <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0L0 6.70833L1.63 7.92542L9 13.4167L16.36 7.92542L18 6.70833L9 0ZM16.37 10.2829L9 15.7837L1.62 10.2925L0 11.5L9 18.2083L18 11.5L16.37 10.2829ZM16.37 15.0746L9 20.5754L1.62 15.0842L0 16.2917L9 23L18 16.2917L16.37 15.0746Z" fill="white"/>
          </svg>
        </span>
          <span>Товары</span>
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.83709 5.07078L1.29221 0.175731C1.1871 0.0624225 1.04677 1.83024e-07 0.897152 1.56863e-07C0.74753 1.30702e-07 0.607207 0.0624224 0.50209 0.17573L0.167391 0.536134C-0.0504 0.770977 -0.0504001 1.15267 0.167391 1.38715L3.98383 5.49772L0.163154 9.61285C0.0580368 9.72616 -2.03951e-06 9.8772 -2.07277e-06 10.0383C-2.10607e-06 10.1995 0.0580367 10.3506 0.163154 10.464L0.497853 10.8243C0.603053 10.9376 0.743293 11 0.892915 11C1.04254 11 1.18286 10.9376 1.28798 10.8243L5.83709 5.92475C5.94246 5.81108 6.00033 5.65932 6 5.49799C6.00033 5.33603 5.94246 5.18436 5.83709 5.07078Z" fill="white"/>
          </svg>
        </a>
        <ul class="sub-nav">
          <router-link
              tag="li"
              class="nav-item"
              active-class="active"
              v-for="link in menu.products"
              :key="link.url"
              :to="link.url"
          >
            <a href="/">
              <span class="nav-icon" v-html="link.icon">
              {{link.icon}}
            </span>
              <span>{{ link.title }}</span>
            </a>
          </router-link>
        </ul>
      </router-link>
    </ul>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "Sidebar",
  data: () => ({

  }),

  computed: {
    ...mapGetters([
        'menu'
    ]),

  },

  mounted() {

  }
}
</script>

<style scoped>

</style>