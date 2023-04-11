<template>
    <div class="sign-in">
        <div class="sign-in-box">
            <div class="login-box">
                <h2>Admin Shop</h2>
                <div class="user-box">
                    <input type="text" name="email" required="" v-model="email">
                    <label>Email</label>
                </div>
                <div class="user-box">
                    <input type="password" name="password" required="" v-model="password" @keyup.enter="singInAdmin()">
                    <label>Password</label>
                </div>
                <a class="user-a" @click="singInAdmin">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Đăng nhập
                </a>
                <router-link to="/" class="TechGo">
                    <h4>TechGo Shop</h4>
                </router-link>
            </div>
            <div class="view-img">
                <span class="mask bg-gradient-dark"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useUsersStore } from '@/stores/users'
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            email: 'admin@admin.com',
            password: 'adminadmin',
        }
    },
    methods: {
        ...mapActions(useUsersStore, [
            'login'
        ]),
        async singInAdmin() {
            try {
                let email = this.email
                let password = this.password
                const res = await this.login({ email, password })
                if (res.status === 200 && this.auth.user.is_admin === true) {
                    this.$router.push({ path: '/admin' })
                } else {
                    Swal.fire('bạn không có quyền truy cập')
                }
            } catch (error) {
                Swal.fire({
                    title: error.response.data.detail,
                })
            }
        }
    },
    computed: {
        ...mapState(useUsersStore, [
            'auth'
        ]),
    },

}
</script>

<style scoped>
.sign-in-box {
    padding-top: 7.5rem;
}

.sign-in {
    background: linear-gradient(#29323c, #485563);
    position: relative;

    background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
    background-size: cover;
}

.login-box {
    margin: auto;
    width: 400px;
    padding: 40px;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
    /* background: linear-gradient(#141e30, #243b55); */
    background: transparent;
    position: absolute;
    z-index: 1;
    left: 37%;
    padding-top: 6rem;
}

.login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #03e9f4;
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
    top: -20px;
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
    margin-top: 40px;
    letter-spacing: 4px;
    width: 100%;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
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
    bottom: - 100%;
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
    top: 1%;
    left: 1%;
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

.mask {
    position: absolute;
    background-size: cover;
    background-position: center center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
}

.bg-gradient-dark {
    background-image: linear-gradient(195deg, #42424a 0%, #191919 100%);
}

.view-img {
    min-height: 100vh;
}
</style>