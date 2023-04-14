<template>
    <div class="list-products">
        <!---------------lits product header----------------------------------------------------->
        <div class="list-product-content">
            <div>
                <div class="list-product-content-box">
                    <div class="list-product-adress">
                        <div>
                            <p> Trang chủ / Danh sách sản phẩm</p>
                        </div>
                    </div>
                    <div class="list-product-content-block">
                        <div class="block-left">
                            <div class="p-sticky">
                                <div class="list-product-content-left">
                                    <div class="product-box">
                                        <div class="product-portfolio">
                                            <div class="product-h4">
                                                <h4>Danh mục sản phẩm</h4>
                                            </div>
                                            <ul>
                                                <li><a href="">Sản phẩm khuyến mại</a></li>
                                                <li><a href="">Sản phẩm nổi bật</a></li>
                                                <li @click="handaleAllProducts"><a href="">Tất cả sản phẩm</a></li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                                <div class="list-product-content-left">
                                    <div class="product-box">
                                        <div class="product-portfolio">
                                            <div class="product-h4">
                                                <h4 @click="click">Nhà Cung cấp</h4>
                                            </div>
                                            <ul v-for="(brand, i) in menuBrand" :key="i">
                                                <li>
                                                    <input type="checkbox" :value="brand.id" v-model="selectedBrand"
                                                        @change="filterBrands()">
                                                    <span> {{ brand.name }}</span>
                                                    <!-- <span> {{ brand }}</span> -->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-product-content-left">
                                    <div class="product-box">
                                        <div class="product-portfolio">
                                            <div class="product-h4">
                                                <h4>Lọc giá</h4>
                                            </div>
                                            <v-range-slider v-model="range" :max="50000000" :min="0" :step="100000"
                                                hide-details class="align-center" @update:modelValue="filterPrice($event)">
                                                <template v-slot:prepend>
                                                    <v-text-field :model-value="range[0]" hide-details single-line
                                                        type="number" variant="outlined" density="compact"
                                                        style="width: 70px" @change="$set(range, 0, $event)"></v-text-field>
                                                </template>
                                                <template v-slot:append>
                                                    <v-text-field :model-value="range[1]" hide-details single-line
                                                        type="number" variant="outlined" style="width: 70px"
                                                        density="compact" @change="$set(range, 1, $event)"></v-text-field>
                                                </template>
                                            </v-range-slider>
                                            <div class="range-input">
                                                <input type="text" v-model="range[0]">
                                                <input type="text" v-model="range[1]">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- ------------------------------------------------------------------>

                        <div class="block-right">
                            <div class="list-product-content-right">
                                <div class="products-img">
                                    <img src="https://theme.hstatic.net/200000516791/1000880762/14/collection_banner.jpg?v=2257"
                                        alt="">
                                </div>
                                <div class="products-promotion">
                                    <h3>Tất cả sản phẩm</h3>
                                    <span style="width:60%">
                                        <span style="font-weight: bold;">{{ totalProducs }}</span>
                                        <span style="font-size: 14px"> sản phẩm</span>
                                    </span>
                                    <div class="products-content">
                                        <p>
                                            <span><i class="fa-solid fa-arrow-down-a-z"></i></span>
                                            <span>Sắp xếp</span>
                                            <span><i class="fa-solid fa-sort-down"></i></span>
                                        </p>
                                        <ul class="products-filter">
                                            <li v-for="(item, i) in items" :key="i" @click="handaleFilterItem(item)">{{
                                                item.title }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <!-- ------------------------------------------------------------------>

                                <div class="products-cart">
                                    <div class="list-CartProduct" v-if="allProducts.length !== 0">
                                        <ProductCard v-for="(product, i) in allProducts" :key="i" :name="product.name"
                                            :brand="product.brand.name"
                                            :url="product.product_variants[0]?.images[0]?.image_path" :id="product.id"
                                            :price="product.product_variants[0]?.price">
                                        </ProductCard>
                                    </div>

                                    <!-- ------------------------------------------------------------------>

                                    <div class="list-CartProduct" v-else>
                                        <div class="no-data">
                                            <i class="fa-solid fa-box-open"></i>
                                            <p>Không có sản phẩm</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <v-pagination v-model="page" :length="totalPages" rounded="circle"
                                        @update:modelValue="updatePage(page, size)">
                                    </v-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- ------------------------------------------------------------------ -->
    </div>
    <!-- <button @click="overlay = !overlay">click</button> -->
</template>
  
<script>
import ProductCard from './ProductCard.vue'
import { mapActions, mapState } from 'pinia'
import { useProductsStore } from '@/stores/products'


export default {
    components: {
        ProductCard,
    },

    data() {
        return {
            searchTimeout: null,
            searchText: '',
            page: 1,
            size: 10,
            menuBrand: '',
            range: [0, 50000000],
            items: [
                { title: 'Sản phẩm nổi bật' },
                { title: 'Giá Tăng Dần' },
                { title: 'Giá Giảm Dần' },
                { title: 'Tên A - Z' },
                { title: 'Tên Z - A' },
            ],
            selectedBrand: [],
        }
    },
    methods: {
        ...mapActions(useProductsStore, [
            'getProducts',
            'getBrand',
        ]),

        click() {
            // console.log(this.products);
        },

        //--reload lại component
        reload() {
            location.reload();
        },

        async getAllBrands() {
            try {
                await this.getBrand()
                const res = await this.allBrand
                this.menuBrand = res
            } catch (error) {
                console.log(error);
            }
        },

        async updatePage(page, size) {
            this.params.skip = page
            this.params.limit = size
            this.getProducts(this.params)
        },

        async filterBrands() {
            try {
                this.params.brand_id = this.selectedBrand
                await this.getProducts(this.params)
            } catch (error) {
                console.log(error);
            }
        },

        async filterPrice(rangePrice) {
            const cb = () => {
                this.params.min_price = rangePrice[0]
                this.params.max_price = rangePrice[1]
                this.getProducts(this.params)
            }

            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(function () {
                console.log('seaching')
                cb()

            }, 500);
        },

        // formatPrice(price) {
        //     console.log(price);
        //     return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
        // },

        handaleFilterItem(item) {
            if (item === 'Giá Tăng Dần') {
                return this.allProducts.sort((a, b) => a.product_variants[0].price - b.product_variants[0].price);
            }
        },

        async handaleAllProducts() {
            this.params.skip = this.page
            this.params.limit = this.size
            await this.getProducts(this.params)
        }
    },

    computed: {
        ...mapState(useProductsStore, [
            'allProducts',
            'allBrand',
            'params',
            'totalProduct',
        ]),

        totalProducs() {
            let tatal = this.allProducts
            return tatal.length
        },

        totalPages() {
            let tatal = this.totalProduct.total
            return Math.ceil(tatal / this.size)
        },

    },

    async beforeMount() {
        console.log('beforeMount');
    },


    async created() {
        //------products total------
        try {
            this.params.skip = this.page
            this.params.limit = this.size
            await this.getProducts(this.params)
            console.log('allProducts', this.allProducts);
            console.log('totalProduct', this.totalProducs);
        } catch (error) {
            console.log(error);
        }

        // ----brands
        await this.getAllBrands()
    },

    async mounted() {
        console.log('mounted')
    }

    // watch: {
    //   overlay(val) {
    //     console.log(val);
    //     val && setTimeout(() => {
    //       this.overlay = false
    //     }, 1000)
    //   },
    // },

}
</script>
  
<style scoped>
.list-products {
    position: relative;
}

.list-product-content {
    background-color: #ececec;
}

.list-product-content-box {
    margin-left: 56px;

}

.list-product-adress p {
    font-size: 0.9em;
    padding: 6px;
}

.list-product-content-left {
    background-color: white;
    border: 0.5px solid #ccc;
    border-radius: 6px;
    margin-top: 12px
}

.product-h4 {
    border-bottom: 0.5px solid #ccc;
    padding: 6px 18px;

}

.product-h4 h4 {
    font-weight: 500;
}


.product-portfolio li {
    list-style: none;
    padding: 6px 18px;
    font-size: 0.9rem;
    display: flex;
}

.product-portfolio li input {
    margin-right: 12px;
    width: 14px;
    accent-color: #fffa65;
}

.product-portfolio li input:hover {
    cursor: pointer;
}

.product-portfolio li a {
    text-decoration: none;
    color: #000;
}

.product-portfolio li a:hover {
    cursor: pointer;
}

.product-portfolio li span:hover {
    cursor: pointer;
}

.list-product-content-block {
    display: flex;
}

.block-left {
    width: 20%;

}

.p-sticky {
    position: sticky;
    top: 100px;
}

.block-right {
    width: 80%;
    padding: 12px 32px;
}

.products-img img {
    width: 100%;
}

.products-content {
    position: relative;
    width: 20%;
}

.products-content:hover {
    cursor: pointer;
}

.products-content:hover .products-filter {
    display: block;
    z-index: 1;
}

.products-content p {
    background-color: white;
    width: 140px;
}

.products-content p span {
    display: inline-block;
    padding: 8px;
}

.products-content li {
    list-style: none;
    background-color: white;
    padding: 4px 20px;
    font-size: 0.8rem;
}

.products-content li:hover {
    cursor: pointer;
    background-color: #636e72;
    color: white;
}

.products-promotion {
    display: flex;
}

.products-promotion h3 {
    /* margin-right: 24px; */
    display: flex;
    align-items: center;
    width: 20%;
}

.products-promotion span {
    display: flex;
    align-items: center;
}

.products-promotion span span {
    margin-left: 6px;
}

.products-filter {
    position: absolute;
    width: 64.5%;
    display: none;
}

.fa-sort-down {
    position: absolute;
    top: 22%;
}

.products-cart {
    min-height: 80vh;
    margin-top: 12px;
    position: relative;
}

.list-CartProduct {
    display: flex;
    flex-wrap: wrap;
}

:deep(.v-checkbox .v-selection-control) {
    min-height: 0 !important;
}

.no-data {
    position: absolute;
    display: flex;
    align-items: center;
    top: 40%;
    left: 40%;
}

.no-data p {
    color: gray;
    font-size: 1.5rem;
}

.fa-box-open {
    color: gray;
    font-size: 1.5rem;
    margin-right: 12px;
}

.range-input {
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.range-input input {
    width: 30%;
    border: 1px solid gray;
    padding: 6px;
    margin: 6px;
}

:deep(.v-input__prepend) {
    display: none !important;
}

:deep(.v-input__append) {
    display: none !important;
    ;
}

/* ::v-deep .v-pagination__list {
    justify-content: right;
  } */

:deep(.card) {
    width: 100% !important;
    margin: 8px;
    cursor: pointer;
}

:deep(.header-left a) {
    text-decoration: none;
    color: white;
}

:deep(.card) {
    width: 20%;
}

:deep(.product-card) {
    width: 20%;
    padding-bottom: 12px;
}

:deep(.btn_add-cart) {
    width: 100%;
}

:deep(.v-slider.v-input--horizontal .v-slider-thumb) {
    display: none;
}

:deep(.v-field__input) {
    padding-inline-start: unset;
}
</style>