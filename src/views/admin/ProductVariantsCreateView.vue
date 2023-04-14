<template>
    <div class="add-products">
        <div class="add-products-content">
            <h3>Thông tin cơ bản</h3>
            <p>Ảnh sản phẩm</p>
            <div>
                <div class="box-image">
                    <div class="img-product" v-for="(image, index) in images" :key="index">
                        <img :src="image" />
                        <button class="img-btn" @click="removeImage(index)"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <!-- <div class="img-product" v-else>
                        <img :src="productVariant.images?.[0].image_path" />
                        <button class="img-btn" @click="removeImage(index)"><i class="fa-solid fa-xmark"></i></button>
                    </div> -->
                    <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar"
                        prepend-icon="mdi-camera" label="Avatar" @change="onFileChange"></v-file-input>
                </div>
                <div class="box-input box-margin">
                    <p>Mã SKU (*) :</p>
                    <input type="text" v-model="productVariant.sku">
                </div>
                <div class="box-input">
                    <p>Tên sản phẩm (*) :</p>
                    <input type="text" v-model="productVariant.name">
                </div>
                <div class="box-input input-color">
                    <p>Mã màu (*) :</p>
                    <input type="text" v-model="productVariant.color">
                </div>
                <div class="box-input">
                    <p>Giá sản phẩm (*) :</p>
                    <input type="number" v-model="productVariant.price">
                </div>
                <div class="box-input">
                    <p>Số Lượng Tồn Kho:</p>
                    <input type="number" v-model="productVariant.inventory">
                </div>
                <div class="flex-btn">
                    <button v-if="isShowEditVariant && valProductVariant" class="box-btn" @click="updateProductVanriants()">
                        Update
                    </button>
                    <button v-else class="box-btn" @click="createProductVanriants()">
                        Thêm sản phẩm
                    </button>
                    <button class="box-btn" @click="$emit('handaleClose')">Huỷ</button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useProductsStore } from '@/stores/products'
export default {
    data() {
        return {
            uploadImg: null,
            images: [],
            productVariant: {
                name: '',
                sku: '',
                color: '',
                price: '',
                inventory: '',
                images: []
            },
            page: 1,
            size: 10,
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        valProductVariant: {
            type: Object,
            required: true,
        },
        isShowEditVariant: {
            type: Boolean,
            required: true,
        }
    },
    methods: {
        ...mapActions(useProductsStore, [
            'uploadImage',
            'addProductVariant',
            'getProducts',
            'getProductVariants',
            'updateProductVariant',
        ]),

        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files);
            this.uploadImg = files
        },
        createImage(files) {
            var vm = this;
            for (var index = 0; index < files.length; index++) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    const imageUrl = event.target.result;
                    vm.images.push(imageUrl);
                }
                reader.readAsDataURL(files[index]);
            }
        },
        removeImage(index) {
            this.images.splice(index, 1)
        },
        async createProductVanriants() {
            try {
                let images
                const cb = (data, image_path) => {
                    images = { ...data, images: [{ image_path }] }
                    return
                }
                await this.uploadImage(this.uploadImg, { ...this.productVariant }, cb)
                await this.addProductVariant(this.id, images)
                await this.getProductVariants(this.id)
                this.$emit('handaleClose')
                console.log(1);
            } catch (error) {
                console.log(error);
            }
        },
        async updateProductVanriants() {
            try {
                let images
                const cb = (data, image_path) => {
                    images = { ...data, images: [{ image_path }] }
                    return
                }
                await this.uploadImage(this.uploadImg, { ...this.productVariant }, cb)
                this.productVariant.images.splice(0, 1, { image_path: this.image_path })
                await this.updateProductVariant(this.id, this.productVariant.id, this.productVariant)
                await this.getProductVariants(this.id)
                this.$emit('handaleClose')
            } catch (error) {
                console.log(error);
            }

        }
    },
    computed: {
        ...mapState(useProductsStore, [
            'image_path',
            'params',
            'detailVariant',
        ]),

    },

    created() {
        if (this.valProductVariant) {
            this.productVariant = this.valProductVariant
        }

    }
}
</script>

<style scoped>
.add-products {
    color: black;
    padding: 24px 46px 46px 46px;
}

.img-product {
    width: 10%;
    padding: 12px;
    position: relative;
}

.img-product img {
    width: 100%;
    height: 100%;
    object-fit: cover;

}

.box-image {
    display: flex;
    border: 1px dashed black;
    height: 100px;
    position: relative;
}

.img-btn {
    position: absolute;
    top: 0%;
    right: 7%;
}

.box-input {
    margin-bottom: 12px;
    width: 70%;
    display: flex;
}

.box-input p {
    width: 18%;
    padding: 4px;
}

.box-input input {
    width: 82%;
    border: 1px solid rgb(149, 149, 149);
    padding: 2px 8px;
    height: 32px;
}

.box-input input:focus {
    outline: 1px solid #ccc;
}

.box-margin {
    margin-top: 48px;
}

.box-input select {
    border: 1px solid rgb(149, 149, 149);
    width: 82%;
    padding: 2px 8px;
    height: 32px;
}

.add-products-content h3 {
    margin-bottom: 12px;
}

.add-products-content p {
    margin-bottom: 8px
}

.box-btn {
    background-color: #0c2461;
    padding: 8px 12px;
    color: white;
    border-radius: 12px;
    margin-right: 24px;
}

.box-btn:hover {
    background-color: #487eb0;
}

.flex-btn {
    display: flex;
    margin-left: 40%;
}

:deep(.v-input__control) {
    display: none;
}

:deep(.v-input__prepend) {
    position: absolute;
    top: 90%;
    left: 50%;
}

:deep(.v-input__prepend i) {
    font-size: 2.5rem;
}
</style>