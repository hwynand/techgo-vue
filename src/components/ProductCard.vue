<template>
    <div class="product-card" @click.prevent="handleClickProductDetailView(id)">
        <div class="cards">
            <div class="card card--1">
                <div class="card__img"></div>
                <div class="card_link">
                    <div class="card__img--hover">
                        <img :src="url" alt="">
                    </div>
                </div>
                <div class="card__info">
                    <span class="card__category">{{ brand }}</span>
                    <div class="details">
                        <h3 class="card__title  portalTitle">
                            {{ name }}
                        </h3>
                    </div>
                    <span @click="click" class="card__by ">
                        <span href="#" class="card__price">{{ formatPrice }}</span>
                    </span>

                    <!-- ----------------modal -->
                    <div class="text-center">
                        <v-btn class="btn_add-cart " @click="showDetailModal(id)">
                            <span class="cart_span"><i class="fa-solid fa-cart-shopping"></i></span>
                            <span class="add-cards">Thêm giỏ hàng</span>
                            <div class="transition"></div>

                            <v-dialog v-model="dialog" activator="parent" width="auto">
                                <v-card>
                                    <div class="content-modal">
                                        <div class="modal-left">
                                            <v-carousel hide-delimiters v-model="currentIndex">
                                                <v-carousel-item v-for="(item, i) in detailProduct.product_variants"
                                                    :key="i" :src="item.images[0]?.image_path" cover></v-carousel-item>
                                            </v-carousel>
                                            <div class="modal-left-img">
                                                <div class="item-img" v-for="(item, i) in detailProduct.product_variants"
                                                    :key="i" @click="goToSlideIndex(i)">
                                                    <img :src="item.images[0]?.image_path" alt="">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-right">
                                            <h4>{{ detailProduct.name }}</h4>
                                            <div class="product-center">
                                                <p class="modal-status">Tình trạng:
                                                    <span
                                                        :class="[detailProduct.product_variants?.[currentIndex].inventory > 0 ? 'statusGold' : 'statusRed']">
                                                        {{ detailProduct.product_variants?.[currentIndex].inventory > 0 ?
                                                            'CònHàng' : 'Hết Hàng' }}
                                                    </span>
                                                    <!-- <span>{{ detailProduct.product_variants }}</span> -->
                                                </p>
                                                <span>Thương Hiệu:
                                                    <span class="Trademark">
                                                        {{ detailProduct.brand?.name }}
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="Content-right-price">
                                                <span>Giá: </span>
                                                <span class="Content-right-span">{{
                                                    onDiscount }}</span>
                                            </div>
                                            <div class="product-color">
                                                <div class="box-color">
                                                    <p>Màu sắc: </p>
                                                </div>
                                                <p class="product-color-Gold" :class="items.name"
                                                    :style="{ backgroundColor: items.color }"
                                                    v-for="(items, i) in detailProduct.product_variants" :key="i"
                                                    @click="clickColor(i)">
                                                </p>
                                                <!-- <p class="product-color-gray"></p>
                                                <p class="product-color-black"></p>
                                                <p class="product-color-Gold"></p>
                                                <p class="product-color-moss_green"></p>
                                                <p class="product-color-violet"></p> -->
                                            </div>
                                            <div class="product-number">
                                                <p style="width:25%">Số Lượng:</p>
                                                <button @click="onClickMinus()"><i class="fa-solid fa-minus"></i></button>
                                                <p class="product-number-p">{{ number }}</p>
                                                <button @click="onClickPlus()"><i class="fa-solid fa-plus"></i></button>
                                            </div>
                                            <div class="wrapper">
                                                <a href="#0" @click="AddCart()" class="btn_add-cart" data-bs-toggle="modal">
                                                    <span class="cart_span"><i class="fa-solid fa-cart-shopping"></i></span>
                                                    <span class="add-cards">Thêm giỏ hàng</span>
                                                    <div class="transition"></div>
                                                </a>
                                            </div>
                                            <div class="detail">
                                                <p @click="handleClickProductDetailView(id)">Xem chi tiết sản phẩm <i
                                                        class="fa-solid fa-angles-right"></i></p>
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
                                </v-card>
                            </v-dialog>
                        </v-btn>
                    </div>
                </div>
                <!-- <div class="card__info-hover">
                    <div class="card__clock-info">
                        <svg class="card__clock" viewBox="0 0 24 24">
                            <path
                                d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
                        </svg>
                        <span class="card__time">15 min</span>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import Swal from 'sweetalert2';

export default {
    props: {
        url: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        brand: {
            type: String,
            required: true,
        },

        id: {
            type: Number,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        }


    },
    data() {
        return {
            dialog: false,
            currentIndex: 0,
            number: 1,
        }
    },

    methods: {
        ...mapActions(useProductsStore, [
            'getDetailProduct',
        ]),
        ...mapActions(useCartStore, [
            'addCart',
        ]),

        click() {
            console.log('click');
        },

        handleClickProductDetailView(id) {
            this.$router.push({ path: `/san-pham/${id}` })
        },

        goToSlideIndex(index) {
            this.currentIndex = index;
        },
        showDetailModal(id) {
            // console.log('id', id);
            this.getDetailProduct({ id })
        },
        clickColor(i) {
            this.currentIndex = i;
        },
        onClickPlus() {
            let index = this.currentIndex;
            let inventory = this.detailProduct.product_variants?.[index].inventory
            if (inventory > 0 && this.number < inventory) {
                this.number += 1;
            } else {
                alert('sản phẩm đã hết hàng')
            }
        },
        onClickMinus() {
            if (this.number > 1) {
                this.number = this.number - 1;
            }
        },
        async AddCart() {
            try {
                let index = this.currentIndex;
                let inventory = this.detailProduct.product_variants[index].inventory

                // const checkAut = this.checkLoggedIn()
                const isLoggedIn = localStorage.getItem('isLoggedIn')
                const userData = localStorage.getItem('user')
                if (!isLoggedIn && !userData) {
                    this.$router.push({ path: '/dang-nhap' })
                } else if (inventory > 0) {
                    let val = this.detailProduct.product_variants[index].id
                    this.cartValue.product_variant_id = val
                    this.cartValue.qty = this.number
                    const res = await this.addCart(this.cartValue)
                    this.dialog = false
                    alert('Đã thêm sản phầm vào giỏ hàng')
                } else {
                    alert('sản phẩm đã hết hàng')

                }

            } catch (error) {
                console.log(error);
            }
        },

    },

    computed: {
        ...mapState(useProductsStore, [
            'detailProduct'
        ]),
        ...mapState(useCartStore, [
            'cartValue'
        ]),


        formatPrice() {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(this.price);
        },

        brandShow() {
            return this.getDetailProduct.brand.name
        },

        onDiscount() {
            let index = this.currentIndex;
            let price = this.detailProduct.product_variants?.[index].price;
            if (this.number == 1) {
                return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
            } else {
                let newPrice = price * this.number
                return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(newPrice);
            }
        },

    },

    created() {
        console.log('price', this.price);
    }
}
</script>

<style scoped>
/* .product-card {
    height: 100%;
} */
:deep(.v-dialog) {
    align-items: end !important;
}

.details {
    font-size: 1rem;
    margin-right: 5px;
    cursor: pointer;
    text-align: left;
}

.details h3 {
    font-size: 1rem;
    font-weight: 600;
    height: 50px;
}

.portalTitle {
    margin: auto;
    margin-left: 10px;
    font: Arial;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5em;
    overflow: hidden;
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}

.cards {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: auto;
    height: 100%;
}

.card--1 .card__img--hover img {
    padding: 4px;
    width: 100%;
    object-fit: contain;
    height: 100%;
    transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
    border-radius: 8px;
}

.card__like {
    width: 18px;
}

.card__clock {
    width: 15px;
    vertical-align: middle;
    fill: #AD7D52;
}

.card__time {
    font-size: 12px;
    color: #AD7D52;
    vertical-align: middle;
    margin-left: 5px;
}

.card__clock-info {
    float: right;
}

.card__img {
    visibility: hidden;
    width: 100%;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}

.card__info-hover {
    position: absolute;
    padding: 16px;
    width: 100%;
    opacity: 0;
    top: 0;
}

.card__img--hover {
    transition: 0.2s all ease-out;
    width: 100%;
    position: absolute;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    top: 0;

}

.card {
    margin-right: 25px;
    transition: all .4s cubic-bezier(0.175, 0.885, 0, 1);
    background-color: #fff;
    width: 15%;
    position: relative;
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

}

.card:hover {
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.card__info {
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    padding: 18px 18px 0 18px;
}

.card__category {
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 2px;
    font-weight: 500;
    color: #868686;
}


.card__title {
    margin: 16px 0;
    font-size: 0.9rem;
}

.card__by {
    font-size: 12px;
    font-family: 'Raleway', sans-serif;
    font-weight: 500;
}

.card__price {
    font-weight: 600;
    text-decoration: none;
    color: #0a3d62;
    font-size: 1rem;
}

.btn_add-cart {
    text-transform: uppercase;
    text-align: center;
    position: relative;
    text-decoration: none;
    display: inline-block;
    height: 40px;
}

.add-cards {
    font-weight: 600;
    color: #4b4b4b !important;
}

.btn_add-cart span {
    color: black;
}

.btn::before {
    content: '';
    position: absolute;
    bottom: 50%;
    left: 0px;
    width: 100%;
    height: 1px;
    background: #6098FF;
    display: block;
    transform-origin: left top;
    transform: scale(0, 1);
    transition: transform 0.4s cubic-bezier(1, 0, 0, 1);
}

.btn_add-cart {
    width: 80%;
    padding: 8px;
    margin: 10px 0;
    font-size: 14px;
    color: #fff;
    text-align: center;
    text-transform: capitalize;
    border: 1px solid #fff;
    border-radius: 24px;
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
    background: #f6e58d;
    position: absolute;
    transform: skewX(-20deg);
    left: -10%;
    opacity: 1;
    top: 0;
    z-index: -12;
    transition: all .3s cubic-bezier(0.77, 0, 0.175, 1);
    box-shadow: 2px 0px 14px rgba(0, 0, 0, .6);
    color: white !important;
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

:deep(.modal) {
    width: 500px !important;
    height: 400px !important;
    background: white !important;
}

:deep(.btn_add-cart) {
    height: 40px !important;
    margin: 24px 0;
    width: 94%;

}


.modal-left {
    width: 50%;
    padding: 20px;
}

.modal-right {
    width: 50%;
    padding: 20px 0;
}

.modal-right h4 {
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 12px;
}

.item-img {
    width: 20%;
}

.item-img img {
    width: 100%;
    height: 60px;
    object-fit: contain;
    padding: 6px;
}

.modal-left-img {
    display: flex;
}

.content-modal {
    display: flex;
}

.statusGold {
    color: rgb(249, 187, 1);
    margin-left: 4px;
    font-weight: 600;
    font-size: 1rem;
}

.statusRed {
    color: #e84118;
    margin-left: 4px;
    font-weight: 600;
}

.Content-right-price {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 400;
    border-bottom: 1px solid #b2bec3;
    padding-bottom: 12px;
}

.Content-right-price span {
    font-weight: 600;
    font-size: 1.3rem;
}

.Content-right-price .Content-right-span {
    font-size: 1.5rem;
}

.Content-right-span {
    font-size: 1.9rem !important;
    font-weight: bold;
    color: red;
    margin-left: 24px;
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

.product-color-Gold {
    background-color: #fffa65;
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

.product-number {
    display: flex;
    font-size: 1rem;
    align-items: center;
    margin: 12px 0;
}

.product-number p {
    font-weight: 500;
    margin-right: 12px;
    padding: 6px;
    margin-right: 0 !important;
}

.product-number-p {
    padding: 0 18px !important;
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

.product-number p {}

:deep(.v-carousel) {
    height: 450px !important;
}

:deep(.v-carousel-item) {
    padding: 6px;
}

.product-item-i {
    display: flex;
    align-items: center;
}

.product-item-i i {
    padding: 8px;
    font-size: 1.5 rem;
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

.modal-status {
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.box-color p {
    font-weight: 600;
    margin-right: 12px;
}

.product-center {
    width: 100%;
    display: flex;
    padding: 6px;
    font-size: 1.5rem;
}

.product-center span {
    font-size: 0.9rem;
    margin-bottom: 8px;
}

.product-center p {
    margin-right: 12px;
}


.Trademark {
    color: rgb(249, 187, 1);
    margin-left: 4px;
    font-weight: 600;
}

.detail {
    margin-bottom: 12px;
    cursor: pointer;
}

.detail p {
    color: #e67e22;
}

:deep(.v-img__img--cover) {
    object-fit: contain;
}

:deep(.v-overlay__content) {
    width: 60vw !important;
    max-height: none !important;
}

:deep(.v-carousel-item .v-img) {
    max-width: 80% !important;
    margin: auto;
}
</style>