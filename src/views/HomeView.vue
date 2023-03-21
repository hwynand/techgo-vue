<template>
  <div class="Home">
    <!-- ------------------------- banner--------------------------------------- -->
    <div class="home-banner">
      <div class="baner-up">
        <div class="home-baner-left">
          <div class="baner-img">
            <a href="">
              <img
                src="https://telecomtalk.info/wp-content/uploads/2022/10/cropped-Apple-iPhone-14-Pro-and-Pro-Max-differences.jpg"
                alt="">
            </a>
            <a href="">
              <img
                src="https://bizweb.dktcdn.net/100/176/601/collections/untitled-2-1-ef3e6f0b-cc6b-4d46-bc2f-b4f01071a61b.jpg?v=1663070166100"
                alt="">
            </a>
          </div>
        </div>
        <!-- --------------------------------------------------------------->

        <div class="home-baner-center">
          <div class="baner-carousel">
            <v-carousel cycle height="415" hide-delimiter-background show-arrows="hover" interval="3000">
              <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet height="100%">
                  <div class="fill-height justify-center align-center">
                    <div class="text-h2">
                      <img :src="slide.image" alt="">
                    </div>
                  </div>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>
        </div>
        <!-- --------------------------------------------------------------->

        <div class="home-baner-right">
          <div class="home-baner-right-img">
            <div>
              <a href="">
                <img src="https://theme.hstatic.net/200000516791/1000880762/14/banner_top_1_img_large.jpg?v=2257" alt="">
              </a>
            </div>
            <div>
              <a href="">
                <img src="https://theme.hstatic.net/200000516791/1000880762/14/banner_top_2_img_large.jpg?v=2257" alt="">
              </a>
            </div>
            <div>
              <a href="">
                <img src="https://theme.hstatic.net/200000516791/1000880762/14/banner_top_3_img_large.jpg?v=2257" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- ---------------------------baner down------------------------------------ -->
      <div class="baner-bottom">
        <div class="baner-bottom-img">
          <a href="">
            <img src="https://theme.hstatic.net/200000516791/1000880762/14/categorybanner_1_img.jpg?v=2257" alt="">
          </a>
        </div>
        <div class="baner-bottom-img">
          <a href="">
            <img src="https://theme.hstatic.net/200000516791/1000880762/14/categorybanner_2_img.jpg?v=2257" alt="">
          </a>
        </div>
        <div class="baner-bottom-img">
          <a href="">
            <img src="https://theme.hstatic.net/200000516791/1000880762/14/categorybanner_3_img.jpg?v=2257" alt="">
          </a>
        </div>
        <div class="baner-bottom-img">
          <a href="">
            <img src="https://theme.hstatic.net/200000516791/1000880762/14/categorybanner_4_img.jpg?v=2257" alt="">
          </a>
        </div>
      </div>

      <!-- --------------------------HIGHLIGHTS CATEGORY------------------------------------->
      <div class="highlights-category">
        <h2>Danh mục nổi bật</h2>
        <div class="category-item">
          <div class="category-box" v-for="(listCategory, index) in listCategory" :key="index">
            <router-link to="/ListProducts">
              <div class="categoty-img">
                <img :src="listCategory.thumb" alt="">
              </div>
              <div class="category-text">
                <p>{{ listCategory.title }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- --------------------------------------------------------------->

      <div class="top-products">
        <div class="products-box">
          <div class="products-items">
            <h3>Top sản phẩm bán chạy</h3>
            <Swiper></Swiper>
          </div>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------------------------------- -->

    <div class="home-footer">
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
import { listCategory } from '../share/Data'
export default {
  data() {
    return {
      slides: [
        { image: 'https://theme.hstatic.net/200000516791/1000880762/14/slide_2_img.jpg?v=2257' },
        { image: 'https://cdn.tgdd.vn/hoi-dap/963888/khuyenmai-800x450.jpg' },
        { image: 'https://inhat.vn/ha-noi/wp-content/uploads/2019/07/sua-macbook-hoan-kiem-11.jpg' },
      ],
      listCategory: listCategory
    }
  }
}
</script>

<style scoped>
.home-banner {
  background-color: #ecf0f1;
  margin-top: 12px;
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

.baner-carousel {
  padding: 12px 6px;
  color: white;
  border-radius: 50px;
}

.v-carousel__controls {
  display: none !important;
}

.v-carousel--hide-delimiter-background .v-carousel__controls {
  display: none;
}

.text-h2 img {
  width: 100%;
}

.v-btn--icon.v-btn--density-default {
  color: white;
}

.home-baner-right {
  height: 425px;
  width: 25%;
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
}

.home-baner-right-img img:hover {
  transform: scale(1.03);
}

.baner-bottom {
  margin-left: 50px;
  display: flex;
  padding-right: 12px;
}

.baner-bottom-img {
  width: 25%;
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
  margin-right: 18px;
}

.highlights-category h2 {
  padding: 20px 16px;
  font-weight: 500;
}

.category-box a {
  text-decoration: none;
  color: black;
}

.category-box {
  border: 0.5px solid rgba(0, 0, 0, 0.05);
  width: 14.2859%;
  padding: 8px;
}

.category-box:hover {
  box-shadow: 0 0 4px 2px #ccc;
  transition: ease 0.2s;
  cursor: pointer;
}

.category-item {
  display: flex;
  flex-wrap: wrap;
}

.categoty-img img {
  width: 50%;
}

.categoty-img {
  display: flex;
  justify-content: center;
  align-items: center;
}

.category-text p {
  text-align: center;
  text-transform: capitalize;
  font-weight: 500;
  padding: 6px;
  font-size: 12px;
}

.products-items {
  margin-left: 10px;
  padding: 12px;
}

.products-items h3 {
  margin-left: 16px;
  padding: 12px;
}

.products-box {
  margin-right: 16px;
}

.header-list {
  margin-top: 20px;
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
  color: white;
}

:deep(.mdi-chevron-left::before) {
  color: white;
}

:deep(.mdi-chevron-right::before) {
  color: white;
}

.v-btn .v-btn--density-default {
  width: 243px;
}
</style>