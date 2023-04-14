<template>
    <div class="content-pay">
        <div class="wrap">
            <div class="main " v-if="!isShowPay">
                <a href="">
                    <h4>TechGo</h4>
                </a>
                <ul class="breadcrumb">
                    <li class="breadcrumb-item"> <a href=""> Giỏ hàng > </a></li>
                    <li class="breadcrumb-item"> <a href=""> Thông tin giao hàng > </a></li>
                    <li class="breadcrumb-item"> <a href=""> Phương thức thanh toán </a></li>
                </ul>
                <div class="main-content">
                    <h3>Phương thức vận chuyển</h3>
                    <div class="section-shipping-rate">
                        <div class="order-checkout">
                            <div class="order-checkout-i">
                                <i class="fa-solid fa-truck"></i>
                                <p>Giao hàng tận nơi</p>
                            </div>
                            <div>
                                <p>0đ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-conten section-payment-method">
                    <h3>Phương thức thanh toán</h3>
                    <div class="section-shipping-rate">
                        <div class="order-checkout">
                            <div class="order-checkout-i">
                                <input type="checkbox" @click="directPayment()">
                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=4">
                                <p>Thanh toán khi nhận hàng(COD)</p>
                            </div>
                        </div>
                        <div class="order-checkout content-wrapper">
                            <div class="order-checkout-i">
                                <input type="checkbox">
                                <img src="https://hstatic.net/0/0/global/design/seller/image/payment/other.svg?v=4" alt="">
                                <p>Chuyển khoản qua ngân hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <a href="">Giỏ hàng</a>
                    <button @click="onClickShipping()">Hoàn tất đơn hàng</button>
                </div>
            </div>
            <div class="main " v-else>
                <a href="">
                    <h4>TechGo</h4>
                </a>
                <div class="oder-success">
                    <div class="i-check">
                        <i class="fa-regular fa-circle-check"></i>
                    </div>
                    <div class="check-text">
                        <h4>Đặt hàng thành công</h4>
                        <p>Mã đơn hàng #{{ auth.user.id }}</p>
                        <p>Cám ơn bạn đã mua hàng!</p>
                    </div>
                </div>
                <div class="section">
                    <div class="section-content">
                        <h5>Thông tin đơn hàng</h5>
                        <div class="infor-order">
                            <p>Thông tin giao hàng</p>
                            <p>{{ auth.user.firstname }} {{ auth.user.lastname }}</p>
                            <p>{{ auth.user.phone_number }}</p>
                            <p>{{ auth.user.address }}</p>
                            <p>Vietnam</p>
                        </div>
                        <div class="method-pay">
                            <p>Phương thức thanh toán</p>
                            <p>Thanh toán khi giao hàng (COD)</p>
                        </div>
                    </div>
                </div>
                <div class="step-footer">
                    <p class="step-footer-p">
                        <i class="fa-regular fa-circle-question"></i> Cần hỗ trợ? <a href="">Liên hệ chúng tôi</a>
                    </p>
                    <router-link to="/danh-sach-san-pham/:type"><button>Tiếp tục mua
                            hàng</button></router-link>
                </div>
            </div>
            <div class="sidebar">
                <div class="sidebar-content">
                    <div class="order-summary-sections" v-for="(oder, i) in groupedVariants" :key="i">
                        <div class="sidebar-content-img">
                            <img :src="oder.product_variant.images[0].image_path" alt="">
                            <p class="pay-name">{{ oder.product_variant.name }}</p>
                            <span class="content-span">{{ oder.qty }}</span>
                        </div>
                        <p>{{ priceProduct(oder.product_variant.price, oder.qty) }}</p>
                    </div>
                    <div class="form_discount_add-border">
                        <div class="form_discount_add">
                            <input type="text" placeholder="Mã giảm giá">
                            <button>Sử dụng</button>
                        </div>
                    </div>
                    <div class="payment-lines">
                        <div class="total-line-table">
                            <div class="total-line">
                                <p>Tạm tính</p>
                                <p>{{ totalPrice }}</p>
                            </div>
                        </div>
                        <div class="total-line-table">
                            <div class="total-line">
                                <p>Phí vận chuyển</p>
                                <p>Miễn phí</p>
                            </div>
                        </div>
                    </div>
                    <div class="total-line-table-footer">
                        <div class="total-line">
                            <p>Tổng cộng</p>
                            <div class="total-line-name">
                                <p class="total-line-name-p">VND</p>
                                <p>{{ totalPrice }}</p>
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
import { useUsersStore } from '@/stores/users'
import { useOderStore } from '@/stores/oders'
export default {
    data() {
        return {
            isShowPay: false,
            valOder: [],
        }
    },
    methods: {
        ...mapActions(useCartStore, [
            'getCarts'
        ]),
        ...mapActions(useUsersStore, [
            'getProfile'
        ]),
        ...mapActions(useOderStore, [
            'addOder'
        ]),

        async onClickShipping() {
            try {
                for (let i = 0; i < this.allCart.length; i++) {
                    const item = this.allCart[i];
                    const newItem = {
                        product_variant_id: item.product_variant.id,
                        qty: item.qty,
                        price: item.product_variant.price * item.qty,
                    };
                    this.valOder.push(newItem);
                }
                let oders = this.valOder
                await this.addOder(oders)
                this.isShowPay = true
            } catch (error) {
                console.log(error);
            }

        },
        directPayment() {
            console.log('hahaha');
        },
        priceProduct(price, qty) {
            let number = price * qty
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
        }
    },
    computed: {
        ...mapState(useCartStore, [
            'allCart'
        ]),
        ...mapState(useUsersStore, [
            'auth'
        ]),

        totalPrice() {
            let totalPrice = 0;
            this.allCart.forEach(item => {
                totalPrice += item.product_variant.price * item.qty;
            });
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(totalPrice);
        },
        groupedVariants() {
            const grouped = {};
            this.allCart.forEach(variant => {
                const key = variant.product_variant.id;
                if (!grouped[key]) {
                    grouped[key] = { ...variant };
                } else {
                    grouped[key].qty += variant.qty;
                }
            });
            return Object.values(grouped);
        }
    },

    created() {
        this.getCarts()
        this.getProfile()
    }
}
</script>

<style scoped>
:deep(.home-content) {
    display: none;
}

.wrap {
    display: flex;
}

.content-pay {
    /* margin: 0 134px;
    padding: 0 76px; */
}

.breadcrumb-item {
    display: inline-block;
    font-size: 0.85714em;
    color: #999999;
    margin-right: 4px;
    font-size: 0.7rem;
}

.breadcrumb li a:hover {
    color: #3498db;
}

.main {
    padding-top: 4rem;
    width: 50%;
    padding-right: 4rem;
    padding-left: 10rem;
}

.main a {
    text-decoration: none;
    color: black;

}

.main h4 {
    font-size: 1.5rem;
    font-weight: 600;
}

.order-checkout {
    display: flex;
    justify-content: space-between;
    border: 1px solid #dfe6e9;
    padding: 12px;
    color: #b2bec3;
}

.order-checkout-i {
    display: flex;
    align-items: center;
}

.fa-solid {
    color: #0984e3;
    margin-right: 6px;
}

.main-content h3 {
    margin-bottom: 12px;
    margin-top: 4px;
}

.section-payment-method {
    margin-top: 24px;
}

.section-payment-method h3 {
    margin-bottom: 12px;
}

.order-checkout-i img {
    padding: 6px;
}

.content-wrapper {
    border-top: none;
}

.step-footer {
    padding: 24px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.step-footer a {
    font-size: 0.9rem;
}

.step-footer a:hover {
    color: #1e3799;
}

.step-footer button {
    background-color: #0984e3;
    color: white;
    padding: 12px;
}

.step-footer button:hover {
    background-color: #0abde3;
}

.sidebar {
    width: 50%;
    background-color: #fafafa;
    padding-top: 4rem;
    padding-left: 4rem;
    padding-right: 10rem;
}

.sidebar-content-img {
    display: flex;
    width: 80%;
    position: relative;
    padding-top: 18px;
}

.sidebar-content-img img {
    width: 15%;
    border: 1px solid #576574;
    border-radius: 6px;
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.sidebar-content-img p {
    width: 80%;
}

.order-summary-sections {
    width: 100%;
    display: flex;
    padding-bottom: 12px;
    border-bottom: 1px solid #8395a7;
}

.content-span {
    position: absolute;
    bottom: 68%;
    background-color: #ccc;
    padding: 6px;
    width: 21px;
    height: 19px;
    left: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}

.sidebar-content-img p {
    font-size: 0.8rem;
    padding: 12px;
}

.order-summary-sections p {
    font-size: 0.9rem;
    padding: 16px 0;
}

.form_discount_add {
    margin: 20px 0;
    display: flex;

}

.form_discount_add input {
    border: 1px solid #8395a7;
    padding: 8px;
    width: 70%;
    outline: none;
}

.form_discount_add button {
    padding: 8px;
    background-color: #7f8fa6;
    width: 30%;
    margin-left: 12px;
    color: white;
}

.form_discount_add-border {
    border-bottom: 1px solid #8395a7;
}

.payment-lines {
    margin: 12px 0;
    color: #718093;
    border-bottom: 1px solid #8395a7;
}

.total-line {
    display: flex;
    justify-content: space-between;
}

.total-line-table {
    padding: 6px 0;
}

.total-line-name {
    display: flex;
    align-items: center;
}

.total-line-name-p {
    padding: 0 8px;
    color: #718093;
    font-size: 0.7rem;
}

.oder-success {
    display: flex;
    position: relative;
}

.i-check {
    top: 8%;
    position: absolute;
    left: -4%;
}

.fa-circle-check {
    color: #0984e3;
}

.check-text h4 {
    font-size: 1.2rem;
    padding: 4px 0;
}

.check-text p {
    color: #636e72;
    font-size: 0.9rem;
    padding: 2px 0;
}

.section {
    border: 1px solid #b2bec3;
    padding: 12px;
    margin-top: 12px;
}

.section-content h5 {
    margin-bottom: 6px;
}

.infor-order {
    font-size: 0.9rem;
    color: #636e72;
    margin-bottom: 6px;
}

.method-pay p {
    padding: 2px 0;
}

.fa-circle-questionƠ {
    font-size: 1rem;
    display: flex;
}

.step-footer-p a {
    margin-left: 3px;
}

.step-footer-p {
    font-size: 0.9rem;
    color: #636e72;
}

.pay-name {
    padding: 0 0 0 14px !important;

}
</style>