<template>
    <div class="user-h2">
        <h2>Thông tin địa chỉ</h2>
    </div>
    <div class="List-adress">
        <div class="List-adress-block">
            <div class="List-adress-left">
                <div class="List-adress-left-items">
                    <h5>duy dũng</h5>
                    <div class="items-span">
                        <span><i class="fa-solid fa-pen-to-square"></i></span>
                        <span><i class="fa-solid fa-trash"></i></span>
                    </div>
                </div>
                <div class="large-view">
                    <div class="lb-left">
                        <h5>Công ty:</h5>
                        <h5>Địa chỉ:</h5>
                        <h5>Số điện thoại:</h5>
                    </div>
                    <div class="lb-right">
                        <p>JVB Việt nam</p>
                        <p>Tố hữu - Nam Từ Niêm - Hà Nội</p>
                        <p>0123456789</p>
                    </div>
                </div>
            </div>
            <div class="List-adress-right">
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-title>Nhập địa chỉ mới</v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <div>
                                <div class="input-group">
                                    <span><i class="fa-solid fa-user-large"></i></span>
                                    <input type="text" placeholder="Họ và Tên">
                                </div>
                                <div class="input-group">
                                    <span><i class="fa-solid fa-city"></i></span>
                                    <input type="text" placeholder="Công ty">
                                </div>
                                <div class="input-group">
                                    <span><i class="fa-solid fa-hotel"></i></span>
                                    <input type="text" placeholder="Địa chỉ">
                                </div>
                                <div class="input-group">
                                    <span><i class="fa-solid fa-user-large"></i></span>
                                    <select name="" id="">
                                        <option class="option-group" value="Thành Phố" selected>Thành Phố</option>
                                        <option v-for="(items, index) in items" :key="index" :value="items[index]">
                                            {{ items }}</option>
                                    </select>
                                </div>
                                <div class="input-group">
                                    <span><i class="fa-solid fa-earth-americas"></i></span>
                                    <select name="" id="">
                                        <option value="Việt Nam" selected>Việt Nam</option>
                                        <option value="Việt Nam">Trung Quốc</option>
                                        <option value="Việt Nam">Mỹ</option>
                                    </select>
                                </div>
                                <div class="input-group">
                                    <span><i class="fa-solid fa-phone"></i></span>
                                    <input type="text" placeholder="Điện thoại">
                                </div>
                                <div class="checkbox-group">
                                    <div class="checkbox-group-input">
                                        <input type="checkbox" placeholder="Điện thoại">
                                        <span>Đặt làm mặc định</span>
                                    </div>
                                    <div class="checkbox-group-button">
                                        <button>Thêm mới</button>
                                        <span>hoặc</span>
                                        <a href="">Huỷ</a>
                                    </div>
                                </div>
                            </div>

                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            items: ['Hà Nội', 'Hồ Chí Minh', 'đà nẵng', 'an giang', 'bà rịa - vũng tàu', 'hải phòng', 'thanh hoá', 'nghệ an', 'bình dương', 'quàng ninh', 'bình phước'],
        }
    }
}
</script>

<style scoped>
.user-h2 {
    margin-bottom: 24px;
}

.user-h2 h2 {
    display: flex;
    justify-content: center;
    position: relative;
    font-weight: 600;
}

.user-h2::after {
    content: '';
    width: 80px;
    height: 2px;
    background-color: black;
    position: absolute;
    right: 35%;
    /* top: 26%; */
}

.List-adress {
    padding: 0 32px;
    height: auto;
}

.List-adress-left {
    width: 50%;
    box-shadow: 0 0 6px rgb(0 0 0 / 8%);
    margin: 0 12px;
    height: 140px;
}

.List-adress-left-items {
    display: flex;
    background-color: #d9edf7;
    border-color: #bce8f1;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px 6px 0 0;
}

.List-adress-left-items h5 {
    padding: 14px 16px;
}

.items-span span i {
    padding: 6px;
    margin-right: 12px;
}

.large-view {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 0 0 6px 6px;
}

.lb-left {
    width: 30%;
}

.lb-left h5 {
    padding: 6px 12px;
}

.lb-right {
    width: 70%;
}

.lb-right p {
    padding: 6px;
    font-size: 0.8rem;
}

.List-adress-right {
    width: 50%;
    padding: 0 12px;
}

.List-adress-block {
    display: flex;
}

.input-group {
    margin-bottom: 12px;
    display: flex;
}

.input-group span {
    background-color: #dfe4ea;
    padding: 6px;
}

.input-group input {
    width: 90%;
    outline: none;
    border: 1px solid #dfe4ea;
    padding: 4px 12px;
}

.input-group select {
    width: 90%;
    outline: none;
    border: 1px solid #dfe4ea;
    padding: 4px 12px;
    font-size: 0.8rem;
    color: #57606f;
    text-transform: capitalize;
}

.input-group input::placeholder {
    font-size: 0.8rem;
}

.option-group {
    font-size: 0.8rem;
}

.checkbox-group-input {
    display: flex;
}

.checkbox-group-input span {
    font-size: 0.9rem;
    margin-left: 6px;
}

.checkbox-group-button {
    padding: 12px 0;
}

.checkbox-group-button button {
    padding: 6px;
    background-color: black;
    color: white;
    width: 150px;
    text-transform: uppercase;
}

.checkbox-group-button span {
    margin: 0 8px;
}

.checkbox-group-button a {
    text-decoration: none;
    color: black;
}

.checkbox-group-button a:hover {
    color: #1e90ff;
}

:deep(.v-expansion-panel--active>.v-expansion-panel-title) {
    min-height: 0;
}

:deep(.v-expansion-panel-title) {
    background-color: black;
    color: #ffffff;
}
</style>