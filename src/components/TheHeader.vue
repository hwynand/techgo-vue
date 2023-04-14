<template>
  <div class="header-fixed">
    <div class="body-header">
      <div class="header">
        <div class="header-left">
          <router-link to="/">
            <h3>TechGo Shop</h3>
          </router-link>
        </div>
        <!-- ---------------------------search------------------------------------- -->

        <div class="header-center">
          <div class="Search" v-click-outside="onClickOutsideSearch">
            <input type="text" placeholder="Tìm kiếm sản phẩm..." v-model="searchProduct" @keyup.enter="onSearch()"
              @click="onClickSearch()" @input="searchText($event)">
            <div class="header-center-button">
              <button @click="onSearch()"><i class="fa-sharp fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div v-if="showSearches" class="header-search">
              <p>Gợi ý cho bạn: {{ searchProduct }}</p>
              <ul>
                <li v-for="(searchItems, i) in searchItems" :key="i">{{ searchItems }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ---------------------------------------------------------------- -->
        <div class="header-right">
          <div class="header-right-address">
            <button class="header-right-address-btn">
              <span style="position: absolute; top: 15%; left: 8px;">
                <!-- <i class="fa-sharp fa-solid fa-map-pin"></i> -->
                <i class="fa-solid fa-map-pin"></i>
              </span>
              <div class="container">
                <div class="header-right-address-Ripple">
                  <span style="--i:1 "></span>
                  <span style="--i:2 "></span>
                  <span style="--i:3 "></span>
                </div>
              </div>
              <span class="header-right-address-span">
                <span>Địa chỉ cửa hàng</span>
                <span class="header-adress">Roman-Tố hữu-Nam Từ Liêm-Hà Nội</span>
              </span>
              <div class="header-right-address-hover">
                <p>Tầng 25,Toà B2 - Roman -Tố hữu - Nam Từ Liêm - Hà Nội</p>
              </div>
            </button>
          </div>
          <div class="header-right-account" v-if="!auth.isLoggedIn">
            <button class="header-right-account-btn">
              <span><i class="fa-regular fa-circle-user"></i></span>
              <span class="header-right-span">
                <span><router-link to="/dang-nhap">Đăng nhập / Đăng ký</router-link></span>
              </span>
            </button>
          </div>
          <!-- ------------------------------show khi user đã đăng nhập---------------------------------- -->
          <div class="header-right-account" v-else>
            <div v-click-outside="outsideLogOut">
              <button class="header-right-account-btn user-login" @click="showLogOut()">
                <span><i class="fa-regular fa-circle-user"></i></span>
                <span class="header-right-span user-span">
                  <span>
                    Tài khoản của
                    <p class="text-user">{{ auth.user.firstname }} {{ auth.user.lastname }}
                      <span>
                        <i class="fa-solid fa-chevron-down "></i>
                      </span>
                    </p>
                  </span>
                </span>
              </button>
            </div>
            <div class=" log-out" v-if="isShowLogOut">
              <ul>
                <router-link to="/thong-tin">
                  <li>Thông tin tài khoản</li>
                </router-link>
                <li @click="handleLogOut()">
                  Đăng xuất
                </li>
              </ul>
            </div>
          </div>
          <div class="header-right-cart">
            <router-link to="/gio-hang">
              <button class="header-right-cart-btn">
                <span><i class="fa-solid fa-cart-shopping"></i></span>
                <span class="header-right-span">
                  <span>Giỏ hàng</span>
                  <span class="coutCart">{{ count }}</span>
                </span>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------------------------------- -->
    <div class="home-content">
      <div class="content-left" v-click-outside="onClickOutside">
        <v-btn @click="showLists">
          <span><i class="fa-solid fa-list-ul"></i></span>
          <span style="margin-left:6px">Danh sách sản phẩm</span>
        </v-btn>
        <div class="content-list">
          <div>
            <ul v-if="showList" class="content-left-items ">
              <li class="items-techgo-hover" @click="handleClickTechGo">
                <a>TechGo </a>
                <span><i class="fa-solid fa-angle-right"></i></span>
              </li>
              <li @click="handleListElectric">
                <a>Điện máy - Điện gia dụng </a>
                <span><i class="fa-solid fa-angle-right"></i></span>
              </li>
              <li @click="handleListMacbook">
                <a>Laptop Macbook </a>
                <span><i class="fa-solid fa-angle-right"></i></span>
              </li>
              <ul v-for="(items, index) in allCategory" :key="index" @click="filterCategoty(items.id)">
                <li class="items-plus" v-if="index < limit_by">
                  {{ items.name }}
                </li>
              </ul>
              <li class="show-more-less" @click="simple_toggle(default_limit, items.length)">{{
                limit_by === 9 ? '+ Hiện Thêm' : '- Ẩn Bớt' }}</li>
            </ul>
          </div>
          <!-- -------------------------ListTechgo--------------------------------------- -->
          <div v-if="isShowHomeList" class="content-home-list">
            <ListTechgo :item_title="item_title"></ListTechgo>
          </div>

          <!-- ---------------------------ListElectric------------------------------------- -->
          <div v-if="isShowListElectric" class="content-home-list">
            <ListElectric :listElectric="listElectric"></ListElectric>
          </div>

          <!-- ---------------------------ListMacbook------------------------------------- -->
          <div v-if="isShowListMacbook" class="content-home-list">
            <ListMacbook :listMacbook="listMacbook"></ListMacbook>
          </div>
        </div>
      </div>
      <div class="content-center">
        <ul class="content-center-ul">
          <li class="content-center-li">
            <div class="content-center-img">
              <img src="https://theme.hstatic.net/200000516791/1000880762/14/header_03_policy_1_ico.png?v=2257" alt="">
            </div>
            <div class="content-center-text">Đảm bảo chất lượng</div>
          </li>
          <li class="content-center-li">
            <div class="content-center-img">
              <img src="https://theme.hstatic.net/200000516791/1000880762/14/header_03_policy_2_ico.png?v=2257" alt="">
            </div>
            <div class="content-center-text" @click="click()">Miễn phí vận chuyển</div>
          </li>
          <li class="content-center-li">
            <div class="content-center-img">
              <img src="https://theme.hstatic.net/200000516791/1000880762/14/header_03_policy_3_ico.png?v=2257" alt="">
            </div>
            <div class="content-center-text">Mở hộp kiểm tra nhận hàng</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

import { items, item_title, listElectric, listMacbook } from '../share/Data.js';
import ListTechgo from './TheHeaderListTechgo.vue';
import ListElectric from './TheHeaderListElectric.vue';
import ListMacbook from './TheHeaderListMacbook.vue';

export default {
  components: {
    ListTechgo,
    ListElectric,
    ListMacbook,
  },

  data() {
    return {
      showSearches: false,
      searchItems: ['điện thoại', 'pc-máy tính đồng bộ', 'laptop & macbook', 'đồng hồ thông minh', 'linh kiện máy tính'],
      showUser: false,
      searchProduct: '',

      showList: false,
      isShowHomeList: false,
      isShowListElectric: false,
      isShowListMacbook: false,
      items: items,
      item_title: item_title,
      listElectric: listElectric,
      listMacbook: listMacbook,
      default_limit: 9,
      limit_by: 9,
      isShowLogOut: false,
    }
  },
  methods: {
    ...mapActions(useUsersStore, ['logout']),

    ...mapActions(useProductsStore, [
      'getProducts',
      'getCategorys',
    ]),

    ...mapActions(useCartStore, [
      'getCarts'
    ]),

    async onSearch() {
      console.log('search', this.params)
      let checkRoute = this.$route.path
      if (checkRoute !== '/danh-sach-san-pham/:type') {
        this.$router.push({ path: '/danh-sach-san-pham/:type' })
        this.params.keyword = this.searchProduct
        await this.getProducts(this.params)
        this.showSearches = false
      } else {
        this.params.keyword = this.searchProduct
        await this.getProducts(this.params)
        this.showSearches = false
      }
    },

    async searchText(event) {
      let value = event.target.value
      let checkRoute = this.$route.path
      if (value === '' && checkRoute === '/danh-sach-san-pham/:type') {
        this.onSearch()
        this.showSearches = false
      } else if (value != '' && checkRoute === '/danh-sach-san-pham/:type') {
        this.onSearch()
      }
      // console.log('event: ', event.target.value);
    },

    onClickSearch() {
      this.showSearches = !this.showSearches;
    },

    onClickOutsideSearch() {
      this.showSearches = false;
    },

    reload() {
      location.reload();
    },

    handleLogOut() {
      this.logout()
      this.reload()
      // this.$router.push({ path: '/' })
    },

    onClickOutside() {
      this.showList = false;
      this.isShowHomeList = false;
      this.isShowListElectric = false;
      this.isShowListMacbook = false;
    },

    showLists() {
      this.showList = !this.showList;
      this.isShowHomeList = false;
      this.isShowListElectric = false;
      this.isShowListMacbook = false;
    },

    handleClickTechGo() {
      this.isShowHomeList = !this.isShowHomeList;
      this.isShowListElectric = false;
      this.isShowListMacbook = false;
    },

    handleListElectric() {
      this.isShowListElectric = !this.isShowListElectric;
      this.isShowHomeList = false;
      this.isShowListMacbook = false;
    },

    handleListMacbook() {
      this.isShowListMacbook = !this.isShowListMacbook;
      this.isShowHomeList = false;
      this.isShowListElectric = false;
    },

    showMinus() {
      this.isShow = !this.isShow;
    },

    showPlus() {
      this.isShow = !this.isShow;
    },

    simple_toggle(default_limit, items) {
      this.limit_by = (this.limit_by === default_limit) ? items : default_limit;
    },

    showLogOut() {
      this.isShowLogOut = !this.isShowLogOut;
    },

    outsideLogOut() {
      this.isShowLogOut = false;
    },

    filterCategoty(id) {
      this.params.category_id = id
      this.getProducts(this.params)
      this.$router.push({ path: '/danh-sach-san-pham/:type' })
    },

  },

  computed: {
    ...mapState(useUsersStore, [
      'auth',
    ]),
    ...mapState(useProductsStore, [
      'params',
      'allCategory',
    ]),
    ...mapState(useCartStore, [
      'allCart',
      'count'
    ]),

  },

  async created() {
    // console.log('auth', this.auth.user);
    // console.log('count', this.count);
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const userData = localStorage.getItem('user')
      if (isLoggedIn && userData) {
        await this.getCarts()
      }

      await this.getCategorys()

    } catch (error) {
      console.log(error);
    }

    console.log('created');
  },

}
</script>

<style scoped>
.body-header {
  background-color: #2c3e50;
}

.header {
  display: flex;
  color: white;
  width: 100%;
}

.header-search {
  background-color: white;
  color: black;
  position: absolute;
  top: 104%;
  width: 90%;
  margin-bottom: 16px;
  z-index: 11;
  border-radius: 12px;
}

.header-search p {
  padding: 8px 24px;
  font-size: 0.9rem;
  color: #767575fb;
}

.header-search li {
  list-style: none;
  text-transform: capitalize;
  padding: 6px 32px;
  font-size: 0.9rem;
}

.header-left {
  width: 20%;
  display: flex;
  align-items: center;
  padding-left: 56px;

}

.header-left h3 {
  width: 100%;
  font-size: 1.2rem;
  padding-top: 8px;
  /* text-align: center; */
}

.header-left h3:hover {
  cursor: pointer;
  transition: color 300ms ease;
  color: #95afc0;
}

/* --------  */
.header-center {
  width: 44%;
  position: relative;
}

.header-center input {
  background-color: white;
  padding: 2px 12px;
  color: black;
  width: 90%;
  outline: none;
  border-radius: 10px;
}

.header-center input:focus {
  outline: 1px solid #f1c40f;
  /* border: 1px solid #f1c40f; */
}

.header-center-button {
  position: absolute;
  right: 10%;
  bottom: 0;
  color: white;
  background-color: #f39c12;
  padding: 2px 8px;
  border-radius: 30%;
}

.header-center-button button {
  background-color: transparent;
  border: none;
}

/* --------  */
.header-right {
  display: flex;
  width: 36%;
  align-items: center;
  font-size: 13px;
}


.header-right-address {
  display: flex;
  width: 39.3%;
}

.header-right-account {
  width: 33.3%;
}

.header-right-cart {
  width: 27.3%;
}

.header-right-address-span {
  margin-left: 30px;
  display: flex;
  flex-wrap: wrap;
}

.header-right-address-btn {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  color: white;
  border: none;
}

.header-right-address-btn:hover .header-right-address-hover {
  display: block;
}

.header-right-span {
  margin-left: 8px;

}

.header-right-address,
.header-right-account,
.header-right-cart {
  border-left: 1px solid #ccc;
  padding: 6px 14px;
}

.header-right-cart-btn {
  position: relative;
  background: transparent;
  color: white;
  border: none;
}

.coutCart {
  border-radius: 50%;
  background-color: red;
  width: 16px;
  height: 16px;
  position: absolute;
  bottom: 60%;
  right: 50px;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-adress {
  width: 156px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 12px;
}

.fa-solid {
  font-size: 15px;
}

.fa-regular {
  font-size: 0.9rem;
}

.Search {
  margin-top: 13px;
  position: relative;
}

.header-right-address-hover {
  position: absolute;
  background-color: #243346e5;
  top: 121%;
  display: flex;
  width: 217px;
  left: -8%;
  display: none;
  z-index: 1;
}

.header-right-address-hover p {
  padding: 6px;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container .header-right-address-Ripple {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4px;
  left: 25.3px;
}

.container .header-right-address-Ripple span {
  position: absolute;
  border-radius: 50%;
  animation: animate 1s linear infinite;
  transform: rotateX(55deg);
  animation-delay: calc(0.5s * var(--i));
  box-shadow: 0 1px 5px #ffffff
}


a {
  text-decoration: none;
  color: white;
}

@keyframes animate {
  0% {
    width: 0;
    height: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    width: 30px;
    height: 30px;
  }
}

.user-login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-login .fa-regular {
  font-size: 1.5rem;
}

.user-span {
  margin-left: 16px;
}

.text-user {
  text-align: start;
}

.fa-chevron-down {
  margin-left: 6px;
}

.log-out {
  position: absolute;
  right: 10%;
  top: 62%;
  width: 11.5%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: #2c3e50;
  background: white;
}

.log-out li {
  list-style: none;
  padding: 8px;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.log-out li:hover {
  background-color: #2c3e50;
  color: white;
  transition: 0.3s;
}

.log-out a {
  color: #2c3e50;
}

.log-out a:hover {
  color: white;
}

/* .header-right-account:hover .log-out {
  display: inline-block;
} */

.header-right-account-btn {
  background-color: transparent;
  color: white;
  border: none;
}

.home-content {
  padding: 0 56px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
}

.content-left {
  position: relative;
}

.content-left-items {
  position: absolute;
  list-style: none;
  left: 0;
  border: 1px solid #ccc;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 4px 4px 2px rgb(60 64 67 / 15%);
  border-radius: 4px;
  background-color: white;
  z-index: 2;
}

.content-left-items li:hover {
  background-color: #f3f5fc;
  color: black;
  cursor: pointer;
  border-left: 3px solid #ffc048;
  transition: 0.1s linear;
}

.content-left-items li a:hover {
  color: black;
  transition: 0.3s linear;
}

.content-left-items li {
  padding: 6px 16px;
  width: 230px;
  font-size: 14px;
  color: #3d3d3d;
  text-transform: capitalize;
}

.content-left-items li a {
  text-decoration: none;
  color: #3d3d3d;
}

.content-left-items li i {
  margin-left: 4px;
}

.content-left-items {
  position: absolute;
  list-style: none;
  left: 0;
  border: 1px solid #ccc;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%), 0 4px 4px 2px rgb(60 64 67 / 15%);
  border-radius: 4px;
  background-color: white;
  height: auto;
  z-index: 1;

}

.content-left-items li a:hover {
  color: black;
  transition: 0.3s linear;
}

.content-left-items li a {
  text-decoration: none;
  color: #3d3d3d;
}

.content-left-items li i {
  margin-left: 4px;
}

.content-home-list {
  position: absolute;
  background-color: white;
  left: 100%;
  border-radius: 8px;
  height: 563px;
  top: 103%;
  display: block;
  z-index: 1;
}

.content-center {
  display: flex;
}

.content-center-li {
  display: flex;
  text-align: center;
  font-size: 0.8em;
  z-index: 10;
}

.content-center-li img {
  width: 90%;
  margin-top: 6px;
  margin-left: 42px;
}

.content-center-img {
  width: 10%;
}

.content-center-text {
  padding: 6px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-center-ul {
  display: flex;
}

.content-center-ul {
  display: flex;
}

.content-center-li {
  display: flex;
  text-align: center;
  font-size: 0.8em;
}

.content-center-li img {
  width: 90%;
  margin-top: 6px;
  margin-left: 42px;
}

.content-center-img {
  width: 10%;
}

.content-center-text {
  padding: 6px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.show-more-less {
  margin-bottom: 6px;
  border-bottom-left-radius: 6px;
}

.items-plus {
  list-style: none;
}

.header-fixed {
  position: fixed;
  width: 100%;
  z-index: 2;
}
</style>