<template>
    <div class="product-management">
        <div class="management-box">
            <div class="add-product" v-if="!addProduct">
                <button @click="addProducts">Thêm sản phẩm +</button>
            </div>
            <div class="table-user" v-if="!showAddProduct">
                <div class="user-title">
                    <div class="table-title">
                        <p class="v-title">Thông tin sản phẩm</p>
                        <p>Giá gốc</p>
                        <p>Giá giảm</p>
                        <p>Trạng thái</p>
                        <span></span>
                    </div>
                </div>
                <div class="user-boder">
                    <div class="table-content" v-for="(products, index) in collection" :key="index">
                        <div class="table-content-name">
                            <div class="table-content-img">
                                <img :src="products.thumnail_image_links[0]" alt="">
                            </div>
                            <p class="content-name">{{ products.name }}</p>
                        </div>
                        <p>{{ products.old_price }}</p>
                        <p>{{ products.price }}</p>
                        <p :class="[products.soldold == 'Còn hàng' ? 'soldoldGrenn' : 'soldoldRed']">
                            {{ products.soldold }}
                        </p>
                        <div class="v-row">
                            <span @click="editClick"><i class="fa-solid fa-pen-to-square"></i></span>
                            <span><i class="fa-solid fa-trash"></i></span>
                        </div>
                    </div>
                </div>
                <div class="title">
                    <h3>Table ProductManagement</h3>
                </div>
                <div class="text-center">
                    <v-pagination v-model="page" :length="4" rounded="circle"></v-pagination>
                    <button class="btn btn-primary" v-for="p in pagination.pages" :key="p" @click.prevent="setPage(p)">{{ p
                    }}</button>
                </div>
            </div>
            <div class="AddProductAdm" v-if="showAddProduct">
                <AddProductAdm @handleClose="clickClose"></AddProductAdm>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
import AddProductAdm from './AddProductView.vue';
export default {
    components: {
        AddProductAdm
    },
    data() {
        return {
            dialog: false,
            addProduct: false,
            showAddProduct: false,
            page: 1,
            perPage: 1,
            pagination: {},
            products: [
                {
                    name: "Smart Tivi NanoCell LG 4K 50 inch 50NANO86TPA",
                    soldold: "Còn hàng",
                    vendor: "LG",
                    old_price: "24,900,000đ",
                    price: "20,916,000đ",
                    sale: 0.16,
                    colors: [],
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
                {
                    name: "Google Tivi Sony 4K 50 inch KD-50X80J/S VN3",
                    soldold: "Hết hàng",
                    vendor: "Sony",
                    price: "19,250,000₫",
                    old_price: "21,500,000₫",
                    colors: [],
                    image_link: [
                        "//product.hstatic.net/200000516791/product/product_8_1_40a8adab1068450fa2c5193e55c449db_d2eb31bffb6f40f4a7990c5383cc235b_master.png",
                        "//product.hstatic.net/200000516791/product/product_8_3_de5aa5a17f7941e19996b5e52e091ebc_53258e65e61f43ae840b978a94744d23_master.png",
                        "//product.hstatic.net/200000516791/product/product_8_2_cdfa4e6e1fac41dbb9b9e29f433a5cf4_5fae594f6bfc409aae61492b905e6e9e_master.png",
                        "//product.hstatic.net/200000516791/product/product_8_4_796f81fdeeb34b71830ed1476593fb3c_f9aff1fcfca8487d9a510e6356a08ad5_master.png"
                    ],
                    thumnail_image_links: [
                        "//product.hstatic.net/200000516791/product/product_8_1_40a8adab1068450fa2c5193e55c449db_d2eb31bffb6f40f4a7990c5383cc235b_compact.png",
                        "//product.hstatic.net/200000516791/product/product_8_3_de5aa5a17f7941e19996b5e52e091ebc_53258e65e61f43ae840b978a94744d23_compact.png",
                        "//product.hstatic.net/200000516791/product/product_8_2_cdfa4e6e1fac41dbb9b9e29f433a5cf4_5fae594f6bfc409aae61492b905e6e9e_compact.png",
                        "//product.hstatic.net/200000516791/product/product_8_4_796f81fdeeb34b71830ed1476593fb3c_f9aff1fcfca8487d9a510e6356a08ad5_compact.png"
                    ],
                    description_detail: "<div class=\"description-productdetail\">\n\t\t\t\t\t\t\t\t<p><strong>Đặc điểm nổi bật</strong></p><ul><li><p>Tivi Sony có độ phân giải 4K hiển thị hình ảnh sắc nét gấp 4 lần Full HD</p></li><li><p>Công nghệ 4K X-Reality PRO tự động nâng cấp hình ảnh lên 4K sắc nét</p></li><li><p>Công nghệ Triluminos Pro tái hiện dải màu rộng, màu sắc rực rỡ, tự nhiên</p></li><li><p>Cảnh hành động nhanh mượt mà hơn nhờ công nghệ Motionflow XR 800</p></li><li><p>Thiết kế loa bất đối xứng X-Balanced Speaker cho âm thanh chất lượng cao</p></li><li><p>Công nghệ Room compensation tối ưu hóa âm thanh trong phòng theo vị trí ngồi</p></li><li><p>Chia sẻ nội dung từ điện thoại lên màn hình TV qua Chromecast, Apple Airplay</p></li></ul><div> </div><h2>Thông số sản phẩm</h2><table id=\"tblGeneralAttribute\" border=\"1\" cellspacing=\"0\" style=\"background-color:#ffffff; border-collapse:collapse; border-spacing:0px; border:1px solid #eeeeee; box-sizing:border-box; color:#333333; font-family:Roboto,sans-serif; font-size:13px; line-height:20px; margin-bottom:20px; max-width:100%; min-width:500px; width:100%\" class=\"mce-item-table table table-bordered\"><tbody style=\"box-sizing: border-box;\"><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Model</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\"><table><tbody><tr><td><table><tbody><tr><td>KD-50X80J/S</td></tr></tbody></table></td></tr></tbody></table></td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\"><table><tbody><tr><td>Nhà sản xuất</td></tr></tbody></table></td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">Sony</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\"><table><tbody><tr><td>Xuất xứ</td></tr></tbody></table></td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">Malaysia</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Năm ra mắt</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">2021</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Thời gian bảo hành</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">24 tháng</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Loại Tivi</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\"><table><tbody><tr><td>4K HDR GoogleTV</td></tr></tbody></table></td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Kích thước màn hình</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">43 inch</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Độ phân giải</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">4K (3840 x 2160) Pixels</td></tr><tr style=\"box-sizing:border-box\" class=\"row-info\"><td style=\"background-color:#f7f7f7 !important; border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:22.7596%\">Công nghệ xử lí hình ảnh</td><td style=\"border-color:#eeeeee; border-style:solid; border-width:1px; box-sizing:border-box; padding:8px; vertical-align:top; width:77.0982%\">X1 4K Processor, Direct LED Frame Dimming, HLG, Motionflow XR 200, HDR10, Auto Mode, 4K X-Reality PRO</td></tr></tbody></table>\n\t\t\t\t\t\t\t</div>"
                },
            ]
        }
    },
    methods: {
        // formatOldPrice(index) {
        //     let oldPrice = this.products[index].old_price
        //     return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(oldPrice);
        // },
        // formatPrice(index) {
        //     let Price = this.products[index].price
        //     return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(Price);
        // },
        addProducts() {
            this.showAddProduct = true;
            this.addProduct = true;
        },
        clickClose() {
            this.showAddProduct = false;
            this.addProduct = false;
        },
        editClick() {
            this.showAddProduct = true;
            this.addProduct = true;
        },

        setPage(p) {
            this.pagination = this.paginator(this.products.length, p);
        },
        paginate(data) {
            return data.slice(this.pagination.startIndex, this.pagination.endIndex + 1)
        },
        paginator(totalItems, currentPage) {
            let startIndex = (currentPage - 1) * this.perPage
            let endIndex = Math.min(startIndex + this.perPage - 1, totalItems - 1);
            return {
                currentPage: currentPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: _.range(1, Math.ceil(totalItems / this.perPage) + 1)
            };
        }
    },

    computed: {
        collection() {
            return this.paginate(this.products);
        }
    },
    created() {
        // this.paginate_total = this.heroes.length / this.paginate;
        this.setPage(this.page);
    },
}
</script>

<style scoped>
.table-user {
    background-color: white;
    color: #2c3e50;
    padding-bottom: 18px;
    margin-top: 28px;
    border-radius: 12px;
    position: relative;
    height: auto;
}

.user-boder {
    border-top: 1px solid #bdc3c7;
    padding: 0 24px;
    padding-top: 12px;
}

.user-title {
    padding: 0 24px;

}

.table-title {
    display: flex;

}

.v-title {
    width: 30% !important;
}

.table-title p {
    width: 20%;
    margin-top: 64px;
    padding: 0 8px;
}

.table-title span {
    width: 10%;
}

.table-content {
    display: flex;
    font-size: 0.9rem;
}

.table-content p {
    width: 20%;
    padding: 8px;
}

.table-content span {
    width: 10%;
    padding: 8px 0;

}

.title {
    background-color: #0c2461;
    color: white;
    padding: 16px;
    position: absolute;
    width: 94%;
    top: -3%;
    left: 3%;
    border-radius: 10px;
}

.table-content-name {
    display: flex;
    width: 30%;
    padding: 8px 0;
}

.table-content-img {
    width: 20%;
}

.table-content-img img {
    width: 100%;
    padding: 4px;
}

.content-name {
    width: 80% !important;
    padding: 0 0 0 8px !important;
    font-weight: 500;
    font-size: 0.8rem;
}

.add-product {
    color: white;
    padding: 8px;
    margin-right: 32px;
    margin-top: 12px;
    background-color: #0c2461;
    width: 150px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
}

.add-product:hover {
    background-color: #487eb0;
}

.add-product a {
    color: white;
    text-decoration: none;
}

.AddProductAdm {
    margin-top: 24px;
    background-color: white;
}

.soldoldGrenn {
    color: green;
    font-weight: 500;
}

.soldoldRed {
    color: red;
    font-weight: 500;
}

.fa-trash {
    margin-left: 32px;

}

.v-row {
    display: inline;
    margin: 0;
    padding: 8px 0;
    cursor: pointer;
}

.v-row span {
    margin-right: 12px;
}

.btn-primary {
    padding: 4px;
    background-color: #487eb0;
    color: white;
    margin: 4px;
}

::v-deep .v-pagination__list {
    justify-content: right;
    padding-right: 16px;
}
</style>