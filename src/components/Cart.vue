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
                            <p>Bạn đang có <span> <b>{{ tatalProduct }} sản phẩm</b></span> trong giỏ hàng</p>
                        </div>
                        <div class="table-cart">
                            <div class="media-items" v-for="(cart, index) in allCart" :key="index">
                                <div class="media-items-img">
                                    <a href=""><img :src="cart.product_variant.images[0].image_path" alt=""></a>
                                    <div class="media-items-delete" @click="handaleDeleteCart(cart.id)">
                                        <p>Xoá</p>
                                    </div>
                                </div>
                                <div class="media-items-price-detail">
                                    <p>{{ cart.product_variant.name }}</p>
                                    <p>
                                        <span class="items-span">{{ formatPrice(cart.product_variant.price, cart.qty)
                                        }}</span>
                                        <!-- <span class="items-span" :class="[cart.qty > 0 ? 'items-underlined' : '']">{{
                                            cart.product_variant.price
                                        }}</span> -->
                                    </p>
                                </div>
                                <div class="media-items-price-pay">
                                    <p>{{ priceOder }}</p>
                                    <div class="btn-cart">
                                        <button @click="onClickMinus(cart, cart.product_variant.id)"><i
                                                class="fa-solid fa-minus"></i></button>
                                        <p>{{ cart.qty }}</p>
                                        <button @click="onClickPlus(cart, cart.product_variant.id)"><i
                                                class="fa-solid fa-plus"></i></button>
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
                                <button @click="handalePay()">Thanh toán</button>
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
import { mapActions, mapState } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useOderStore } from '@/stores/oders'
import Swal from 'sweetalert2';

export default {
    components: {

    },
    data() {
        return {
            numberCart: 1,
            newPrice: 0,
            priceOneProduct: 0,
            qtyCart: 0,
            // variants: [
            //     {
            //         id: 68,
            //         product_variant: {
            //             id: 18,
            //             product_id: 8,
            //             name: 'iphone14-promax-vàng',
            //             color: '#fff200',
            //             sku: 'ip1T',
            //             price: 49990000,
            //             inventory: 15,
            //             images: [
            //                 {
            //                     id: 75,
            //                     image_path: 'https://pxh09.cloud/files/cc37639890af62ce.png'
            //                 }
            //             ]
            //         },
            //         qty: 1
            //     },
            //     {
            //         id: 69,
            //         product_variant: {
            //             id: 18,
            //             product_id: 8,
            //             name: 'iphone14-promax-vàng',
            //             color: '#fff200',
            //             sku: 'ip1T',
            //             price: 49990000,
            //             inventory: 15,
            //             images: [
            //                 {
            //                     id: 75,
            //                     image_path: 'https://pxh09.cloud/files/cc37639890af62ce.png'
            //                 }
            //             ]
            //         },
            //         qty: 1
            //     },
            //     {
            //         id: 70,
            //         product_variant: {
            //             id: 18,
            //             product_id: 8,
            //             name: 'iphone14-promax-vàng',
            //             color: '#fff200',
            //             sku: 'ip1T',
            //             price: 49990000,
            //             inventory: 15,
            //             images: [
            //                 {
            //                     id: 75,
            //                     image_path: 'https://pxh09.cloud/files/cc37639890af62ce.png'
            //                 }
            //             ]
            //         },
            //         qty: 1
            //     },
            //     {
            //         id: 71,
            //         product_variant: {
            //             id: 19,
            //             product_id: 8,
            //             name: 'iphone14-promax-tím',
            //             color: '#be2edd',
            //             sku: 'ip1T',
            //             price: 49990000,
            //             inventory: 15,
            //             images: [
            //                 {
            //                     id: 76,
            //                     image_path: 'https://pxh09.cloud/files/cc3f67ed16d13a63.jpg'
            //                 }
            //             ]
            //         },
            //         qty: 1
            //     }
            // ]

        }
    },
    methods: {
        ...mapActions(useCartStore, ['getCarts', 'addCart', 'deleteCart']),
        ...mapActions(useOderStore, ['addOder']),

        async onClickPlus(cart) {
            try {
                const id = cart.id
                const cartValue = {
                    product_variant_id: cart.product_variant.id,
                    qty: cart.qty += 1
                }
                console.log('update', id, cartValue);
                await this.updateCart(id, cartValue)
                await this.getCarts()
            } catch (error) {
                console.log(error);
            }
        },

        async onClickMinus(cart) {

            try {
                const id = cart.id
                const cartValue = {
                    product_variant_id: cart.product_variant.id,
                    qty: cart.qty -= 1
                }
                if (cartValue.qty === 0) {
                    this.deleteCart(id)
                    this.getCarts()
                }
                // console.log('cartValue', cartValue.qty);

                // if (cart.qty > 0) {
                //     this.cartValue.product_variant_id = cart.product_variant.id
                //     this.cartValue.qty = cart.qty -= 1
                //     await this.updateCart(id, this.cartValue)
                //     await this.getCarts()
                // } else {
                //     this.handaleDeleteCart(id)
                // }
            } catch (error) {
                console.log(error);
            }
        },

        formatPrice(price, qty) {
            this.priceOneProduct = price
            this.qtyCart = qty
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
        },

        async handaleDeleteCart(id) {
            Swal.fire({
                title: 'Bạn muốn xoá sản phẩm ra khỏi giỏ hàng?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                    this.deleteCart(id)
                    this.getCarts()
                } else {
                    this.getCarts()
                }
            })

        },

        handalePay() {
            const isLoggedIn = localStorage.getItem('isLoggedIn')
            const userData = localStorage.getItem('user')
            if (isLoggedIn && userData) {
                this.$router.push({ path: '/thanh-toan' })
            } else {
                Swal.fire('Bạn chưa đăng nhập')
            }
        },

    },

    computed: {
        ...mapState(useCartStore, ['allCart', 'count', 'totalCart', 'cartValue', 'updateCart']),


        totalPrice() {
            let totalPrice = 0;

            this.allCart.forEach(item => {
                totalPrice += item.product_variant.price * item.qty;
            });
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(totalPrice);
        },

        tatalProduct() {
            return this.count
        },

        priceOder() {
            const number = this.priceOneProduct * this.qtyCart
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
        },

        // filteredProducts() {
        //     // Lọc ra các phần tử có product_variant giống nhau
        //     const filtered = this.products.filter((product, index, self) =>
        //         index ===
        //         self.findIndex((t) => (
        //             t.product_variant.id === product.product_variant.id
        //         ))
        //     );

        //     // Cộng qty của các phần tử có product_variant giống nhau lại
        //     const reduced = filtered.reduce((acc, product) => {
        //         const existingProduct = acc.find(
        //             (p) => p.product)
        //     }),
        // groupedVariants() {
        //     const grouped = {};
        //     this.variants.forEach(variant => {
        //         const key = variant.product_variant.id;
        //         if (!grouped[key]) {
        //             grouped[key] = { ...variant };
        //         } else {
        //             grouped[key].qty += variant.qty;
        //         }
        //     });
        //     return Object.values(grouped);
        // }

    },

    async created() {
        try {
            const isLoggedIn = localStorage.getItem('isLoggedIn')
            const userData = localStorage.getItem('user')
            if (isLoggedIn && userData) {
                await this.getCarts()
                console.log('cartall', this.allCart);
            }

        } catch (error) {
            console.log(error);
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

.btn-cart {
    display: flex;
    align-items: center;
    padding: 6px 0;
}

.btn-cart button {
    border: 0.5px solid #f3f4f4;
    background-color: #f9f9f9;
    height: 28px;
    width: 28px;
    float: left;
    font-weight: 500;
}

.btn-cart p {
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
    align-items: center;
    font-size: 1.2rem;
    font-weight: 400;
    border-bottom: 1px solid #b2bec3;
    padding-bottom: 12px;
}

.Content-right-span {
    font-size: 1.5rem;
    font-weight: bold;
    color: red;
    margin-left: 24px;
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