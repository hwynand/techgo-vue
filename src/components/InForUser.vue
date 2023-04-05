<template>
    <div class="user">
        <div class="user-info">
            <div class="user-info-block">
                <div class="user-info-left">
                    <h4>Tài khoản</h4>
                    <ul>
                        <li @click="selected = 'Acount'" :class="selected == 'Acount' ? 'info-color' : ''">Thông tin tài
                            khoản
                        </li>
                        <li @click="selected = 'ListAdress'" :class="selected == 'ListAdress' ? 'info-color' : ''">Danh sách
                            địa
                            chỉ</li>
                        <!-- <li @click="selected = 'OderDetail'" :class="selected == 'OderDetail' ? 'info-color' : ''">Chi tiết
                            đơn
                            hàng</li> -->
                        <li @click="selected = 'UpdatePW'" :class="selected == 'UpdatePW' ? 'info-color' : ''">Đổi mật khẩu
                        </li>
                    </ul>
                </div>
                <div class="user-info-right">
                    <component :is="selected" :userData="auth.user" :allOders="allOders"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useUsersStore } from '@/stores/users';
import { useOderStore } from '@/stores/oders';


import Acount from './InForUserAccount.vue';
import ListAdress from './InForUserAdress.vue';
import UpdatePW from './UpdatePassword.vue';

export default {
    components: {
        Acount,
        ListAdress,
        UpdatePW,
    },

    data() {
        return {
            selected: 'Acount',
        }
    },

    methods: {
        ...mapActions(useUsersStore, [
            'getProfile'
        ]),
        ...mapActions(useOderStore, [
            'getOders'
        ]),
    },

    computed: {
        ...mapState(useUsersStore, [
            'auth'
        ]),
        ...mapState(useOderStore, [
            'allOders'
        ]),
    },

    async created() {
        try {
            await this.getProfile()
            await this.getOders()
            console.log('allOders', this.allOders);
        } catch (error) {
            console.log(error);
        }

    },
}
</script>

<style scoped>
.info-color {
    background-color: #95959585;
    color: #0652DD;
}

.user-info {
    background-color: #e7e6e685;
    padding: 60px 0;
    margin-bottom: 50px;
    border-top: 1px solid #eae4e8;

}

.user-info-block {
    display: flex;

}

.user-info-left {
    padding: 60px 50px;
    width: 25%;
}

.user-info-left h4 {
    padding: 6px;
    border-bottom: 1px solid #eae4e8;
}

.user-info-left li {
    list-style: none;
    padding: 6px;
    font-size: 0.9rem;
    cursor: pointer;
}

.user-info-left li:hover {
    color: #2980b9;
    transition: 0.5s;
}

.user-info-right {
    width: 75%;
    border-left: 1px solid #eae4e8;
}

:deep(.header-left a) {
    text-decoration: none;
    color: white;
}
</style>