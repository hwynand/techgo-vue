<template>
    <div class="add-products">
        <div class="add-products-content">
            <h3>Thông tin cơ bản</h3>
            <p>Ảnh sản phẩm</p>
            <div class="">
                <div class="box-image">
                    <div class="img-product" v-for="(image, index) in images" :key="index">
                        <img :src="image" />
                        <button class="img-btn" @click="removeImage(index)"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                    <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar"
                        prepend-icon="mdi-camera" label="Avatar" multiple @change="onFileChange"></v-file-input>
                </div>
                <div class="box-input box-margin">
                    <p>Tên sản phẩm (*) :</p>
                    <input type="text">
                </div>
                <div class="box-input">
                    <p>Mã sản phẩm (*) :</p>
                    <input type="text">
                </div>
                <div class="box-input">
                    <p>Giá sản phẩm (*) :</p>
                    <input type="number">
                </div>
                <div class="box-input">
                    <p>Tình Trạng :</p>
                    <select name="" id="">
                        <option value="Chọn" selected disabled>Chọn</option>
                        <option value="Còn Hàng">Còn Hàng </option>
                        <option value="Hết hàng">Hết hàng </option>
                    </select>
                </div>
                <div class="flex-btn">
                    <button class="box-btn">Thêm mới sản phẩm</button>
                    <button class="box-btn" @click="$emit('handleClose')">Huỷ</button>
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
            upload: null,
            images: []
        }
    },
    methods: {
        onFileChange(e) {

            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files);
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
        }
    },
    mounted() {

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

::v-deep .v-input__control {
    display: none;
}

::v-deep .v-input__prepend {
    position: absolute;
    top: 90%;
    left: 50%;
}

::v-deep .v-input__prepend i {
    font-size: 2.5rem;
}
</style>