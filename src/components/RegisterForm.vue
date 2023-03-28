<template>
    <div class="sign-in">
        <div class="sign-in-box">
            <div class="login-box">
                <h2>Đăng ký</h2>
                <div class="user-box">
                    <input type="text" name="firstname" required="" v-model="dataSignUp.firstName">
                    <span v-if="wrongFirstName">Vui lòng không để trống </span>
                    <label>First name</label>
                </div>
                <div class="user-box">
                    <input type="text" name="lastname" required="" v-model="dataSignUp.lastName">
                    <span v-if="wrongLastName">Vui lòng không để trống </span>
                    <label>Last name</label>
                </div>
                <div class="user-box">
                    <input type="text" name="email" required="" v-model="dataSignUp.email">
                    <span v-if="wrongEmail">Vui lòng nhập email </span>
                    <!-- <span v-if="errEmail">{{ errEmail }} </span> -->
                    <label>Email</label>
                </div>
                <div class="user-box ">
                    <input type="password" name="password" required="" v-model="dataSignUp.password"
                        @change="isPasswordValid">
                    <!-- <span v-if="errPassword">{{ errPassword }} </span> -->
                    <span v-if="wrongPw" class="wrong-pw">Mật khẩu phải có ít nhất 8 kí tự, bao gồm 1 chữ hoa,<br> 1 chữ
                        thường, 1 chữ số, 1 kí
                        tự đặc biệt</span>
                    <label class="box-lable">Password</label>
                </div>
                <div class="user-box">
                    <input type="text" name="phone_number" required="" v-model="dataSignUp.phone_number"
                        @change="isPhoneValid">
                    <span v-if="error">{{ error }} </span>
                    <label class="box-lable">Phone</label>
                </div>
                <div class="user-box">
                    <input type="Địa chỉ" name="address" required="" v-model="dataSignUp.address" @change="isAddressValid">
                    <span v-if="wrongAddress">Vui lòng không để trống </span>
                    <label>Địa chỉ</label>
                </div>
                <a class="user-a" href="#" @click="signIn">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Đăng Ký
                </a>
                <div class="sign-up">
                    <p>Quay lại trang? <router-link to="/dang-nhap">Đăng Nhập</router-link></p>
                </div>
                <router-link to="/" class="TechGo">
                    <h4>TechGo Shop</h4>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

import Swal from 'sweetalert2';
import { api } from '../api';
import { mapActions } from 'pinia';
import { useUsersStore } from '@/stores/users'

export default {
    data() {
        return {
            dataSignUp: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone_number: '',
                address: '',
            },
            error: '',
            // errEmail: '',
            // errPassword: '',
            wrongFirstName: false,
            wrongLastName: false,
            wrongEmail: false,
            wrongPw: false,
            wrongAddress: false,
        }
    },
    methods: {
        ...mapActions(useUsersStore, ['register']),
        async signIn() {
            try {
                let email = this.dataSignUp.email
                let password = this.dataSignUp.password
                let firstname = this.dataSignUp.firstName
                let lastname = this.dataSignUp.lastName
                let address = this.dataSignUp.address
                let phone_number = this.dataSignUp.phone_number
                const data = {
                    email,
                    password,
                    firstname,
                    lastname,
                    address,
                    phone_number
                }
                const res = await this.register({ data })
                console.log('res', res);
                if (res.status == 200) {
                    Swal.fire({
                        title: 'Đăng ký success',
                        icon: 'success',
                        confirmButtonText: 'Success',
                    })
                    this.$router.push({ path: '/dang-nhap' })
                }
                // const res = await api.register(data)
                // if (res.status == 200) {
                //     Swal.fire({
                //         title: 'Đăng ký success',
                //         icon: 'success',
                //         confirmButtonText: 'Success',
                //     })
                //     this.$router.push({ path: '/dang-nhap' })
                // }
            } catch (error) {
                if (this.dataSignUp.address == '') {
                    this.wrongAddress = true;
                } else {
                    this.wrongAddress = false;
                }

                // ------
                if (this.dataSignUp.firstName == '') {
                    this.wrongFirstName = true;
                } else {
                    this.wrongFirstName = false;
                }

                // -----
                if (this.dataSignUp.lastName == '') {
                    this.wrongLastName = true;
                } else {
                    this.wrongLastName = false;
                }

                this.wrongEmail = true;
                this.wrongPw = true;
                this.error = 'Nhập số điện thoại hợp lệ';

            }
        },

        isEmailValid() {
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (regex.test(this.dataSignUp.email)) {
                this.wrongEmail = false;
            } else {
                this.wrongEmail = true;
            }

        },

        isPasswordValid() {
            const regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
            if (regexPw.test(this.dataSignUp.password)) {
                this.wrongPw = false;
            } else {
                this.wrongPw = true;
            }

        },

        isPhoneValid() {
            const telRegex = /^1?\s?(\(\d{3}\)|\d{3})(\s|-)?\d{3}(\s|-)?\d{4}$/gm
            if (telRegex.test(this.dataSignUp.phone_number)) {
                this.error = ''
            } else {
                this.error = 'Please enter a valid telephone number';
            }
        }
    }
}
</script>

<style scoped>
/* .sign-in-box {
    padding-top: 2rem;
} */

.sign-in {
    background: linear-gradient(#29323c, #485563);
    position: relative;
    min-height: 100vh;
    background-image: url('https://p.w3layouts.com/demos_new/template_demo/28-07-2017/glassy_login_form-demo_Free/1756538463/web/images/bann.jpg');
    background-size: cover;
}

.login-box {
    margin: auto;
    width: 400px;
    padding: 40px;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
    background: linear-gradient(#141e30, #243b55);
    background: transparent;

}

.login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
}

.login-box .user-box {
    position: relative;
}

.login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: transparent;
}

.login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #fff;
    pointer-events: none;
    transition: .5s;
}

.login-box .user-box input:focus~label,
.login-box .user-box input:valid~label {
    top: -26px;
    left: 0;
    color: #03e9f4;
    font-size: 12px;
}

.login-box .user-a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #03e9f4;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    /* margin-top: 40px; */
    letter-spacing: 4px;
    width: 100%;
    border-radius: 4px;
    text-align: center;
}

.login-box .user-a:hover {
    /* background: #03e9f4; */
    color: #fff;
    box-shadow: 0 0 5px #03e9f4,
        0 0 5px #03e9f4,
        0 0 25px #03e9f4,
        0 0 100px #03e9f4;
}

.login-box a span {
    position: absolute;
    display: block;
}

.login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #03e9f4);
    animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%,
    100% {
        left: 100%;
    }
}

.login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #03e9f4);
    animation: btn-anim2 1s linear infinite;
    animation-delay: .25s
}

@keyframes btn-anim2 {
    0% {
        top: -100%;
    }

    50%,
    100% {
        top: 100%;
    }
}

.login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #03e9f4);
    animation: btn-anim3 1s linear infinite;
    animation-delay: .5s
}

@keyframes btn-anim3 {
    0% {
        right: -100%;
    }

    50%,
    100% {
        right: 100%;
    }
}

.login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #03e9f4);
    animation: btn-anim4 1s linear infinite;
    animation-delay: .75s
}

@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }

    50%,
    100% {
        bottom: 100%;
    }
}

.sign-up {
    color: white;
    padding: 8px 0;
}

.sign-up a {
    color: #45aaf2;
    text-decoration: none;
    padding-left: 3px;
}

.sign-up p {
    padding: 4px 0;
}

.TechGo {
    position: absolute;
    top: 5%;
    left: 7%;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    padding: 0 6px;
    width: 200px;
    height: 30px;
    display: flex;
    align-items: center;
    border-radius: 4px;
}

.TechGo {
    color: white;
    text-decoration: none;
}

.TechGo:hover {
    color: #2d98da;
}

.login-box .user-box span {
    left: 60%;
    color: red;
    font-size: 12px;
    margin: 10px 0;
    position: absolute;
    width: 100%;
    top: 38px;
}

.box-lable {
    color: #03e9f4;
}

.wrong-pw {
    left: 15% !important;
}

:deep(#header .header-fixed .home-content) {
    display: none !important;
}

/* ::v-deep(.home-content) {
    display: none !important;
} */
:deep(.header-fixed[data-v-6c285e9a]) {
    display: none;
}
</style>