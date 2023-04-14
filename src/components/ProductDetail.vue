<template>
    <!-- <span @click="click">clickTest</span>
    <br>
    <span>{{ useUsersStore.count }}</span> -->
    <div class="product">
        <div class="product-content">
            <div class="product-margin">
                <div class="product-name">
                    <p>Trang chủ / Tivi / {{ detailProduct.name }}</p>
                </div>
                <!-- ---------------------------------------------------------------- -->
                <div class="product-items">
                    <div class="product-left">
                        <v-carousel hide-delimiters show-arrows="hover" v-model="currentIndex">
                            <v-carousel-item v-for="(items, i) in detailProduct.product_variants" :key="i"
                                :src="items.images[0]?.image_path" :value="i" @click="showImgs(i)" cover></v-carousel-item>
                        </v-carousel>
                        <div class="product-left-img">
                            <div class="item-img" v-for="(items, i) in detailProduct.product_variants" :key="i">
                                <img :src="items.images[0]?.image_path" alt="" @click="goToSlideIndex(i)">
                            </div>
                        </div>
                        <div class="product-sale">
                            <p>10%</p>
                            <p>OFF</p>
                        </div>
                    </div>
                    <!-- ---------------------------------------------------------------- -->

                    <div class="product-center">
                        <div class="product-center-margin">
                            <h4>{{ detailProduct.name }}</h4>
                            <div class="product-center">
                                <span>Tình trạng:
                                    <span
                                        :class="[detailProduct.product_variants?.[currentIndex]?.inventory > 0 ? 'statusGold' : 'statusRed']">
                                        {{ detailProduct.product_variants?.[currentIndex]?.inventory > 0 ? 'Còn Hàng' :
                                            'Hết Hàng'
                                        }}
                                    </span>
                                </span>
                                <span>Thương Hiệu: <span class="Trademark">{{ detailProduct.brand?.name }}</span></span>
                            </div>
                            <div class="product-price">
                                <span class="span-price">Giá:</span>
                                <span class="span-number">{{ onDiscount }}</span>
                                <!-- <span style="text-decoration: line-through;">{{ formatOldPrice() }}</span> -->
                                <!-- <span class="span-sale">- {{ (data.sale) * 100 }}%</span> -->
                            </div>
                            <div class="product-color" v-if="detailProduct.category?.name !== 'tivi'">
                                <p>Màu sắc: </p>
                                <p class="product-color-detail" :style="{ backgroundColor: items.color }"
                                    v-for=" (items, i) in detailProduct.product_variants" :key="i"
                                    @click="clickColor(items, i)">
                                </p>
                            </div>
                            <div class="product-color no-color" v-else>
                                <p>Màu sắc: {{ detailProduct.category?.id }} </p>
                                <p class="product-color-detail" :style="{ backgroundColor: items.color }"
                                    v-for=" (items, i) in detailProduct.product_variants" :key="i"
                                    @click="clickColor(items, i)">
                                </p>
                            </div>
                            <div class="product-number">
                                <p style="width:15%">Số Lượng:</p>
                                <button @click="onClickMinus"><i class="fa-solid fa-minus"></i></button>
                                <p class="product-number-p">{{ number }}</p>
                                <button @click="onClickPlus"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <div class="product-btn">
                                <button id="liveToastBtn" class="btn btn-3" @click="AddCart()">Thêm vào giỏ</button>
                                <button class="product-btn-buy btn btn-3" @click="BuyNow()">Mua ngay</button>
                            </div>
                            <div class="product-item-i">
                                <span>Chia sẻ: </span>
                                <a href=""><i class="fa-brands fa-facebook"></i></a>
                                <a href=""><i class="fa-brands fa-facebook-messenger"></i></a>
                                <a href=""><i class="fa-brands fa-twitter"></i></a>
                                <a href=""><i class="fa-brands fa-pinterest"></i></a>
                                <a href=""><i class="fa-solid fa-link"></i></a>
                            </div>
                        </div>
                    </div>
                    <!-- ---------------------------------------------------------------- -->

                    <div class="product-right">
                        <div>
                            <div class="product-Policy">
                                <div>
                                    <p>Chính sách bán hàng</p>
                                    <ul>
                                        <li>
                                            <img src="https://theme.hstatic.net/200000516791/1000880762/14/product_deliverly_1_ico.png?v=2258"
                                                alt="">
                                            <span>Cam kết 100% chính hãng</span>
                                        </li>
                                        <li>
                                            <img src="https://theme.hstatic.net/200000516791/1000880762/14/product_deliverly_2_ico.png?v=2258"
                                                alt="">
                                            <span>Cam kết 100% chính hãng</span>
                                        </li>
                                        <li>
                                            <img src="https://theme.hstatic.net/200000516791/1000880762/14/product_deliverly_3_ico.png?v=2258"
                                                alt="">
                                            <span>Hỗ trợ 24/7</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <p>Thông tin thêm</p>
                                    <ul>
                                        <li>
                                            <img src="https://theme.hstatic.net/200000516791/1000880762/14/product_deliverly_4_ico.png?v=2258"
                                                alt="">
                                            <span>Hoàn tiền 111% nếu hàng giả</span>
                                        </li>
                                        <li>
                                            <img src="https://theme.hstatic.net/200000516791/1000880762/14/product_deliverly_5_ico.png?v=2258"
                                                alt="">
                                            <span>Mở hộp kiểm tra nhận hàng</span>
                                        </li>
                                        <li>
                                            <img src="https://theme.hstatic.net/200000516791/1000880762/14/product_deliverly_6_ico.png?v=2258"
                                                alt="">
                                            <span>Đổi trả trong 7 ngày</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="product-right-img">
                            <a href=""><img
                                    src="https://theme.hstatic.net/200000516791/1000880762/14/product_banner.jpg?v=2258"
                                    alt=""></a>
                        </div>

                    </div>
                </div>
                <!-- ---------------------------------------------------------------- -->
                <div class="product-description">
                    <div class="product-description-content">
                        <div class="product-description-text">
                            <div class="product-description-h4">
                                <h4>MÔ TẢ SẢN PHẨM </h4>
                            </div>
                        </div>
                        <!-- ---------------------------------------------------------------- -->
                        <div class="product-description-detail">
                            <div>
                                <ul>
                                    <!-- <li v-for="(detail, index) in detail" :key="index">{{ detail }}</li> -->
                                    <li v-html="data.description_detail">
                                    </li>
                                </ul>
                            </div>
                            <!-- ---------------->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <vue-easy-lightbox :scrollDisabled="scrollDisabled" :escDisabled="escDisabled" :visible="visible" :imgs="imgs"
            :index="index" @hide="handleHide">
        </vue-easy-lightbox>
    </div>
</template>
  
<script>
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
export default {
    component: {
        VueEasyLightbox,
    },

    data() {
        return {
            store: useUsersStore(),
            slug: this.$route.params.slug,
            displayedContent: "",
            isCollapsed: false,
            scrollDisabled: false,
            escDisabled: false,
            number: 1,
            currentIndex: 0,
            imgs: '',
            index: 0,
            visible: false,
            data: {
                sale: 0.16,
                image_link: [
                    "//product.hstatic.net/200000516791/product/product_28_1_5043e2df20164cd1a4dbca5bb832937f_178c708a80114db18ee385c6f26fa0eb_master.png",
                    "//product.hstatic.net/200000516791/product/product_23_2_4935dd9b12f34816a287d5453a9be876_1375950e93174ff09f60f8169ce733da_master.png",
                    "//product.hstatic.net/200000516791/product/product_23_3_e6936a60b48144ceaad1f53a59872d4a_3f238840af0347e7878d2cecef17a53d_master.png",
                    "//product.hstatic.net/200000516791/product/product_27_3_b64ab2ee0acc4c248b7d6c177663bc12_6dff7c9a80db4d77854643f9eafe18d6_master.png"
                ],
                thumnail_image_links: [
                    "//product.hstatic.net/200000516791/product/product_28_1_5043e2df20164cd1a4dbca5bb832937f_178c708a80114db18ee385c6f26fa0eb_compact.png",
                    "//product.hstatic.net/200000516791/product/product_23_2_4935dd9b12f34816a287d5453a9be876_1375950e93174ff09f60f8169ce733da_compact.png",
                    "//product.hstatic.net/200000516791/product/product_23_3_e6936a60b48144ceaad1f53a59872d4a_3f238840af0347e7878d2cecef17a53d_compact.png",
                    "//product.hstatic.net/200000516791/product/product_27_3_b64ab2ee0acc4c248b7d6c177663bc12_6dff7c9a80db4d77854643f9eafe18d6_compact.png"
                ],
                description_detail: "<div class=\"description-productdetail\">\n\t\t\t\t\t\t\t\t<p><strong>Đặc điểm nổi bật</strong></p><ul><li><p>Tivi NanoCell LG 4K (3840 x 2160) hiển thị hình ảnh sắc nét, chi tiết</p></li><li><p>Công nghệ NanoCell giúp hình ảnh có màu sắc thuần khiết và tinh tế hơn</p></li><li><p>Bộ xử lý α7 Gen4 Processor 4K phân tích và tối ưu hóa nội dung hiển thị</p></li><li><p>FILMMAKER MODE™ truyền tải phim chân thực như dưới góc nhìn đạo diễn</p></li><li><p>Công nghệ Dolby Atmos mang đến không gian âm thanh vòm sống động</p></li><li><p>Công nghệ AI Sound tinh chỉnh âm thanh dựa trên thể loại nội dung đang xem</p></li><li><p>Tivi LG hỗ trợ tìm kiếm bằng giọng nói giúp tìm kiếm nội dung tiện lợi hơn</p></li></ul><div> </div><h2>Thông số sản phẩm</h2><table id=\"tblGeneralAttribute\" border=\"1\" cellspacing=\"0\" style=\"background-color:#ffffff; border-collapse:collapse; border-spacing:0px; border:1px solid #eeeeee; box-sizing:border-box; color:#333333; font-family:Roboto,sans-serif; font-size:13px; line-height:20px; margin-bottom:20px; max-width:100%; min-width:500px; width:100%\" class=\"mce-item-table table table-bordered\"><tbody style=\"box-sizing: border-box;\"><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Model</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\"><table><tbody><tr><td><table><tbody><tr><td>50NANO86TPA</td></tr></tbody></table></td></tr></tbody></table></td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\"><table><tbody><tr><td>Nhà sản xuất</td></tr></tbody></table></td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">LG</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\"><table><tbody><tr><td>Xuất xứ</td></tr></tbody></table></td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">Indonesia</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Năm ra mắt</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">2021</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Thời gian bảo hành</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">24 tháng</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Loại Tivi</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">Tivi NanoCell</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Kích thước màn hình</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">50 inch</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Độ phân giải</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">4K (3840 x 2160) Pixels</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Công nghệ xử lí hình ảnh</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">X1 4K Processor, Direct LED Frame Dimming, HLG, Motionflow XR 200, HDR10, Auto Mode, 4K X-Reality PRO</td></tr></tbody></table>\n\t\t\t\t\t\t\t</div>"
            },
            useUsersStore: useUsersStore(),
            arr: [
                {
                    id: 54,
                    product_variant: {
                        id: 42,
                        product_id: 1,
                        name: "test1",
                        color: "#e67e22",
                        sku: "test",
                        price: 120000,
                        inventory: 12,
                        images: [
                            {
                                id: 59,
                                image_path:
                                    "https://pxh09.cloud/files/32ba358554615180.jpg",
                            },
                        ],
                    },
                    qty: 1,
                },
                {
                    id: 51,
                    product_variant: {
                        id: 24,
                        product_id: 10,
                        name: "oppo-plus-đen",
                        color: "#000000",
                        sku: "string",
                        price: 19990000,
                        inventory: 10,
                        images: [
                            {
                                id: 26,
                                image_path:
                                    "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/d/c/dcdcd_1_.jpg",
                            },
                        ],
                    },
                    qty: 2,
                },
                {
                    id: 52,
                    product_variant: {
                        id: 24,
                        product_id: 10,
                        name: "oppo-plus-đen",
                        color: "#000000",
                        sku: "string",
                        price: 19990000,
                        inventory: 10,
                        images: [
                            {
                                id: 26,
                                image_path:
                                    "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/d/c/dcdcd_1_.jpg",
                            },
                        ],
                    },
                    qty: 3,
                },
            ],
            arr1: [
                {
                    id: 54,
                    product_variant: {
                        id: 42,
                        product_id: 1,
                        name: "test1",
                        color: "#e67e22",
                        sku: "test",
                        price: 120000,
                        inventory: 12,
                        images: [
                            {
                                id: 59,
                                image_path:
                                    "https://pxh09.cloud/files/32ba358554615180.jpg",
                            },
                        ],
                    },
                    qty: 1,
                },
            ],
        }
    },


    computed: {
        ...mapState(useCartStore, [
            'cartValue',
            'allCart',
        ]),
        ...mapState(useProductsStore, [
            'params',
            'allProducts',
            'detailProduct',
            'allBrand'
        ]),
        commonItems() {
            // Lấy ra các phần tử trùng nhau
            return this.arr.filter((item) =>
                this.arr1.some((item1) => item1.id === item.id)
            );
        },

        onDiscount() {
            let index = this.currentIndex;
            let price = this.detailProduct.product_variants?.[index]?.price;
            if (this.number == 1) {
                return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
            } else {
                let newPrice = price * this.number
                return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(newPrice);
            }
        },

        formatOldPrice() {
            let oldPrice = 1
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(oldPrice);
        },
    },

    methods: {
        ...mapActions(useProductsStore, [
            'getProducts',
            'getDetailProduct',
            'getBrand',
        ]),
        ...mapActions(useUsersStore, ['checkLoggedIn']),
        ...mapActions(useCartStore, ['addCart']),


        click() {
            console.log('adadada', this.allProducts);
            // console.log(this.$route.params.slug, 'id');
            // console.log(this.getSelectedProduc);
        },

        reload() {
            location.reload();
        },

        clickColor(items, i) {
            this.currentIndex = i;
            // console.log('items', items);
        },


        async AddCart() {
            try {
                let index = this.currentIndex;
                let inventory = this.detailProduct.product_variants[index].inventory

                // checklogin trước khi thêm vào giỏ hàng
                const isLoggedIn = localStorage.getItem('isLoggedIn')
                const userData = localStorage.getItem('user')
                if (!isLoggedIn && !userData) {
                    this.$router.push({ path: '/dang-nhap' })
                    console.log('checkAut', checkAut);
                } else if (inventory > 0) {
                    let id = this.detailProduct.product_variants[index].id
                    this.cartValue.product_variant_id = id
                    this.cartValue.qty = this.number
                    await this.addCart(this.cartValue)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Đã thêm sản phẩm vào giỏ hàng',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire('Sản phẩm hết hàng')
                }

            } catch (error) {
                console.log(error);
            }
        },

        BuyNow() {
            let index = this.currentIndex;
            let inventory = this.detailProduct.product_variants[index].inventory

            // const checkAut = this.checkLoggedIn()
            const isLoggedIn = localStorage.getItem('isLoggedIn')
            const userData = localStorage.getItem('user')
            if (!isLoggedIn && !userData) {
                this.$router.push({ path: '/dang-nhap' })
            } else if (inventory > 0) {
                this.AddCart()
                this.$router.push({ path: '/gio-hang' })
            } else {
                Swal.fire('Sản phẩm hết hàng')
            }
        },

        onClickPlus() {
            let index = this.currentIndex;
            let inventory = this.detailProduct.product_variants[index].inventory
            if (inventory > 0 && this.number < inventory) {
                this.number += 1;
            } else {
                Swal.fire('Sản phẩm hết hàng')
            }
        },

        onClickMinus() {
            if (this.number > 1) {
                this.number = this.number - 1;
            }
        },

        goToSlideIndex(index) {
            this.currentIndex = index;
        },

        showImgs(i) {
            this.imgs = this.detailProduct.product_variants[i].images[0].image_path
            this.index = i;
            this.show()
        },

        showToast() {
            const toastTrigger = document.getElementById('liveToastBtn')
            const toastLiveExample = document.getElementById('liveToast')
            if (toastTrigger) {
                const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
                toastTrigger.addEventListener('click', () => {
                    toastBootstrap.show()
                })
            }
        },

        show() {
            this.visible = true
        },

        handleHide() {
            this.visible = false
        },

    },

    async created() {
        console.log('data_slug', this.allProducts);
        console.log('slug', this.slug);
        console.log('allCart', this.allCart);
        try {
            const id = this.slug
            await this.getDetailProduct({ id })
        } catch (error) {
            console.log(error);
        }
    },
    // watch: {
    //     overlay(val) {
    //         val && setTimeout(() => {
    //             this.overlay = false
    //         }, 3000)
    //     },
    // },
}
</script>
  
<style scoped>
.no-color {
    display: none !important;
}

.toast-container {
    margin-top: 38px;
}

.btn {
    background: none;
    border: 1px solid #ff0000;
    margin: 6px;
    transition: color 0.2s;
    position: relative;
    padding: 12px;
    font-size: 1rem;
    width: 230px;
    font-weight: 600;
    color: #e70505;
    border-radius: 6px;
}

.btn:hover {
    color: #fff;
    background-color: #e70505;

}

.product-content {
    background-color: #e7e6e685;

}

.product-name {
    padding: 6px;

}

.product-name p {
    font-size: 0.8rem;
    margin-top: 6px;
    color: #34495e;

}

.product-margin {
    margin-left: 56px;
    margin-right: 32px;
}

.product-items {
    background-color: white;
    display: flex;
}

.product-left {
    padding: 16px;
    position: relative;
    width: 35%;
    border-right: 1px solid #cecece
}

.product-left img {
    width: 100%;
    height: 90%;
    padding: 16px;
}

.product-left-img {
    display: flex;
}

.item-img {
    width: 20%;
    cursor: pointer;
}

.product-sale {
    width: 50px;
    height: 50px;
    background-color: red;
    color: white;
    position: absolute;
    top: 2%;
    border-radius: 0 0 8px 8px;
}

.product-sale p {
    padding: 2px 4px;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
}

.product-center {
    width: 53%;
    display: flex;
    padding: 6px;
    font-size: 1.5rem;
}

.product-center-margin {
    padding: 12px 24px;
    width: 100%;
}

.product-center-margin h4 {
    font-weight: 500;
}

.product-center span {
    padding-right: 10px;
    padding-top: 6px;
    padding-bottom: 6px;
    font-size: 0.9rem;
}

.span-sale {
    background-color: white;
    color: #ff0000;
    padding: 6px !important;
    border: 1px solid #ff0000;
    border-radius: 4px;
    font-size: 0.8rem !important;
}

.product-price {
    background-color: #f9f9f9;
    padding: 14px;
    border-radius: 6px;
    margin: 12px 0;
    width: 90%;
}

.product-price span {
    font-size: 1.3rem;
}

.span-price {
    font-size: 1rem !important;
    font-weight: bold;
}

.product-color {
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    padding: 6px;
}

.product-color-gray {
    background-color: rgb(220, 220, 220);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid white;
    margin-left: 12px;
}

.product-color-black {
    background-color: black;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid white;
    margin-left: 12px;
}

.product-color-detail {
    /* background-color: #fffa65; */
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid white;
    margin-left: 12px;
}

.product-color-moss_green {
    background-color: #10ac84;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid white;
    margin-left: 12px;
}

.product-color-violet {
    background-color: #be2edd;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid white;
    margin-left: 12px;
}

.span-number {
    margin-left: 32px;
    margin-right: 10px;
    font-weight: bold;
}

.product-number {
    display: flex;
    font-size: 1rem;
    align-items: center;
    margin: 8px 0;
}

.product-number p {
    font-weight: 500;
    margin-right: 12px;
}

.product-number button {
    border: 1px solid #cecece;
    padding: 4px;
    width: 7%;
}

.product-number button i {
    color: #cccc;
}

.product-number button i:hover {
    color: black;
}

.product-number p {
    padding: 6px;
    margin-right: 0 !important;
}

.fa-solid {
    font-size: 0.8rem;
}

.product-number-p {
    width: 7%;
    text-align: center;
}

.product-btn {
    display: flex;
    justify-content: flex-start;
    margin: 12px 0;
}

.product-btn-buy {
    color: white !important;
    background-color: #ff0000;
}

.product-btn-buy:hover {
    background-color: white;
    color: #e70505 !important;
}

.fa-facebook {
    color: blue;
}

.fa-facebook-messenger {
    color: #3498db;
}

.fa-twitter {
    color: #2980b9;

}

.fa-pinterest {
    color: #e74c3c;
}

.fa-link {
    color: #95a5a6;
}

.product-item-i {
    display: flex;
    align-items: center;
}

.product-item-i i {
    padding: 8px;
}

.product-right {
    width: 15%;
    margin-top: 18px;
    margin-right: 16px;
}

.product-Policy {
    border: 1px solid #ccc;
    padding: 12px;
    border-radius: 6px;
}

.product-Policy li {
    list-style: none;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    padding: 6px;
    color: rgb(111, 111, 111);
}

.product-Policy li span {
    margin-left: 10px;
}

.product-Policy p {
    font-size: 0.9rem;
    font-weight: 600;
}

.product-Policy img {
    width: 15%;
}

.product-right-img img {
    width: 100%;
    margin-top: 12px;
}

.product-description {
    background-color: white;
    margin-top: 16px;
}

.product-description-content {
    padding: 8px;
    margin: 8px;
}

.product-description-text {
    border-bottom: 1px solid #cecece;

}

.product-description-h4 {
    border-bottom: black !important;
}

.product-description-h4 h4 {
    font-weight: 500;
}

.product-description-detail {
    margin: 12px 0;
}

.product-description-detail p {
    font-weight: 600;
}

.product-description-detail ul {
    margin-top: 8px;
}

.product-description-detail li {
    list-style: none;
    font-size: 0.9rem;
    color: #3c4147;
    padding: 2px 0;
}

:deep(.description-productdetail li) {
    list-style: none;
    padding: 2px 0;
}

:deep(.description-productdetail ul) {
    margin-top: 12px;
}

:deep(.description-productdetail h2) {
    margin-bottom: 12px;
}

.statusGold {
    color: rgb(249, 187, 1);
    margin-left: 4px;
    font-weight: 600;
}

.statusRed {
    color: #e84118;
    margin-left: 4px;
    font-weight: 600;
}

.Trademark {
    color: rgb(249, 187, 1);
    margin-left: 4px;
    font-weight: 600;
}

:deep(.v-window--show-arrows-on-hover:hover) {
    cursor: url('https://file.hstatic.net/1000397797/file/cursor-zoom-in_67804ceaaa0941cf840b0ad13cde42ed.svg'), auto;
}

:deep(.header-left a) {
    text-decoration: none;
    color: white;
}

:deep(.v-img__img--cover) {
    object-fit: scale-down !important;
}

:deep(.vel-img) {
    background-color: white;
}
</style>