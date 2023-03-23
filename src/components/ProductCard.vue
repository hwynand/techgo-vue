<template>
    <div class="product-card">
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
                        <span href="#" class="card__price">25.000.000đ</span>
                    </span>
                    <div class="wrapper">
                        <a href="#0" class="btn_add-cart">
                            <span class="cart_span"><i class="fa-solid fa-cart-shopping"></i></span>
                            <span class="add-cards">Thêm giỏ hàng</span>
                            <div class="transition"></div>
                        </a>
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
        }
    },

    methods: {
        click() {
            console.log(this.name);
        }
    }
}
</script>

<style scoped>
/* .product-card {
    height: 100%;
} */

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

.wrapper {
    text-align: center;
    width: 100%;
    position: relative;
    color: white;
}

.btn_add-cart {
    text-transform: uppercase;
    text-align: center;
    position: relative;
    text-decoration: none;
    display: inline-block;
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
</style>