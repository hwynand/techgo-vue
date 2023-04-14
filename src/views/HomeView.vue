<template>
  <div class="Home">
    <!-- ------------------------- banner--------------------------------------- -->
    <div class="home-banner">
      <div class="baner-up">
        <div class="home-baner-left">
          <div class="baner-img">
            <HomeBannerImageVue v-for="(url, i) in bannerUrlsLeft" :key="i" :url="url" @click="navigationListProducts()">
            </HomeBannerImageVue>
          </div>
        </div>
        <!-- --------------------------------------------------------------->

        <div class="home-baner-center">
          <HomeSlideVue></HomeSlideVue>
        </div>
        <!-- --------------------------------------------------------------->

        <div class="home-baner-right">
          <div class="home-baner-right-img">
            <div>
              <HomeBannerImageVue v-for="(url, i) in bannerUrlsRight" :key="i" :url="url"
                @click="navigationListProducts()"></HomeBannerImageVue>
            </div>
          </div>
        </div>
      </div>
      <!-- ---------------------------baner down------------------------------------ -->
      <div class="baner-bottom">
        <div class="baner-bottom-img">
          <HomeBannerImageVue v-for="(url, i) in bannerUrlsBottom" :key="i" :url="url" @click="navigationListProducts()">
          </HomeBannerImageVue>
        </div>
      </div>

      <!-- --------------------------HIGHLIGHTS CATEGORY------------------------------------->
      <div class="highlights-category">
        <h2>Danh mục nổi bật</h2>
        <div class="category-item">
          <HomeCategoryCardVue v-for="(category, i) in allCategory" :key="i" :url="category.image"
            :categotyTitles="category.name" @click="filterCategoty(category.id)"></HomeCategoryCardVue>
        </div>
      </div>
      <!-- --------------------------------------------------------------->

      <div class="top-products">
        <div class="products-box">
          <div class="products-items">
            <h2>Top sản phẩm bán chạy</h2>
            <div class="slide-group ">
              <v-sheet class="mx-auto" elevation="8" max-width="100%">
                <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
                  <v-slide-group-item v-for="(products, i) in topSellerProducts" :key="i" v-slot="{ isSelected, toggle }">
                    <v-card class="ma-4" width="218">
                      <ProductCardVue :url="products.product_variants[0]?.images[0].image_path" :name="products.name"
                        :brand="products.brand.name" :price="products.product_variants[0]?.price" :id="products.id">
                      </ProductCardVue>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </div>
          </div>
        </div>
      </div>

      <!-- --------------------------------------------------------------- -->
      <div class="top-products-sale">
        <div class="products-box-sale">
          <div class="products-items">
            <div class="top-sale">
              <h2>Sản phẩm khuyến mại </h2>
              <div class="time-sale">
                <div class="time_products-sale">
                  <p>{{ timeDays }}</p>
                  <p class="time-sale-text">Days</p>
                </div>
                <div class="time_products-sale">
                  <p>{{ timesHours }}</p>
                  <p class="time-sale-text">Hours</p>
                </div>
                <div class="time_products-sale">
                  <p>{{ minutes }}</p>
                  <p class="time-sale-text">minutes</p>
                </div>
                <div class="time_products-sale">
                  <p>{{ seconds }}</p>
                  <p class="time-sale-text">seconds</p>
                </div>
              </div>
              <div class="container">
                <div class="header-right-address-Ripple">
                  <span style="--i:1 "></span>
                  <span style="--i:2 "></span>
                  <span style="--i:3 "></span>
                </div>
              </div>
            </div>
            <div class="slide-group slide-group-sale">
              <v-sheet class="mx-auto" elevation="8" max-width="100%">
                <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
                  <v-slide-group-item v-for="(products, i) in topSellerProducts" :key="i" v-slot="{ isSelected, toggle }">
                    <v-card class="ma-4" width="218">
                      <ProductCardVue :url="products.product_variants[0]?.images[0].image_path" :name="products.name"
                        :brand="products.brand.name" :price="products.product_variants[0]?.price" :id="products.id">
                      </ProductCardVue>
                    </v-card>
                  </v-slide-group-item>
                </v-slide-group>
              </v-sheet>
            </div>
            <div class="wrapper">
              <a href="#0" class="btn_add-cart">
                <span class="add-cards">Xem tất cả sản phẩm khuyến mãi</span>
                <span class="cart_span"><i class="fa-solid fa-angles-right"></i></span>
                <div class="transition"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- --------------------------------------------------------------- -->
      <div class="new-product">
        <h2>Bộ sưu tập mới</h2>
        <div class="box-new-product">
          <div class="new-product-left">
            <img src="https://theme.hstatic.net/200000516791/1000880762/14/home_tabs_1_banner.jpg?v=2258" alt="">
          </div>
          <div class="new-product-right">
            <div class="new-product-cart" v-for="(products, i) in newCollectionProducts" :key="i">
              <ProductCardVue :url="products.product_variants[0]?.images[0].image_path" :name="products.name"
                :brand="products.brand.name" :price="products.product_variants[0]?.price" :id="products.id">
              </ProductCardVue>
            </div>
          </div>
        </div>
      </div>

      <!-- --------------------------------------------------------------- -->

      <div class="hight-end-box">
        <h2>Sản phẩm cao cấp</h2>
        <div class="product-hight-end">
          <div class="hight-end-cart" v-for="(products, i) in highEndProducts" :key="i">
            <ProductCardVue :url="products.product_variants[0]?.images[0].image_path" :name="products.name"
              :brand="products.brand.name" :price="products.product_variants[0]?.price" :id="products.id">
            </ProductCardVue>
          </div>
        </div>
      </div>

    </div>

    <!-- ---------------------------------------------------------------- -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useProductsStore } from '@/stores/products'

import HomeBannerImageVue from '../components/HomeBannerImage.vue'
import HomeCategoryCardVue from '../components/HomeCategoryCard.vue'
import HomeSlideVue from '../components/HomeSlide.vue'
import ProductCardVue from '../components/ProductCard.vue'
import { api } from '../api'

export default {
  components: {
    HomeSlideVue,
    HomeBannerImageVue,
    HomeCategoryCardVue,
    ProductCardVue,
  },

  data() {
    return {
      bannerUrlsLeft: [
        'https://telecomtalk.info/wp-content/uploads/2022/10/cropped-Apple-iPhone-14-Pro-and-Pro-Max-differences.jpg',
        "https://bizweb.dktcdn.net/100/176/601/collections/untitled-2-1-ef3e6f0b-cc6b-4d46-bc2f-b4f01071a61b.jpg?v=1663070166100",
      ],
      bannerUrlsRight: [
        'https://theme.hstatic.net/200000516791/1000880762/14/banner_top_1_img_large.jpg?v=2257',
        'https://theme.hstatic.net/200000516791/1000880762/14/banner_top_2_img_large.jpg?v=2257',
        'https://theme.hstatic.net/200000516791/1000880762/14/banner_top_3_img_large.jpg?v=2257',
      ],
      bannerUrlsBottom: [
        "https://theme.hstatic.net/200000516791/1000880762/14/categorybanner_1_img.jpg?v=2257",
        "https://theme.hstatic.net/200000516791/1000880762/14/categorybanner_2_img.jpg?v=2257",
        "https://theme.hstatic.net/200000516791/1000880762/14/categorybanner_3_img.jpg?v=2257",
        "https://theme.hstatic.net/200000516791/1000880762/14/categorybanner_4_img.jpg?v=2257",
      ],
      model: null,
      countDownToTime: new Date("Apr 22, 2023 00:00:00").getTime(),
      timeDays: null,
      timesHours: null,
      minutes: null,
      seconds: null,
      pageProduct: 1,
      sizeProduct: 10,
      pageCategory: 0,
      sizeCategory: 20
    }
  },

  computed: {
    ...mapState(useProductsStore, [
      'allProducts', 'allCategory', 'params',
      'promotionProducts', 'topSellerProducts', 'newCollectionProducts',
      'highEndProducts',
    ]),
  },

  methods: {
    ...mapActions(useProductsStore, [
      'getProducts',
      'getPromotionProducts',
      'getTopSellerProducts',
      'getNewCollectionProducts',
      'getHighEndProducts',
      'getCategorys',
    ]),


    getAllProducts() {
      this.getPromotionProducts()
      this.getTopSellerProducts()
      this.getNewCollectionProducts()
      this.getHighEndProducts()
    },
    startTimer: function () {
      const timeNow = new Date().getTime();
      const timeDifference = this.countDownToTime - timeNow;
      const millisecondsInOneSecond = 1000;
      const millisecondsInOneMinute = millisecondsInOneSecond * 60;
      const millisecondsInOneHour = millisecondsInOneMinute * 60;
      const millisecondsInOneDay = millisecondsInOneHour * 24;
      const differenceInDays = timeDifference / millisecondsInOneDay - 1;
      const remainderDifferenceInHours = (timeDifference % millisecondsInOneDay) / millisecondsInOneHour;
      const remainderDifferenceInMinutes = (timeDifference % millisecondsInOneHour) / millisecondsInOneMinute;
      const remainderDifferenceInSeconds = (timeDifference % millisecondsInOneMinute) / millisecondsInOneSecond;
      const remainingDays = Math.floor(differenceInDays);
      const remainingHours = Math.floor(remainderDifferenceInHours);
      const remainingMinutes = Math.floor(remainderDifferenceInMinutes);
      const remainingSeconds = Math.floor(remainderDifferenceInSeconds);
      this.timeDays = remainingDays;
      this.timesHours = remainingHours;
      this.minutes = remainingMinutes;
      this.seconds = remainingSeconds;
    },

    navigationListProducts() {
      this.$router.push({ path: '/danh-sach-san-pham/:type' })
    },

    filterCategoty(id) {
      this.params.category_id = id
      this.getProducts(this.params)
      this.$router.push({ path: '/danh-sach-san-pham/:type' })
    }
  },

  async created() {
    try {
      this.params.skip = this.pageProduct
      this.params.limit = this.sizeProduct
      await this.getProducts(this.params)

      this.params.skip = this.pageCategory
      this.params.limit = this.sizeCategory
      await this.getCategorys(this.params)

      //top sản phẩm khuyến mại
      this.params.skip = this.pageProduct
      this.params.limit = this.sizeProduct
      await this.getPromotionProducts(this.params)

      // sản phẩm bán chạy
      this.params.skip = this.pageProduct
      this.params.limit = this.sizeProduct
      await this.getTopSellerProducts(this.params)

      // sản phẩm mới
      this.params.skip = this.pageProduct
      this.params.limit = this.sizeProduct
      await this.getNewCollectionProducts(this.params)

      // sản phẩm cao cấp
      this.params.skip = this.pageProduct
      this.params.limit = this.sizeProduct
      await this.getHighEndProducts(this.params)
    } catch (error) {
      console.log(error);
    }
  },
  mounted() {
    setInterval(() => { this.startTimer() }, 1000);
  }

}
</script>

<style scoped>
/* /// */
.home-header {
  position: relative;
}

.home-header-content {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
}

.home-banner {
  background-color: #ecf0f1;
}

.baner-up {
  display: flex;
}

.baner-img {
  margin-left: 50px;
  padding: 12px 6px;

}

.baner-img img {
  width: 100%;
  border-radius: 8px;
  transition: transform .2s;
  margin-bottom: 9px;
}

.baner-img img:hover {
  transform: scale(1.03);
}

.home-baner-left {
  width: 20%;
}

.home-baner-center {
  width: 55%;
}



.v-carousel__controls {
  display: none !important;
}

.v-carousel--hide-delimiter-background .v-carousel__controls {
  display: none;
}



.v-btn--icon.v-btn--density-default {
  color: white;
}

.home-baner-right {
  height: 425px;
  width: 25%;
  margin-right: 12px;
}

.home-baner-right-img {
  padding-left: 6px;
  padding-right: 18px;
  padding-top: 12px;
}

.home-baner-right-img div {
  height: 33%;
}

.home-baner-right-img img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: inline-block;
  margin-top: 0.5px;
  transition: transform 0.2s;
  margin-bottom: 7px;
}

.home-baner-right-img img:hover {
  transform: scale(1.03);
}

.baner-bottom {
  margin-left: 50px;
  padding-right: 24px;
}

.baner-bottom-img {
  width: 25%;
  display: flex;
}

.baner-bottom-img img {
  width: 100%;
  padding: 6px;
  border-radius: 20px;
  transition: transform .2s;
}

.baner-bottom-img img:hover {
  transform: scale(1.05);

}

.v-carousel--hide-delimiter-background .v-carousel__controls {
  display: none;
}

.highlights-category {
  background-color: white;
  margin-left: 55px;
  margin-right: 32px;
}

.highlights-category h2 {
  padding: 20px 16px;
  font-weight: 500;
  text-transform: capitalize;
}

.category-item {
  display: flex;
  flex-wrap: wrap;
}

.products-items {
  margin-left: 10px;
  padding: 12px;
}

.products-items h2 {
  margin-left: 41px;
  padding: 12px;
  text-transform: capitalize;
  font-weight: 600;
}

.products-box {
  margin-right: 16px;
}

/* .header-list {
  margin-top: 50px;
} */

.slide-group {
  padding-right: 4px;
  padding-left: 33px;
}

.slide-group-sale {
  padding-left: 0 !important;
}

.top-sale {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.top-sale h2 {
  text-transform: capitalize;
}

.time-sale {
  display: flex;
}

.time_products-sale {
  background-color: #fff200;
  color: #34495e;
  padding: 6px;
  text-align: center;
  margin: 0 8px;
  padding: 4px;
  width: 56px;
  border-radius: 20%;
}

.time_products-sale p {
  font-weight: 700;
}

.time-sale-text {
  font-size: 9px;
  font-weight: 500 !important;
}

:deep(.producCard-detail) {
  padding: 12px;
}


:deep(.v-carousel__controls) {
  display: none;
}

:deep(.v-window--show-arrows-on-hover:hover .v-window__left) {
  background-color: #2C3A47;
}

:deep(.v-window--show-arrows-on-hover:hover .v-window__right) {
  background-color: #2C3A47;
}



:deep(.mdi-chevron-left::before),
:deep(.mdi-chevron-right::before) {
  color: black;
  font-size: 2rem;
}

/* ::deep(.card) {
  margin-right: 0 !important;
  border-radius: none;
} */
.products-box-sale {
  background: #e55039;
  margin: 12px 32px 0 56px;
}

/* .top-products-sale .products-box-sale .products-items .slide-group .v-theme--light {
  background: #e55039;
} */

.products-box-sale .products-items h2 {
  color: #fffa65;
  font-weight: 600;
  margin: 0;
  padding: 12px 0;
  width: 46%;
}

:deep(.top-products-sale .products-box-sale .products-items .slide-group .v-theme--light .v-slide-group .v-slide-group__prev .mdi-chevron-left::before),
:deep(.top-products-sale .products-box-sale .products-items .slide-group .v-theme--light .v-slide-group .v-slide-group__next .mdi-chevron-right::before) {
  color: #f39c12;
}

:deep(.card) {
  margin-right: 0 !important;
  border-radius: 0;
  width: 100%;
  cursor: pointer;
}

:deep(.card__info) {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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
  top: -2px;
  left: 20px;
  background: #fffa65;
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.container .header-right-address-Ripple span {
  position: absolute;
  border-radius: 50%;
  animation: animate 1s linear infinite;
  /* transform: rotateX(55deg); */
  animation-delay: calc(0.5s * var(--i));
  box-shadow: 0 1px 5px #fffa65
}

.wrapper {
  text-align: center;
  width: 100%;
  position: relative;
}

.btn_add-cart {
  text-transform: uppercase;
  text-align: center;
  position: relative;
  text-decoration: none;
  display: inline-block;
}

.btn_add-cart:hover {
  color: black;
}

/* .btn_add-cart span {
  color: black;
} */

.btn_add-cart {
  /* width: 80%; */
  padding: 8px 24px;
  margin: 20px 0;
  font-size: 14px;
  color: #f1f2f6;
  text-align: center;
  text-transform: capitalize;
  border: 1px solid #fff;
  border-radius: 10px;
  position: relative;
  overflow: hidden !important;
  transition: all .3s ease-in-out;
  background: transparent !important;
  z-index: 1;
  border: 1px solid #ccc;
}

.btn_add-cart::before {
  content: '';
  width: 0%;
  height: 100%;
  display: block;
  background: #fff200;
  position: absolute;
  transform: skewX(-20deg);
  left: -10%;
  opacity: 1;
  top: 0;
  z-index: -12;
  transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
  box-shadow: 2px 0px 14px rgba(0, 0, 0, .6);
  color: #2C3A47;
}

.btn_add-cart::after {
  content: '';
  width: 0%;
  height: 100%;
  display: block;
  background: #f1f2f6;
  position: absolute;
  transform: skewX(-20deg);
  left: -10%;
  opacity: 0;
  top: 0;
  z-index: -15;
  box-shadow: 2px 0px 14px rgba(0, 0, 0, .6);
}

.btn_add-cart:hover::before {
  opacity: 1;
  width: 116%;
}

.cart_span {
  margin-right: 6px;
}

.add-cards {
  font-weight: 600;
  margin-right: 8px;
}

.new-product {
  margin: 12px 32px 0 56px;
}

.new-product h2 {
  margin-left: 10px;
  padding: 12px;
}

.box-new-product {
  display: flex;
}

.new-product-right {
  display: flex;
  width: 80%;
  flex-wrap: wrap;
}

.new-product-left {
  width: 20%;
}

.new-product-left img {
  width: 100%;
  height: 99%;
  object-fit: initial;
}

.new-product-cart {
  width: 20%;
  padding: 0 8px 12px 8px;
}

.product-hight-end {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}

.hight-end-cart {
  width: 20%;
  padding: 20px;
}

.hight-end-box {
  margin: 12px 32px 0 44px;
}

.hight-end-box h2 {
  margin-left: 10px;
  padding: 12px;
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
</style>