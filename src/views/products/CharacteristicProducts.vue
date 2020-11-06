<template>
  <div class="page characteristic-page">
    <div class="page-header">
      <div class="actions-section">
        <div class="search-block">
          <input
            type="text"
            :placeholder="$t('page.search')"
            v-model="search"
          />
          <div class="search-icon">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.685 14.3335C11.377 14.3335 14.37 11.3487 14.37 7.66674C14.37 3.9848 11.377 1 7.685 1C3.99298 1 1 3.9848 1 7.66674C1 11.3487 3.99298 14.3335 7.685 14.3335Z"
                stroke="#5893D4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.0002 16L12.3652 12.375"
                stroke="#5893D4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div class="actions-buttons">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" icon color="indigo" class="action-btn sortable-btn" @click="sortByName">
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.3 8.3L10.5 10.1V0H9.5V10.1L7.7 8.3L7 9L10 12L13 9L12.3 8.3Z" fill="#9DCCFF"/>
                  <path d="M3 0L0 3L0.7 3.7L2.5 1.9V12H3.5V1.9L5.3 3.7L6 3L3 0Z" fill="#9DCCFF"/>
                </svg>
              </v-btn>
            </template>
            <span>Сортировка по алфавиту</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="#9DCCFF" fab small class="action-btn circle-btn"
                     @click="cloneCheck()" :disabled="selectCharacteristics.length > 1 || selectCharacteristics.length === 0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.8567 4.5725V14.8578H4.57151V4.5725H14.8567ZM14.8567 3.42969H4.57151C4.26842 3.42969 3.97775 3.55009 3.76343 3.76441C3.54911 3.97873 3.42871 4.26941 3.42871 4.5725V14.8578C3.42871 15.1609 3.54911 15.4516 3.76343 15.6659C3.97775 15.8802 4.26842 16.0006 4.57151 16.0006H14.8567C15.1598 16.0006 15.4505 15.8802 15.6648 15.6659C15.8791 15.4516 15.9995 15.1609 15.9995 14.8578V4.5725C15.9995 4.26941 15.8791 3.97873 15.6648 3.76441C15.4505 3.55009 15.1598 3.42969 14.8567 3.42969Z" fill="#F4F9FF"/>
                  <path d="M1.1428 9.1425H0V1.14281C0 0.83972 0.120402 0.549041 0.334719 0.334722C0.549035 0.120403 0.839711 0 1.1428 0H9.14241V1.14281H1.1428V9.1425Z" fill="#F4F9FF"/>
                </svg>
              </v-btn>
            </template>
            <span>Копировать</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="#9DCCFF" fab small class="action-btn circle-btn" @click="removeItem" :disabled="selectCharacteristics.length === 0">
                <svg width="13" height="15" viewBox="0 0 13 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.33203 5.35742H5.41536V11.786H4.33203V5.35742Z" fill="#F4F9FF"/>
                  <path d="M7.58398 5.35742H8.66732V11.786H7.58398V5.35742Z" fill="#F4F9FF"/>
                  <path d="M0 2.14258V3.214H1.08333V13.9282C1.08333 14.2124 1.19747 14.4849 1.40063 14.6858C1.6038 14.8868 1.87935 14.9996 2.16667 14.9996H10.8333C11.1207 14.9996 11.3962 14.8868 11.5994 14.6858C11.8025 14.4849 11.9167 14.2124 11.9167 13.9282V3.214H13V2.14258H0ZM2.16667 13.9282V3.214H10.8333V13.9282H2.16667Z" fill="#F4F9FF"/>
                  <path d="M4.33203 0H8.66536V1.07142H4.33203V0Z" fill="#F4F9FF"/>
                </svg>
              </v-btn>
            </template>
            <span>Удалить</span>
          </v-tooltip>
        </div>
      </div>
      <v-btn class="orange-btn" @click="addItem()" v-if="!create && !edit">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.15408 5.80986L14 5.80986L14 8.11469L8.15408 8.11469L8.15408 14L5.84592 14L5.84592 8.11469L-2.91101e-07 8.11469L3.4186e-07 5.80986L5.84592 5.80986L5.84592 7.26747e-07L8.15408 7.90983e-07L8.15408 5.80986Z" fill="#F4F9FF"/>
        </svg>
        <span>{{ $t('page.addButton') }}</span>
      </v-btn>
    </div>
    <div class="card-grid">
      <simplebar class="card list-items" force-visible>
        <div class="check-all">
          <input
            type="checkbox"
            id="all"
            @click="selectAll"
            v-model="allSelected"
          />
          <label for="all">{{ $t("page.chooseAll") }}</label>
        </div>
        <v-skeleton-loader :loading="loading" height="404" type="sentences@10">
          <ul class="list-group fixed-list">
            <li class="list-group-item" @click="editColor(colorData)">
              <span>{{ $t("page.color") }}</span>
            </li>
            <li class="list-group-item" @click="editSize(sizeData)">
              <span>{{ $t("page.size") }}</span>
            </li>
          </ul>
          <draggable
            class="list-group"
            tag="ul"
            v-model="characteristicsList"
            v-bind="dragOptions"
            @start="drag = true"
            @end="drag = false"
          >
            <transition-group
              type="transition"
              :name="!drag ? 'flip-list' : null"
            >
              <li
                class="list-group-item"
                v-for="(element, index) in characteristicsList"
                :key="index"
                @contextmenu.prevent="
                  $refs.menu.open($event, { element, index })
                "
              >
                <input
                  type="checkbox"
                  v-model="element.check"
                  @click="checkSelectedCheckboxes"
                />
                <div @click="itemEdit(element)">
                  <span>{{ element.title }}</span>
                </div>
                <div class="sort-buttons">
                  <v-btn
                    color="#9DCCFF"
                    fab
                    small
                    class="action-btn circle-btn swap-btn"
                    @click="move(index, index - 1)"
                    :disabled="index == 0"
                  >
                    <svg
                      width="6"
                      height="12"
                      viewBox="0 0 6 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 0L0 3L0.7 3.7L2.5 1.9V12H3.5V1.9L5.3 3.7L6 3L3 0Z"
                        fill="white"
                      />
                    </svg>
                  </v-btn>
                  <v-btn
                    color="#9DCCFF"
                    fab
                    small
                    class="action-btn circle-btn swap-btn"
                    @click="move(index, index + 1)"
                    :disabled="index == characteristicsList.length - 1"
                  >
                    <svg
                      width="6"
                      height="12"
                      viewBox="0 0 6 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 12L6 9L5.3 8.3L3.5 10.1L3.5 2.18557e-07L2.5 3.0598e-07L2.5 10.1L0.699999 8.3L-2.62268e-07 9L3 12Z"
                        fill="white"
                      />
                    </svg>
                  </v-btn>
                </div>
              </li>
            </transition-group>
          </draggable>

          <vue-context class="context-menu" ref="menu" v-slot="{ data }">
            <li class="context-menu-item">
              <div class="item-icon">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.8567 4.5725V14.8578H4.57151V4.5725H14.8567ZM14.8567 3.42969H4.57151C4.26842 3.42969 3.97775 3.55009 3.76343 3.76441C3.54911 3.97873 3.42871 4.26941 3.42871 4.5725V14.8578C3.42871 15.1609 3.54911 15.4516 3.76343 15.6659C3.97775 15.8802 4.26842 16.0006 4.57151 16.0006H14.8567C15.1598 16.0006 15.4505 15.8802 15.6648 15.6659C15.8791 15.4516 15.9995 15.1609 15.9995 14.8578V4.5725C15.9995 4.26941 15.8791 3.97873 15.6648 3.76441C15.4505 3.55009 15.1598 3.42969 14.8567 3.42969Z"
                    fill="#F4F9FF"
                  />
                  <path
                    d="M1.1428 9.1425H0V1.14281C0 0.83972 0.120402 0.549041 0.334719 0.334722C0.549035 0.120403 0.839711 0 1.1428 0H9.14241V1.14281H1.1428V9.1425Z"
                    fill="#F4F9FF"
                  />
                </svg>
              </div>
              <a @click.prevent="onClickCopy($event.target, data)"
                >Копировать</a
              >
            </li>
            <li class="context-menu-item">
              <div class="item-icon">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.252 3.03704L10.2149 1L2.06677 9.14815L1.25195 12L4.1038 11.1852L12.252 3.03704ZM8.58529 2.62963L10.6223 4.66667L8.58529 2.62963ZM2.06677 9.14815L4.1038 11.1852L2.06677 9.14815Z"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <a @click.prevent="onClickEdit($event.target, data)"
                >Редактировать</a
              >
            </li>
            <li class="context-menu-item">
              <div class="item-icon">
                <svg
                  width="10"
                  height="11"
                  viewBox="0 0 10 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.14258 3.92822H3.92829V8.64251H3.14258V3.92822Z"
                    fill="white"
                  />
                  <path
                    d="M5.5 3.92822H6.28571V8.64251H5.5V3.92822Z"
                    fill="white"
                  />
                  <path
                    d="M0 1.57153V2.35725H0.785714V10.2144C0.785714 10.4228 0.868495 10.6226 1.01584 10.77C1.16319 10.9173 1.36304 11.0001 1.57143 11.0001H7.85714C8.06553 11.0001 8.26538 10.9173 8.41273 10.77C8.56008 10.6226 8.64286 10.4228 8.64286 10.2144V2.35725H9.42857V1.57153H0ZM1.57143 10.2144V2.35725H7.85714V10.2144H1.57143Z"
                    fill="white"
                  />
                  <path
                    d="M3.14258 0H6.28543V0.785714H3.14258V0Z"
                    fill="white"
                  />
                </svg>
              </div>
              <a @click.prevent="onClickDelete($event.target, data)">Удалить</a>
            </li>
          </vue-context>
        </v-skeleton-loader>
      </simplebar>
      <simplebar class="card detail-item" force-visible>
        <div @click="closeDetails" class="detail-close" v-show="create || edit">
          <svg
            width="6"
            height="12"
            viewBox="0 0 6 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.162909 6.42922L4.70779 11.3243C4.8129 11.4376 4.95323 11.5 5.10285 11.5C5.25247 11.5 5.39279 11.4376 5.49791 11.3243L5.83261 10.9639C6.0504 10.729 6.0504 10.3473 5.83261 10.1128L2.01616 6.00228L5.83684 1.88715C5.94196 1.77384 6 1.6228 6 1.46173C6 1.30049 5.94196 1.14944 5.83684 1.03604L5.50215 0.67573C5.39695 0.562422 5.25671 0.5 5.10708 0.5C4.95746 0.5 4.81714 0.562422 4.71202 0.67573L0.162909 5.57525C0.0575425 5.68892 -0.000329774 5.84068 2.08512e-06 6.00201C-0.000329813 6.16397 0.0575425 6.31564 0.162909 6.42922Z"
              fill="#5893D4"
            />
          </svg>
          <span>Назад</span>
        </div>
        <div class="select-item" v-if="!create && !edit">
          <img src="@/assets/icons/area-bg.svg" alt="" />
          <span>
            {{ $t("page.selectCharacteristic") }}
          </span>
        </div>
        <CharacteristicCreate v-if="create" :closeDetails="closeDetails" />
        <keep-alive>
          <CharacteristicEdit
            v-if="edit"
            :closeDetails="closeDetails"
            :characteristicEdit="characteristicEdit"
            :key="componentKey"
            v-click-outside="onClickOutside"
          />
        </keep-alive>
      </simplebar>
    </div>
    <Alert />
    <Dialog ref="confirm" />
    <DialogSave ref="confirmSave">
      <div class="header-text" slot="dialog-header">
        <span>Копирование</span>
      </div>
      <div class="dialog-text" slot="dialog-text" v-if="clone">
        Сохранить скопированое свойство
        <span style="font-weight: 550">{{ clone.name }}</span> ?
      </div>
    </DialogSave>
  </div>
</template>

<script>
import CharacteristicCreate from "@/components/dashboard/characteristic/CharacteristicCreate"
import CharacteristicEdit from "@/components/dashboard/characteristic/CharacteristicEdit"
import Alert from "@/components/ui/Alert"
import Dialog from "@/components/ui/dialog/DialogDelete"
import DialogSave from "@/components/ui/dialog/DialogSave"
import { eventBus } from "@/main"
import { mapGetters } from "vuex"

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
  return this;
};

export default {
  name: "Characteristics",
  components: {
    CharacteristicCreate,
    CharacteristicEdit,
    Alert,
    Dialog,
    DialogSave,
  },
  data: () => ({
    search: "",
    create: false,
    edit: false,
    drag: false,
    loading: true,
    characteristicEdit: null,
    delete: false,
    selected: [],
    allSelected: false,
    dataSelect: [],
    componentKey: 0,
    checkSave: false,
  }),
  created() {
    // eventBus.$on('delete', data => {
    //  this.delete = true
    // })
  },
  computed: {
    ...mapGetters([
      "deleteConfirm",
      "characteristics",
      "changeItem",
      "colorData",
      "sizeData",
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    selectCharacteristics() {
      if (this.characteristics) {
        return this.characteristics.filter((prop, index) => {
          if (prop.check) {
            const data = {
              element: prop,
              index: index,
            };
            this.dataSelect = data;
            console.log(this.dataSelect);
            return this.dataSelect;
          }
        });
      } else {
        return "";
      }
    },
    characteristicsList: {
      get() {
        if (this.characteristics) {
          return this.characteristics.filter((prop) =>
            prop.title.toLowerCase().includes(this.search.toLowerCase())
          )
        } else {
          return null
        }
      },
      set(value) {
        this.$store.dispatch("updateDataList", value);
      },
    },
    checkedCharacteristics() {
      if (this.properties) {
        return this.properties.filter((prop) => {
          if (!prop.check) {
            return true;
          }
        });
      } else {
        return "";
      }
    },
    clone() {
      return this.$store.getters["clone"];
    },
  },
  watch: {},
  methods: {
    move(from, to) {
      this.characteristicsList = this.characteristicsList.move(from, to);
    },

    forceRerender() {
      this.componentKey += 1;
    },

    /* The method to clone the item that was checked */
    cloneCheck() {
      let text = "";
      this.onClickCopy(text, this.dataSelect);
      this.characteristicsList.forEach((prop) => (prop.check = false));
    },

    /* Methods for context menu */
    async onClickCopy(text, data) {
      /* data -  is the element that was clicked to copy from the context menu */
      //await this.$store.dispatch('clearClone')
      await this.$store.dispatch("cloneItem", data);
      await this.itemEdit(this.$store.getters["cloneCharacteristic"]);
    },
    onClickEdit(text, data) {
      console.log(data);
      this.itemEdit(data.element);
    },
    onClickDelete(text, data) {
      console.log("Delete");
      data.element.check = true;
      this.removeItem();
    },

    /* Method for transferring data to a popup */
    openDialog() {
      eventBus.$emit("openDialog", {
        name: "property",
        names: "properties",
      });
    },

    selectAll() {
      this.characteristicsList.forEach((prop) => {
        if (!this.allSelected) {
          prop.check = true;
          this.checkSelectedCheckboxes();
          this.closeDetails();
        } else {
          prop.check = false;
          this.checkSelectedCheckboxes();
        }
      });
    },

    checkSelectedCheckboxes() {
      const selected = [];
      this.characteristicsList.forEach((prop) => {
        if (prop.check) {
          selected.push(prop);
        }
      });
      this.selected = selected;
    },

    async removeItem(index) {
      console.log(index);
      this.checkSelectedCheckboxes();
      if (
        await this.$refs.confirm.open("Delete", "Are you sure?", {
          name:
            this.selected.length > 1
              ? "выбраные характеристики"
              : `свойство  ${this.selected[0].name}`,
          nameLength:
            this.selected.length > 1
              ? "выбраные характеристики"
              : `свойство  ${this.selected[0].name}`,
        })
      ) {
        console.log("YES DELETE");
        await this.$store.dispatch("removeItem", index);
        this.allSelected = false;
        this.closeDetails();
      } else {
        console.log("NO DELETE");
        this.characteristicsList.forEach((prop) => {
          prop.check = false;
        });
      }
    },

    onClickOutside() {
      console.log("onClickOutside");
    },

    async saveConfirm() {
      this.checkSelectedCheckboxes();
      if (await this.$refs.confirmSave.open("Save", "Are you sure?")) {
        console.log("YES SAVE");
        await this.$store.dispatch("updateItem", this.$store.getters["clone"]);
        await this.$store.dispatch("clearClone");
        this.allSelected = false;
      } else {
        await this.$store.dispatch("clearClone");
        this.closeDetails();
        console.log("NO SAVE");
      }
    },

    sortByName() {
      this.$store.dispatch("sortList");
    },

    sort() {
      this.characteristicsList = this.characteristicsList.sort(
        (a, b) => a.order - b.order
      );
    },

    editColor(item) {
      this.closeDetails()
      this.edit = true;
      this.characteristicEdit = item;
      this.forceRerender();
    },

    editSize(item) {
      this.closeDetails()
      this.edit = true;
      this.characteristicEdit = item;
      this.forceRerender();
    },

    itemEdit(item) {
      this.closeDetails()
      console.log(item);
      //this.$store.dispatch('clearClone')
      this.edit = true;
      this.characteristicEdit = item;
      this.forceRerender();
    },
    addItem() {
      this.create = true;
    },
    closeDetails() {
      this.create = false;
      this.edit = false;
    },
  },
  beforeDestroy() {
    if (this.$store.getters["clone"]) {
      this.saveConfirm();
    }
  },
  async mounted() {
    await this.$store.dispatch("fetchData");
    this.loading = false;
  },

  deactivated() {
    console.log("About has been deactivated");
  },
};
</script>

<style lang="sass" scoped>


</style>