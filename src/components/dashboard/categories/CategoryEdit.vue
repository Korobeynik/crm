<template>
  <div class="dialog-wrap">
    <v-dialog
        v-model="dialogCreateCategory"
        max-width="1230px"
        class="dialog-large dialog-category"
    >
      <div class="dialog">
        <div class="dialog-header">
          <div class="header-text">
            <span>Редактирование категории</span>
          </div>
          <div class="progress progress-category">
            <v-tooltip content-class="category-tooltip" bottom>
              <template v-slot:activator="{ on, attrs }">
                <div class="progress-item" v-bind="attrs" v-on="on">
                  <div class="progress-number">40%</div>
                  <v-progress-linear value="40"></v-progress-linear>
                </div>
              </template>
              <span>Идентификатор Успешности заполнения карточки Категории</span>
            </v-tooltip>
            <v-tooltip  content-class="category-tooltip" bottom>
              <template v-slot:activator="{ on, attrs }">
                <div class="progress-item" v-bind="attrs" v-on="on">
                  <div class="progress-number">40%</div>
                  <v-progress-linear value="40"></v-progress-linear>
                </div>
              </template>
              <span>Идентификатор Заполненности карточки Категории</span>
            </v-tooltip>
          </div>
          <div class="dialog-header-actions">
            <div class="alert-save">Изменения сохранены</div>
            <v-btn icon color="#5893D4">
              <svg class="attach" width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.19206 0L15 4.76753L14.0841 6.44527L12.0646 6.33063L9.77483 10.525L10.7434 14.4718L9.36953 16.9884L5.46556 14.6047L3.63377 17.9601L1.47914 20L2.07218 17.0066L3.90397 13.6512L0 11.2674L1.37384 8.7508L5.09007 7.66445L7.3798 3.47011L6.27616 1.67774L7.19206 0Z" fill="#BBDBFE"/>
              </svg>
            </v-btn>
            <v-btn icon color="#5893D4" class="action-btn sortable-btn" @click="close()">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.98235 5.7228L13.7052 0L15.9614 2.25629L10.2386 7.97909L16 13.7405L13.7405 16L7.97909 10.2386L2.25629 15.9614L0 13.7052L5.7228 7.98235L0.0353056 2.29485L2.29485 0.0353032L7.98235 5.7228Z" fill="#BBDBFE"/>
              </svg>
            </v-btn>
          </div>
        </div>
        <div class="dialog-content dialog-content-large">
          <form class="item-form">
            <v-row>
              <v-col cols="6">
                <div class="category-header">
                  <div class="category-photo">
                    <img v-if="image" :src="image" alt="">
                    <span v-else>Загрузите фото</span>
                  </div>
                  <div class="item-name">
                    <div class="label-title">Название</div>
                    <input type="text" placeholder="Введите название категории" v-model="categoryName">
                  </div>
                </div>
                <div class="item nested-category">
                  <div class="label-title">
                    <span>добавить Вложенную категорию</span>
                    <svg @click="showTooltip = !showTooltip" class="info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.35569 9.59822V9.23702C7.35569 8.82315 7.43002 8.47888 7.57869 8.20422C7.72735 7.92955 7.98751 7.64549 8.35917 7.35201C8.80145 6.99834 9.08577 6.72368 9.21214 6.52803C9.34222 6.33238 9.40726 6.0991 9.40726 5.8282C9.40726 5.51215 9.30319 5.26947 9.09506 5.10016C8.88693 4.93085 8.58775 4.84619 8.1975 4.84619C7.84442 4.84619 7.51736 4.89699 7.21632 4.99857C6.91527 5.10016 6.62166 5.22244 6.33548 5.36542L5.86719 4.37212C6.62166 3.94696 7.43002 3.73438 8.29227 3.73438C9.02073 3.73438 9.59866 3.91497 10.0261 4.27617C10.4535 4.63737 10.6672 5.1359 10.6672 5.77176C10.6672 6.05395 10.6263 6.30604 10.5445 6.52803C10.4628 6.74625 10.3383 6.95507 10.171 7.15448C10.0075 7.35389 9.72317 7.61351 9.31806 7.93332C8.97241 8.20798 8.74013 8.43561 8.62119 8.61621C8.50598 8.79681 8.44837 9.03949 8.44837 9.34425V9.59822H7.35569ZM7.12712 11.3986C7.12712 10.8304 7.40029 10.5464 7.94663 10.5464C8.21423 10.5464 8.41864 10.6216 8.55987 10.7721C8.7011 10.9189 8.77172 11.1277 8.77172 11.3986C8.77172 11.6657 8.69924 11.8783 8.5543 12.0363C8.41306 12.1906 8.21051 12.2677 7.94663 12.2677C7.68275 12.2677 7.4802 12.1925 7.33896 12.042C7.19773 11.8877 7.12712 11.6732 7.12712 11.3986Z" fill="#BBDBFE"/>
                      <circle cx="8" cy="8" r="7.5" stroke="#BBDBFE"/>
                    </svg>
                    <v-tooltip right v-model="showTooltip" content-class="category-tooltip category-tooltip-info">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            icon
                            v-bind="attrs"
                            v-on="on"
                            class="hide"
                        >
                          <v-icon color="grey lighten-1">
                            mdi-cart
                          </v-icon>
                        </v-btn>
                      </template>
                      <span>
                      - Вложенная категория включает в себя все Свойства и Характеристики Основной категории <br>
                      - Вложенною Категорию можно редактировать соответственно наличия перечня Свойств Характеристик, путем исключения и добавления следующих; <br>
                      - Добавленные Новые Свойства и Характеристики во Вложенной Категории автоматически отображаются в  Основной Категории (и Других Категориях в структуре, группой выше);<br>
                      - Исключенные Свойства и Характеристики Вложенной Категории НЕ Исключаются из Основной Категории (и Других Категорий из структуры группой выше) <br>
                      </span>
                    </v-tooltip>
                  </div>
                  <div class="input-wrap">
                    <input
                        @focus="showCategories"
                        v-model="childCategoryTitle"
                        type="text" placeholder="Выберите из существующих или введите название новой категории">
                    <v-btn class="open-drop-down" icon @click="showCategories">
                      <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.92922 5.83709L10.8243 1.29221C10.9376 1.1871 11 1.04677 11 0.897152C11 0.74753 10.9376 0.607207 10.8243 0.50209L10.4639 0.167391C10.229 -0.0503999 9.84733 -0.0503999 9.61285 0.167391L5.50228 3.98384L1.38715 0.163156C1.27384 0.0580381 1.1228 -7.44275e-07 0.961732 -7.56412e-07C0.800489 -7.68562e-07 0.649442 0.058038 0.536044 0.163155L0.17573 0.497854C0.0624218 0.603055 -3.24905e-08 0.743294 -3.90307e-08 0.892917C-4.55708e-08 1.04254 0.0624217 1.18286 0.17573 1.28798L5.07525 5.83709C5.18892 5.94246 5.34068 6.00033 5.50201 6C5.66397 6.00033 5.81564 5.94246 5.92922 5.83709Z" fill="#9DCCFF"/>
                      </svg>
                    </v-btn>
                    <v-btn @click="createChildCategory()" icon class="create-nested-category">
                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.5 15C29.5 23.0081 23.0081 29.5 15 29.5C6.99187 29.5 0.500003 23.0081 0.500003 15C0.500004 6.99187 6.99188 0.499998 15 0.499999C23.0081 0.499999 29.5 6.99187 29.5 15Z" stroke="#9DCCFF"/>
                        <path d="M16.1027 13.8732L20 13.8732L20 16.0765L16.1027 16.0765L16.1027 20L13.8973 20L13.8973 16.0765L10 16.0765L10 13.8732L13.8973 13.8732L13.8973 10L16.1027 10L16.1027 13.8732Z" fill="#9DCCFF"/>
                      </svg>
                    </v-btn>
                    <div class="drop-down drop-down-categories" v-if="showDropDown && !this.childCategoryTitle.length">
                      <v-treeview
                          open-all
                          activatable
                          item-text="title"
                          selection-type="independent"
                          :items="items"
                          item-disabled="disabled"
                      >
                        <template slot="label" slot-scope="{item}">
                          <div item-disabled="{item.id == 1}" @click="selectCategory(item)">{{ item.title }}</div>
                        </template>
                      </v-treeview>
                    </div>
                  </div>
                </div>
                <div class="values-list">
                  <div class="value-item" v-for="(item, i) in children" :key="item.id">
                    <span>{{item.title}}</span>
                    <svg @click="deleteChildCategory(i)" data-v-51d92aa0="" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="close"><path data-v-51d92aa0="" d="M5.98676 4.7921L10.2789 0.5L11.9711 2.19222L7.67898 6.48432L12 10.8053L10.3053 12.5L5.98432 8.17898L1.69222 12.4711L0 10.7789L4.2921 6.48676L0.0264792 2.22114L1.72114 0.526477L5.98676 4.7921Z" fill="#BBDBFE"></path></svg>
                  </div>
                </div>
                <div class="item">
                  <div class="label-title">Добавить характеристики товаров</div>
                  <div class="search-list">
                    <div class="search-block">
                      <input type="text" :placeholder="$t('page.search')" v-model="searchCharacteristic">
                      <div class="search-icon">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.685 14.3335C11.377 14.3335 14.37 11.3487 14.37 7.66674C14.37 3.9848 11.377 1 7.685 1C3.99298 1 1 3.9848 1 7.66674C1 11.3487 3.99298 14.3335 7.685 14.3335Z" stroke="#5893D4" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16.0002 16L12.3652 12.375" stroke="#5893D4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <v-btn icon class="add-new" color="#5893D4" @click="openCharacteristic">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 3.18607e-06 23.2843 4.76346e-06 15C6.34085e-06 6.71573 6.71574 -9.34605e-07 15 -6.02084e-07C23.2843 -2.69562e-07 30 6.71573 30 15Z" fill="#5893D4"/>
                          <path d="M16.1027 13.8732L20 13.8732L20 16.0765L16.1027 16.0765L16.1027 20L13.8973 20L13.8973 16.0765L10 16.0765L10 13.8732L13.8973 13.8732L13.8973 10L16.1027 10L16.1027 13.8732Z" fill="#F4F9FF"/>
                        </svg>
                      </v-btn>
                    </div>
                    <simplebar class="wrap-list" force-visible>
                      <ul class="list" v-if="characteristicsList">
                        <li
                            v-for="element in characteristicsList"
                            :key="element.id"
                            :class="{selected: selectCharacteristics.find(({ id }) => id === element.id)}"
                        >
                          <span>{{ element.title }}</span>
                          <svg @click="editCharacteristic(element)" class="item-edit" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.4696 4.78307L17.6789 1L2.51626 16.1323L1 21.4286L6.30692 19.9153L21.4696 4.78307ZM14.6464 4.02646L18.437 7.80952L14.6464 4.02646ZM2.51626 16.1323L6.30692 19.9153L2.51626 16.1323Z" stroke="#BBDBFE" stroke-width="1.39565" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg class="remove-value" @click="deleteSelectCharacteristic(element.id)" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 2.49446e-06 23.2843 3.21869e-06 15C3.94292e-06 6.71573 6.71573 -2.03558e-06 15 -1.31134e-06C23.2843 -5.87108e-07 30 6.71573 30 15Z" fill="#9DCCFF"/>
                            <rect x="10" y="14" width="10" height="2" fill="white"/>
                          </svg>
                          <svg class="add-value" @click="addSelectCharacteristic(element)" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.5 15C29.5 23.0081 23.0081 29.5 15 29.5C6.99187 29.5 0.500003 23.0081 0.500003 15C0.500004 6.99187 6.99188 0.499998 15 0.499999C23.0081 0.499999 29.5 6.99187 29.5 15Z" stroke="#9DCCFF"/>
                            <path d="M16.1027 13.8732L20 13.8732L20 16.0765L16.1027 16.0765L16.1027 20L13.8973 20L13.8973 16.0765L10 16.0765L10 13.8732L13.8973 13.8732L13.8973 10L16.1027 10L16.1027 13.8732Z" fill="#9DCCFF"/>
                          </svg>
                        </li>
                      </ul>
                    </simplebar>
                  </div>
                </div>
                <div class="item">
                  <div class="label-title">Характеристики товаров</div>
                </div>
                <div class="values-list">
                  <div class="value-item" v-for="(element, index) in selectCharacteristics" :key="element.id">
                    <span>{{ element.title }}</span>
                    <svg @click="deleteChipCharacteristic(index)" data-v-51d92aa0="" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="close"><path data-v-51d92aa0="" d="M5.98676 4.7921L10.2789 0.5L11.9711 2.19222L7.67898 6.48432L12 10.8053L10.3053 12.5L5.98432 8.17898L1.69222 12.4711L0 10.7789L4.2921 6.48676L0.0264792 2.22114L1.72114 0.526477L5.98676 4.7921Z" fill="#BBDBFE"></path></svg>
                  </div>
                </div>
              </v-col>
              <v-col cols="6">
                <div class="item">
                  <div class="label-title">Единица измерения</div>
                </div>
                <div class="select-wrap">
                  <v-select content-class="units-switcher" class="select-switcher units-switcher"
                            v-model="unitSelect"
                            :items="units"
                            item-text="name"
                            item-value="name"
                            solo
                            dense
                            menu-props="units"
                  >
                  </v-select>
                </div>
                <div class="item">
                  <div class="label-title">Описание</div>
                </div>
                <simplebar force-visible>
                  <div class="wrap-textarea">
                    <textarea
                        v-model="description"
                        name="textarea"
                    ></textarea>
                  </div>
                </simplebar>
                <div class="item">
                  <div class="label-title">Добавить свойства товаров</div>
                  <div class="search-list">
                    <div class="search-block">
                      <input type="text" :placeholder="$t('page.search')" v-model="searchProperty">
                      <div class="search-icon">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.685 14.3335C11.377 14.3335 14.37 11.3487 14.37 7.66674C14.37 3.9848 11.377 1 7.685 1C3.99298 1 1 3.9848 1 7.66674C1 11.3487 3.99298 14.3335 7.685 14.3335Z" stroke="#5893D4" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M16.0002 16L12.3652 12.375" stroke="#5893D4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <v-btn icon class="add-new" color="#5893D4" @click="openProperties">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 3.18607e-06 23.2843 4.76346e-06 15C6.34085e-06 6.71573 6.71574 -9.34605e-07 15 -6.02084e-07C23.2843 -2.69562e-07 30 6.71573 30 15Z" fill="#5893D4"/>
                          <path d="M16.1027 13.8732L20 13.8732L20 16.0765L16.1027 16.0765L16.1027 20L13.8973 20L13.8973 16.0765L10 16.0765L10 13.8732L13.8973 13.8732L13.8973 10L16.1027 10L16.1027 13.8732Z" fill="#F4F9FF"/>
                        </svg>
                      </v-btn>
                    </div>
                    <simplebar class="wrap-list" force-visible>
                      <ul class="list" v-if="propertiesList">
                        <li
                            v-for="(element) in propertiesList"
                            :key="element.id"
                            :class="{selected: selectProperties.find(({ id }) => id === element.id)}"
                        >
                          <span>{{ element.title }}</span>
                          <svg @click="editProperty(element)" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.4696 4.78307L17.6789 1L2.51626 16.1323L1 21.4286L6.30692 19.9153L21.4696 4.78307ZM14.6464 4.02646L18.437 7.80952L14.6464 4.02646ZM2.51626 16.1323L6.30692 19.9153L2.51626 16.1323Z" stroke="#BBDBFE" stroke-width="1.39565" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg class="add-value" @click="addSelectProperty(element)" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29.5 15C29.5 23.0081 23.0081 29.5 15 29.5C6.99187 29.5 0.500003 23.0081 0.500003 15C0.500004 6.99187 6.99188 0.499998 15 0.499999C23.0081 0.499999 29.5 6.99187 29.5 15Z" stroke="#9DCCFF"/>
                            <path d="M16.1027 13.8732L20 13.8732L20 16.0765L16.1027 16.0765L16.1027 20L13.8973 20L13.8973 16.0765L10 16.0765L10 13.8732L13.8973 13.8732L13.8973 10L16.1027 10L16.1027 13.8732Z" fill="#9DCCFF"/>
                          </svg>
                          <svg class="remove-value" @click="deleteSelectProperty(element.id)" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 2.49446e-06 23.2843 3.21869e-06 15C3.94292e-06 6.71573 6.71573 -2.03558e-06 15 -1.31134e-06C23.2843 -5.87108e-07 30 6.71573 30 15Z" fill="#9DCCFF"/>
                            <rect x="10" y="14" width="10" height="2" fill="white"/>
                          </svg>
                        </li>
                      </ul>
                    </simplebar>
                  </div>
                </div>
                <div class="item">
                  <div class="label-title">Свойства товаров</div>
                </div>
                <div class="values-list">
                  <div class="value-item" v-for="element in selectProperties" :key="element.id">
                    <span>{{ element.title }}</span>
                    <svg @click="deleteChipProperty(index)" data-v-51d92aa0="" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" class="close"><path data-v-51d92aa0="" d="M5.98676 4.7921L10.2789 0.5L11.9711 2.19222L7.67898 6.48432L12 10.8053L10.3053 12.5L5.98432 8.17898L1.69222 12.4711L0 10.7789L4.2921 6.48676L0.0264792 2.22114L1.72114 0.526477L5.98676 4.7921Z" fill="#BBDBFE"></path></svg>
                  </div>
                </div>
              </v-col>
            </v-row>
          </form>
          <div class="dialog-actions popup-buttons">
            <v-btn
                class="popup-btn transparent-btn"
                color="#5893D4"
                text
                @click="close()"
            >
              Отменить
            </v-btn>
            <v-btn
                class="popup-btn"
                color="#5893D4"
                dark
                @click="updateCategory"
            >
              Сохранить
            </v-btn>
          </div>
        </div>
      </div>
    </v-dialog>

    <!-- Create characteristic dialog -->
    <v-dialog
        max-width="1230px"
        overlay-opacity="0.7"
        v-model="dialogCharacteristic"
        class="dialog-large update-item"
    >
      <div class="dialog-header">
        <div class="header-text">
          <span v-if="editChar">Редактирование характеристики</span>
          <span v-else>Создание характеристики</span>
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
          <span>Назад к созданию категории</span>
        </div>
        <CharacteristicEdit
            v-if="editChar"
            :characteristicEdit="characteristicEdit"
            :key="componentKey"
        ></CharacteristicEdit>
        <CharacteristicCreate v-else></CharacteristicCreate>
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
              @click.native="agree"
          >
            Сохранить и добавить
          </v-btn>
        </div>
      </div>
    </v-dialog>


    <!-- Create property dialog -->
    <v-dialog
        max-width="1230px"
        overlay-opacity="0.7"
        v-model="dialogProperty"
        class="dialog-large update-item"
    >
      <div class="dialog-header">
        <div class="header-text">
          <span>Создание свойства</span>
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
      <div class="dialog-content dialog-content-large page">
        <div class="detail-close" @click="closeProperty()">
          <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.162909 6.42922L4.70779 11.3243C4.8129 11.4376 4.95323 11.5 5.10285 11.5C5.25247 11.5 5.39279 11.4376 5.49791 11.3243L5.83261 10.9639C6.0504 10.729 6.0504 10.3473 5.83261 10.1128L2.01616 6.00228L5.83684 1.88715C5.94196 1.77384 6 1.6228 6 1.46173C6 1.30049 5.94196 1.14944 5.83684 1.03604L5.50215 0.67573C5.39695 0.562422 5.25671 0.5 5.10708 0.5C4.95746 0.5 4.81714 0.562422 4.71202 0.67573L0.162909 5.57525C0.0575425 5.68892 -0.000329774 5.84068 2.08512e-06 6.00201C-0.000329813 6.16397 0.0575425 6.31564 0.162909 6.42922Z" fill="#5893D4"/>
          </svg>
          <span>Назад к созданию категории</span>
        </div>
        <PropertyEdit
            v-if="editProp"
            :key="componentKey"
            :categoryEdit="categoryEdit"
            ref="updateProperty"
        ></PropertyEdit>
        <PropertyCreate v-else></PropertyCreate>
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
import { mapGetters } from "vuex"
import CharacteristicCreate from "@/components/dashboard/characteristic/CharacteristicCreate"
import CharacteristicEdit from "@/components/dashboard/characteristic/CharacteristicEdit"
import PropertyCreate from "@/components/dashboard/properties/PropertyCreate"
import PropertyEdit from "@/components/dashboard/properties/PropertyEdit"
export default {
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    CharacteristicCreate,
    CharacteristicEdit,
    PropertyCreate,
    PropertyEdit
  },

  data: () => ({
    editProp: false,
    editChar: false,
    dialogCreateCategory: false,
    dialogCharacteristic: false,
    characteristicEdit: null,
    categoryEdit: null,
    dialogProperty: false,
    addCharacteristic: false,
    image: '',
    searchCharacteristic: '',
    searchProperty: '',
    unitSelect: 'Шт',
    showTooltip: false,
    showDropDown: false,
    childCategoryTitle: '',
    children: [],
    invalid: false,
    itemValue: '',
    characteristicName: '',
    valueExists: false,
    values: [],
    selectProperties: [],
    selectCharacteristics: [],
    componentKey: 0,
    categoryName: '',
    description: '',
    units: [
      {name: 'Шт'},
      {name: 'Кг'},
      {name: 'М'}
    ],
  }),

  computed: {
    ...mapGetters([
      'dataCreate',
      'dataEdit',
      'IDCreatedCategory',
      'editCategory'
    ]),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    },
    items() {
      return this.getNodes(this.categories, this.children)
    },
    characteristicsList () {
      if (this.dataCreate) {
        return this.dataCreate[1].characteristics.filter((item) =>
            item.title.toLowerCase().includes(this.searchCharacteristic.toLowerCase())
        )
      }
      return false
    },
    propertiesList () {
      if (this.dataCreate) {
        return this.dataCreate[2].properties.filter((item) =>
            item.title.toLowerCase().includes(this.searchProperty.toLowerCase())
        )
      }
      return false
    }
  },
  methods: {

    forceRerender() {
      this.componentKey += 1;
    },

    /* Properties methods */
    updateProperty() {
      this.closeProperty()
      this.$refs.updateProperty.updateProperty()
    },
    addSelectProperty(element) {
      console.log(element)
      this.selectProperties.unshift(element)
    },
    deleteSelectProperty(id) {
      this.selectProperties.forEach((item, index) => {
        if (item.id === id) {
          this.selectProperties.splice(index, 1)
        }
      })
    },
    deleteChipProperty(index) {
      this.selectProperties.splice(index, 1)
    },

    async editProperty(element) {
      console.log(element)
      this.editProp = true
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

    /* Characteristic methods */
    addSelectCharacteristic(element) {
      this.selectCharacteristics.unshift(element)
    },
    deleteSelectCharacteristic(id) {
      this.selectCharacteristics.forEach((item, index) => {
        if (item.id === id) {
          this.selectCharacteristics.splice(index, 1)
        }
      })
    },
    deleteChipCharacteristic(index) {
      this.selectCharacteristics.splice(index, 1)
    },
    async editCharacteristic(element) {
      console.log(element)
      this.editChar = true
      this.edit = true
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

    openCharacteristic() {
      this.dialogCharacteristic = true
    },
    openProperties() {
      this.dialogProperty = true
    },
    createChildCategory() {
      const item = {
        children: [],
        id: Date.now(),
        title: this.childCategoryTitle
      }
      if (this.childCategoryTitle.length> 3) {
        this.children.unshift(item)
        this.childCategoryTitle = ''
        this.showDropDown = false
      }
    },
    deleteChildCategory(index) {
      this.children.splice(index, 1)
    },
    selectCategory(item) {
      console.log(item)
      if (item.disabled) {
        return
      } else {
        this.children.unshift(item)
        this.showCategories()
      }
    },
    showCategories() {
      this.showDropDown = !this.showDropDown
    },
    async open(category) {
      this.dialogCreateCategory = true
      console.log(category)
      if (category) {
        await this.fetchEditCategory(category.id)
      }
    },

    async fetchEditCategory (id) {
      await this.$store.dispatch('fetchEditCategory', id)
      console.log(this.editCategory[0].category)
      this.categoryName = this.editCategory[0].category.title
      this.description = this.editCategory[0].category.desc
      this.image = this.editCategory[0].category.image ? this.editCategory[0].category.image : null
      this.children = this.editCategory[0].category.children
      this.selectProperties = this.editCategory[0].category.properties
      this.selectCharacteristics = this.editCategory[0].category.characteristics
    },

    getNodes(items) {
      return items.map(item => {
        const disabled = this.children.find(({ id }) => id === item.id)
        return {
          id: item.id,
          title: item.title,
          disabled: Boolean(disabled),
          children: item.children ? this.getNodes(item.children) : []
        }
      })
    },

    close() {
      this.dialogCreateCategory = false
      this.$store.dispatch('clearDataEdit')
    },
    closeCharacteristic() {
      this.$store.dispatch('clearDataEdit')
      this.dialogCharacteristic = false

    },
    closeProperty() {
      this.dialogProperty = false
      this.editProp = false
    },

    async updateCategory() {
      const category = {
        id: this.editCategory[0].category.id,
        title: this.categoryName ? this.categoryName : this.childCategoryTitle,
        desc: this.description,
        image: this.image,
        characteristics: this.selectCharacteristics,
        properties: this.selectProperties,
        categories: this.children
      }
      try {
        await this.$store.dispatch('updateCategory', category)
        const dataAlert = {
          name: localStorage.getItem('locale') == 'ru' ? 'Категория' : 'Категорія',
          title: this.categoryName,
          createdName: localStorage.getItem('locale') == 'ru' ? 'обновлена' : 'оновлена',
          link: `/products/categories/${this.editCategory[0].category.id}`
        }
        this.close()
        await this.$store.dispatch('alertShow', dataAlert)
        console.log(category)
      } catch (e) {
        console.log(e)
      }
    },

    async addNewCategory() {
      const category = {
        title: this.categoryName ? this.categoryName : this.childCategoryTitle,
        desc: this.description,
        image: this.image,
        id: Date.now(),
        parent_id: 0,
        characteristics: this.selectCharacteristics,
        properties: this.selectProperties,
        categories: this.children
      }
      try {
        await this.$store.dispatch('addNewCategory', category)
        const dataAlert = {
          name: localStorage.getItem('locale') == 'ru' ? 'Категория' : 'Категорія',
          title: this.categoryName,
          createdName: localStorage.getItem('locale') == 'ru' ? 'создана' : 'створена',
          link: `/products/categories/${this.IDCreatedCategory}`
        }
        this.close()
        await this.$store.dispatch('alertShow', dataAlert)
        console.log(category)
      } catch (e) {
        console.log(e)
      }
    }

  },

  mounted() {

  }
}
</script>

<style scoped>

</style>