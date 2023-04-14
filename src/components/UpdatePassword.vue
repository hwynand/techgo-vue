<template>
    <div class="user-h2">
        <h2>Đổi mật khẩu</h2>
    </div>
    <div class="update-password">
        <form>
            <div class="update-password-box">
                <label>Mật khẩu cũ:</label>
                <input type="password" placeholder="nhập mật khẩu cũ..." autocomplete="on" v-model="oldPassword">
            </div>
            <div class="update-password-box">
                <label>Mật khẩu mới:</label>
                <input type="password" placeholder="nhập mật khẩu mới..." autocomplete="on" v-model="passwordNew">
            </div>
            <div class="update-password-box">
                <label>Mật lại khẩu mới:</label>
                <input type="password" placeholder="nhập lại mật khẩu mới..." autocomplete="on"
                    v-model="dataUpdateUser.password">
            </div>
        </form>
        <span class="errMessage">{{ errMessage }}</span>
        <button @click="updatePassword">Update</button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useUsersStore } from '@/stores/users';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            dataUpdateUser: {
                password: ''
            },
            passwordNew: '',
            errMessage: '',
            oldPassword: '',
        }
    },

    props: {
        userData: {
            type: Object,
            required: true,
        },

        allOders: {
            type: Array,
            required: true,
        }
    },

    methods: {
        ...mapActions(useUsersStore, [
            'updateProfile',
            'getProfile'
        ]),

        async updatePassword() {
            try {
                let data = this.dataUpdateUser
                if (this.passwordNew === data.password) {
                    await this.updateProfile({ data })
                    Swal.fire({
                        icon: 'success',
                        title: 'Đổi mật khẩu thành công',
                    })
                    this.passwordNew = ''
                    data.password = ''
                    this.oldPassword = ''
                } else {
                    Swal.fire('Mật khẩu mới không khớp')
                }

            } catch (error) {
                this.errMessage = error.response.data.detail
            }
        }

    },
    computed: {

    },

    created() {
        console.log('created', this.allOders);
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
    /* top: 27%; */
}

.update-password {
    padding-left: 15%;
}

.update-password input {
    border: 1px solid #34495e;
    width: 70%;
    margin-bottom: 6px;
    padding: 4px 12px;
    border-radius: 6px;
    color: #34495e;
}

.update-password input:focus {
    outline: 1px solid #3498db;
}

.update-password-box {
    display: flex;
    align-items: center;
}

.update-password-box label {
    width: 15%;
    font-weight: 600;
}

.update-password button {
    border: 1px solid #273c75;
    padding: 6px 12px;
    width: 30%;
    margin-top: 12px;
    border-radius: 6px;
    margin-left: 10%;
    cursor: pointer;
    transition: 0.3s linear;
}

.update-password button:hover {
    background-color: #487eb0;
    color: white;
    border: 1px solid white;
    transition: 0.3s all;
}

.errMessage {
    color: red;
    margin-left: 17%;
    font-size: 0.8rem;
}
</style>