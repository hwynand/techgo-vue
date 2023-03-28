<template>
    <div class="Cart">
        <div class="Cart-content">
            <div class="Cart-content--items">
                <div class="items-cart">
                    <p>Trang chủ /</p>
                    <p>Giỏ hàng ({{ tatalProduct }})</p>
                </div>
                <div class="Cart-content-block">
                    <div class="Content-block-left">
                        <h3>Giỏ hàng của bạn</h3>
                        <div class="left-p">
                            <p>Bạn đang có <span> <b>{{ numberCart }} sản phẩm</b></span> trong giỏ hàng</p>
                        </div>
                        <div class="table-cart">
                            <div class="media-items" v-for="(cart, index) in cart" :key="index">
                                <div class="media-items-img">
                                    <a href=""><img :src="cart.thumnail_image_links[0]" alt=""></a>
                                    <div class="media-items-delete">
                                        <p>Xoá</p>
                                    </div>
                                </div>
                                <div class="media-items-price-detail">
                                    <p>{{ cart.name }}</p>
                                    <p>
                                        <span class="items-span">{{ cart.price }}</span>
                                        <span class="items-span" :class="[cart.sale > 0 ? 'items-underlined' : '']">{{
                                            cart.old_price
                                        }}</span>
                                    </p>
                                </div>
                                <div class="media-items-price-pay">
                                    <p>{{ cart.price }}</p>
                                    <div class="btn">
                                        <button @click="onClickMinus(index)"><i class="fa-solid fa-minus"></i></button>
                                        <p>{{ numberCart }}</p>
                                        <button @click="onClickPlus(index)"><i class="fa-solid fa-plus"></i></button>
                                    </div>
                                </div>
                            </div>
                            <!-- ---------------------------------------------------------------- -->
                            <div class="note">
                                <div class="container-note">
                                    <p>Ghi chú đơn hàng</p>
                                    <div class="note-textarea">
                                        <textarea class="form-control" id="note" name="note" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div class="invoice">
                                <v-expansion-panels>
                                    <v-expansion-panel>
                                        <v-expansion-panel-title>Xuất hoá đơn cho đơn hàng</v-expansion-panel-title>
                                        <v-expansion-panel-text>
                                            <div class="form-group">
                                                <input type="text" value="" placeholder="Tên công ty...">
                                                <input type="text" value="" placeholder="Mã số thuế...">
                                                <input type="text" value="" placeholder="Email...">
                                            </div>
                                            <div class="form-adress">
                                                <input type="text" value="" placeholder="Địa chỉ công ty...">
                                            </div>
                                            <button class="save-info">Lưu thông tin</button>
                                        </v-expansion-panel-text>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </div>
                        </div>
                    </div>
                    <!-- ------------------------------------------------------------------>
                    <div class="Content-block-right">
                        <div class="block-items">
                            <div class="Content-right-pay">
                                <h3>Thông tin đơn hàng</h3>
                                <div class="Content-right-price">
                                    <span>Tổng Tiền: </span>
                                    <span class="Content-right-span">{{ totalPrice }}</span>
                                </div>
                            </div>
                            <div class="Content-right-ul">
                                <ul>
                                    <li>Phí vận chuyển sẽ được tính ở trang thanh toán.</li>
                                    <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
                                </ul>
                                <router-link to="/pay"><button>Thanh toán</button></router-link>
                            </div>
                        </div>
                        <div class="Policy">
                            <div class="alert-order">
                                <p class="textmr">Chính sách mua hàng:</p>
                                <p>Hiện chúng tôi chỉ áp dụng thanh toán với đơn hàng có giá trị tối thiểu
                                    <b>400.000₫</b> trở lên.
                                </p>
                            </div>
                        </div>
                        <div class="promotion">
                            <div class="promotion-content">
                                <div class="title-coupon">
                                    <h2>Khuyến mãi dành cho bạn</h2>
                                </div>
                                <div class="promotion-box">
                                    <div class="promotion-content-block">
                                        <div class="block-image">
                                            <img src="https://theme.hstatic.net/200000516791/1000880762/14/home_coupon_1_img.png?v=2258"
                                                alt="">
                                        </div>
                                        <div class="block-content">
                                            <div class="block-content-header">
                                                <h3>Miễn phí vận chuyển</h3>
                                                <p>Đơn hàng từ 300k</p>
                                            </div>
                                            <div class="block-content-footer">
                                                <div>
                                                    <p>Mã: <b>A87TYRT55</b></p>
                                                    <p>HSD: 10/04/2022</p>
                                                </div>
                                                <div>
                                                    <button class="btn-code btn-1">Sao chép mã</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="promotion-content-block">
                                        <div class="block-image">
                                            <img src="https://theme.hstatic.net/200000516791/1000880762/14/home_coupon_2_img.png?v=2258"
                                                alt="">
                                        </div>
                                        <div class="block-content">
                                            <div class="block-content-header">
                                                <h3>Giảm 20%</h3>
                                                <p>Đơn hàng từ 200k</p>
                                            </div>
                                            <div class="block-content-footer">
                                                <div>
                                                    <p>Mã: <b>QH5G8J0Y</b></p>
                                                    <p>HSD: 05/05/2022</p>
                                                </div>
                                                <div>
                                                    <button class="btn-code btn-1">Sao chép mã</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {

    },
    data() {
        return {
            cart: [
                {
                    name: "Smart Tivi NanoCell LG 4K 50 inch 50NANO86TPA",
                    soldold: "Còn hàng",
                    vendor: "LG",
                    old_price: "24.900.000đ",
                    price: "20.916.000đ",
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
                    name: "Smart Tivi NanoCell LG 4K 50 inch 50NANO86TPA",
                    soldold: "Còn hàng",
                    vendor: "LG",
                    old_price: "24.900.000đ",
                    price: "20.916.000đ",
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
            ],
            numberCart: 1,
            newPrice: 0,
            cartItems: [],

        }
    },
    methods: {
        // onDiscount(data) {
        //     data.old_price - data.old_price * data.sale;
        // },

        // formatOldPrice(data) {
        //     let oldPrice = data.old_price
        //     return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(oldPrice);
        // },

        onClickPlus() {
            this.numberCart = this.numberCart + 1
        },

        onClickMinus(index) {
            if (this.numberCart <= 0) {
                return
            } else {
                this.numberCart = this.numberCart - 1
                console.log(index);
            }
        },

        addTocart(products) {
            if (this.cartItems.includes(products)) {
                alert("already there");
            } else {
                this.cartItems.push(products);
            }
        },


    },

    computed: {
        totalPrice() {
            let total = 0;
            total += this.cartItems.reduce((left, cur) => left + cur.price, 0);
            return total;

        },

        tatalProduct() {
            return this.cart.length
        }
    }
}
</script>

<style scoped>
.Cart-content {
    background-color: #e7e6e685;
}

.Cart-content--items {
    margin-left: 40px;
    margin-right: 32px;
}

.items-cart {
    display: flex;
    margin-left: 16px;
}

.items-cart p {
    padding: 4px;
    font-size: 0.8rem;
    margin-top: 6px
}

.Cart-content-block {
    display: flex;
}

.Content-block-left {
    margin: 12px 16px;
    background-color: white;
    width: 70%;
    border-radius: 4px;
    box-shadow: 0 0 6px rgb(0 0 0 / 8%)
}

.Content-block-left h3 {
    padding: 10px 15px;
    font-weight: 700;
    font-size: 20px;
}

.left-p {
    border-top: 1px solid #bdbcbc98;
    height: auto;
    padding: 4px 15px;
    color: rgba(72, 72, 72, 0.8);
}

.Content-block-right {
    width: 30%;
    margin: 12px 0;

}

.block-items {
    background-color: white;
    padding: 10px 15px;
    border-radius: 4px;
    box-shadow: 0 0 6px rgb(0 0 0 / 8%)
}

.table-cart {
    padding: 8px 10px;
}

.media-items {
    padding: 10px;
    border: 2px solid #eae4e8;
    overflow: hidden;
    border-radius: 8px;
    display: flex;
    margin-bottom: 12px;
}

.media-items-img {
    position: relative;
    width: 10%;
    padding: 4px;
}

.media-items-img img {
    width: 100%;
}

.media-items-delete {
    position: absolute;
    top: -5%;
    left: -3%;
    background-color: #636e72;
    width: 20px;
    height: 20px;
    padding: 2px;
    border-radius: 50%;
    font-size: 0.55rem;
    display: flex;
    align-items: center;
    color: white;
    cursor: pointer;
}

.items-span {
    color: #8f9bb3;
    font-size: 0.8rem;
    padding: 12px 0;
    margin-right: 10px;
}

.items-underlined {
    text-decoration: line-through;
}

.media-items-price-detail {
    padding-left: 12px;
    width: 75%;
}

.media-items-price-pay {
    width: 15%;
}

.media-items-price-pay p {
    font-weight: 600;

}

.btn {
    display: flex;
    align-items: center;
    padding: 6px 0;
}

.btn button {
    border: 0.5px solid #f3f4f4;
    background-color: #f9f9f9;
    height: 28px;
    width: 28px;
    float: left;
    font-weight: 500;
}

.btn p {
    border: 0.5px solid #f3f4f4;
    height: 28px;
    width: 36px;
    padding: 0 12px;
    float: left;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
}

.note {
    background-color: #f3f4f4;
    margin-top: 24px;
}

.container-note p {
    padding: 0 12px;
    padding-top: 12px;
}

.container-note textarea {
    width: 100%;
    background-color: white;
    border: 1px solid #b2bec3;
    padding: 12px;
    outline: none;
    font-size: 0.9rem;
    color: #2d3436;
    height: auto;
    resize: none;
    border-radius: 8px;
}

.note-textarea {
    padding: 12px;
}

.Content-right-pay h3 {
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 1.5rem;
}

.Content-right-price {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    font-weight: 400;
    border-bottom: 1px solid #b2bec3;
    padding-bottom: 12px;
}

.Content-right-span {
    font-size: 1.5rem;
    font-weight: bold;
    color: red;
}

.Content-right-ul li {
    list-style: none;
    font-size: 0.9rem;
    padding: 2px 0;
    color: #636e72;
}

.Content-right-ul button {
    background: red;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    padding: 10px 5px;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    border-radius: 0;
    margin-top: 12px;
    width: 100%;
    border-radius: 4px;

}

.Content-right-ul button:hover {
    background-color: #e84118;
    transition: 0.3s linear;
    box-shadow: 0 0 6px rgb(0 0 0 / 8%);
}

.Policy {
    margin: 16px 0;
    border-radius: 4px;
    box-shadow: 0 0 6px rgb(0 0 0 / 8%);
}

.alert-order {
    padding: 12px 15px;
    border-radius: 4px;
    background-color: #d9edf7;
}

.alert-order p {
    padding: 4px;
    font-size: 0.9rem;
    color: #636e72;
}

.textmr {
    font-weight: 600;
    color: black !important;

}

.invoice {
    margin-top: 12px
}

.form-group input {
    padding: 4px 12px;
    margin: 0 12px;
    border: 1px solid #dcdde1;
    width: 30%;
    outline: none;
    font-size: 0.8rem;
}

.form-group input::placeholder {
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
}

.form-adress input {
    padding: 4px 12px;
    border: 1px solid #dcdde1;
    width: 95.2%;
    margin: 8px 12px;
    outline: none;

}

.form-adress input::placeholder {
    font-size: 0.9rem;
}

.save-info {
    border-radius: 4px;
    padding: 6px;
    border: 1px solid #dcdde1;
    width: 200px;
    margin: 0 12px;
    background-color: #f3f4f4;
    box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
}

.save-info:hover {
    background-color: #dcdde1;
}

.promotion-content {
    background-color: white;
    border-radius: 4px;
}

.title-coupon h2 {
    font-size: 1rem;
    padding: 8px 16px;
    font-weight: 500;
}

.promotion-content-block {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dcdde1;
    margin: 12px;
    border-radius: 12px;
}

.block-image {
    width: 25%;
}

.block-image img {
    width: 100%;
    padding: 8px;
}

.block-content {
    width: 75%;
    padding: 6px 16px;
    border-left: 1px dashed #dcdde1;
}

.block-content-header {
    font-size: 0.7rem;
    margin-bottom: 24px;
}

.block-content-footer {
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
}

.btn-code {
    background: none;
    transition: color 0.2s linear;
    position: relative;
    background-color: #f9bb01;
    color: white;
    padding: 4px;
    border-radius: 20px;
    width: 100px;
    z-index: 1;
}

.btn-code:hover {
    color: #fff;
    border-radius: 20px;
}

.btn-code::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-color: #60a3bc;
    z-index: -1;
    transition: transform 0.3s linear;
    /* transform-origin: 0 0; */
    border-radius: 20px;
    box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));

}

.btn-1:before {
    transform: scaleX(0);
}

.btn-1:hover::before {
    transform: scaleX(1);
}

.promotion-box {
    padding-bottom: 12px;
}

:deep(.v-expansion-panel--active>.v-expansion-panel-title) {
    min-height: 0;
}

:deep(.content-left-items) {
    z-index: 2;
}

:deep(.header-left a) {
    text-decoration: none;
    color: white;
}

a {
    text-decoration: none;
    color: white;
}
</style>