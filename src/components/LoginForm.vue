<script>
import { mapActions } from 'pinia'
import { useUsersStore } from '@/stores/users'
import { useCartStore } from '@/stores/cart'
import { api } from '../api'

export default {
  data() {
    return {
      email: 'test9@gmail.com',
      password: 'Duydung@1',
      wrongEmail: false,
      wrongPw: false,
      store: useUsersStore(),
    }
  },
  methods: {
    ...mapActions(useUsersStore, ['login']),
    ...mapActions(useCartStore, ['getCarts']),

    isEmailValid() {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (regex.test(this.email)) {
        this.wrongEmail = false;
      } else {
        this.wrongEmail = true;
      }
    },

    isPasswordValid() {
      const regexPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
      if (regexPw.test(this.password)) {
        this.wrongPw = false;
      } else {
        this.wrongPw = true;
      }

    },

    render() {
      location.reload();
    },

    async signIn() {
      try {
        const data = {
          email: this.email,
          password: this.password
        }
        const res = await this.store.login(data)
        console.log('res', res);
        if (res.status === 200) {
          this.$router.push({ path: '/' })
          this.getCarts()
        }
      } catch (error) {
        this.wrongEmail = true;
        this.wrongPw = true;
      }
    },
  }
}
</script>

<template>
  <div class="sign-in">
    <div class="sign-in-box">
      <div class="login-box">
        <h2>Login</h2>
        <div class="user-box">
          <input type="text" name="email" required="" v-model="email" @change="isEmailValid">
          <span v-show="wrongEmail">Email không đúng </span>
          <label>Email</label>
        </div>
        <div class="user-box">
          <input type="password" name="password" required="" v-model="password" @change="isPasswordValid"
            @keyup.enter="signIn()">
          <span v-if="wrongPw">Mật khẩu phải có ít nhất 8 kí tự, bao gồm 1 chữ hoa,<br> 1 chữ
            thường, 1 chữ số, 1 kí
            tự đặc biệt</span>
          <label>Password</label>
        </div>
        <button class="user-a" href="#" @click="signIn()">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Đăng nhập
        </button>
        <div class="sign-up">
          <p>Bạn chưa có tài khoản? <router-link to="/dang-ky">Đăng ký</router-link></p>
          <p>Quên mật khẩu? <a href="">Lấy lại mật khẩu</a></p>
        </div>
        <router-link to="/" class="TechGo">
          <h4>TechGo Shop</h4>
        </router-link>
      </div>
    </div>
    <button @click="isEmailValid">a</button>
  </div>
</template>
<style scoped>
.sign-in-box {
  padding-top: 5rem;
}

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
  /* background: linear-gradient(#141e30, #243b55); */
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
  margin-bottom: 24px;
}

.login-box .user-box span {
  color: #ff7675;
  font-size: 12px;
  margin: 10px 0;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 10px;
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
  top: -30px;
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
  margin-top: 30px;
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

.login-box button span {
  position: absolute;
  display: block;
}

.login-box button span:nth-child(1) {
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

.login-box button span:nth-child(2) {
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

.login-box button span:nth-child(3) {
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

.login-box button span:nth-child(4) {
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

:deep(.v-btn) {
  display: none;
}
</style>