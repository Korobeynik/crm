<template>
  <div class="item-container" :class="{hide: !visible }">
    <DraggableTree :data="categories" draggable="draggable">
      <div class="item" @contextmenu.prevent="$refs.menu.open($event, { data, categories })" slot-scope="{data, store}" @click="store.toggleOpen(data)">
        <input type="checkbox" >
        <template v-if="!data.isDragPlaceHolder">
          <svg :class="{open: data.open}" v-if="data.children &amp;&amp; data.children.length" class="icon"  width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.31216 4.86424L7.8722 1.07685C7.9546 0.989247 8 0.872312 8 0.747627C8 0.622941 7.9546 0.506006 7.8722 0.418408L7.61008 0.139492C7.43929 -0.0419999 7.1617 -0.0419999 6.99116 0.139492L4.00166 3.31986L1.00884 0.135963C0.926432 0.0483651 0.816579 -5.41291e-07 0.699441 -5.50118e-07C0.582174 -5.58954e-07 0.472322 0.0483651 0.389851 0.135963L0.127804 0.414879C0.0453982 0.502546 4.49762e-07 0.619412 4.44312e-07 0.744097C4.38861e-07 0.868782 0.0453982 0.985718 0.127804 1.07332L3.69109 4.86424C3.77376 4.95205 3.88413 5.00028 4.00146 5C4.11925 5.00028 4.22956 4.95205 4.31216 4.86424Z" fill="#5893D4"/>
          </svg>
        </template>
        <router-link
            class="item-link"
            :to="'/products/categories/' + data.id"
        >
          <span>{{data.title}}</span>
        </router-link>
      </div>
    </DraggableTree>

    <vue-context class="context-menu" ref="menu" v-slot="{ data }">
      <li class="context-menu-item">
        <div class="item-icon">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.8567 4.5725V14.8578H4.57151V4.5725H14.8567ZM14.8567 3.42969H4.57151C4.26842 3.42969 3.97775 3.55009 3.76343 3.76441C3.54911 3.97873 3.42871 4.26941 3.42871 4.5725V14.8578C3.42871 15.1609 3.54911 15.4516 3.76343 15.6659C3.97775 15.8802 4.26842 16.0006 4.57151 16.0006H14.8567C15.1598 16.0006 15.4505 15.8802 15.6648 15.6659C15.8791 15.4516 15.9995 15.1609 15.9995 14.8578V4.5725C15.9995 4.26941 15.8791 3.97873 15.6648 3.76441C15.4505 3.55009 15.1598 3.42969 14.8567 3.42969Z" fill="#F4F9FF"/>
            <path d="M1.1428 9.1425H0V1.14281C0 0.83972 0.120402 0.549041 0.334719 0.334722C0.549035 0.120403 0.839711 0 1.1428 0H9.14241V1.14281H1.1428V9.1425Z" fill="#F4F9FF"/>
          </svg>
        </div>
        <a @click.prevent="onClickCopy($event.target, data)">Копировать</a>
      </li>
      <li class="context-menu-item">
        <div class="item-icon">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.252 3.03704L10.2149 1L2.06677 9.14815L1.25195 12L4.1038 11.1852L12.252 3.03704ZM8.58529 2.62963L10.6223 4.66667L8.58529 2.62963ZM2.06677 9.14815L4.1038 11.1852L2.06677 9.14815Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <a @click.prevent="onClickEdit($event.target, data)">Редактировать</a>
      </li>
      <li class="context-menu-item">
        <div class="item-icon">
          <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.14258 3.92822H3.92829V8.64251H3.14258V3.92822Z" fill="white"/>
            <path d="M5.5 3.92822H6.28571V8.64251H5.5V3.92822Z" fill="white"/>
            <path d="M0 1.57153V2.35725H0.785714V10.2144C0.785714 10.4228 0.868495 10.6226 1.01584 10.77C1.16319 10.9173 1.36304 11.0001 1.57143 11.0001H7.85714C8.06553 11.0001 8.26538 10.9173 8.41273 10.77C8.56008 10.6226 8.64286 10.4228 8.64286 10.2144V2.35725H9.42857V1.57153H0ZM1.57143 10.2144V2.35725H7.85714V10.2144H1.57143Z" fill="white"/>
            <path d="M3.14258 0H6.28543V0.785714H3.14258V0Z" fill="white"/>
          </svg>
        </div>
        <a @click.prevent="onClickDelete($event.target, data)">Удалить</a>
      </li>
    </vue-context>

    <CategoryEdit :categories="categories" :category="category" ref="editCategory"></CategoryEdit>

  </div>
</template>

<script>

import CategoryEdit from "@/components/dashboard/categories/CategoryEdit"

export default {
  name: "categories-list",
  props: {
    search: {
      type: String
    }
  },
  components: {
    CategoryEdit
  },
  data: () => ({
    visible: true,
    category: null
  }),

  methods: {

    editCategory() {
      this.$refs.editCategory.open(this.category)
    },

    /* Methods for context menu */
    async onClickCopy(text, data) {
      console.log(text, data)
      console.log(data)
    },
    onClickEdit(text, data) {
      console.log(text, data.data)
      this.category = data.data
      this.editCategory()
    },
    onClickDelete(text, data) {
      console.log(text, data)
    },
  },

  computed: {
    categories: {
      get() {
        return this.$store.getters['categories']
      },
      set(value) {
        this.$store.dispatch("updateCategories", value)
      }
    }
  },

  mounted() {

  }
};
</script>

<style lang="sass">

.draggable-placeholder-inner
  border: 1px dashed #0088f8
  box-sizing: border-box
  background: rgba(0, 136, 249, 0.09)
  background: #c8ebfb
  color: #0088f9
  text-align: center
  padding: 0
  display: flex
  align-items: center

</style>