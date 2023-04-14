<template>
    <div class="user-h2" v-if="!showDetailOrder">
        <h2>Tài khoản của bạn</h2>
    </div>
    <div v-if="!showDetailOrder">
        <div class="acount">
            <div class="acount-info">
                <h4 @click="click">THÔNG TIN TÀI KHOẢN</h4>
                <ul>
                    <li>{{ userData.firstname }} {{ userData.lastname }}</li>
                    <li>{{ userData.email }} </li>
                    <li>{{ userData.address }}</li>
                    <li>{{ userData.phone_number }}</li>
                    <li>
                        <v-row>
                            <v-dialog v-model="dialog" persistent width="auto">
                                <template v-slot:activator="">
                                    <p class="modal-p" @click="openModalUpdate()">Thay đổi </p>
                                </template>
                                <v-card>
                                    <v-card-title class="text-h5">
                                        Thay đổi thông tin tài khoản
                                    </v-card-title>

                                    <v-card-text>
                                        <div class="form-modal">
                                            <p>Email: {{ userData.email }}</p>
                                        </div>
                                        <div class="form-modal">
                                            <input name="firstname" type="text" placeholder="First Name"
                                                v-model="dataUpdateUser.firstname" />
                                        </div>
                                        <div class="form-modal">
                                            <input name="lastname" type="text" placeholder="Last Name"
                                                v-model="dataUpdateUser.lastname" />
                                        </div>
                                        <div class="form-modal">
                                            <input name="phone" type="text" placeholder="Phone"
                                                v-model="dataUpdateUser.phone_number" />
                                        </div>
                                        <div class="form-modal">
                                            <input name="address" type="text" placeholder="Address"
                                                v-model="dataUpdateUser.address" />
                                        </div>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                                            Close
                                        </v-btn>
                                        <v-btn color="green-darken-1" variant="text"
                                            @click="dialog = false, onSubmitUpdateUser()">
                                            Update
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-row>
                    </li>
                </ul>

            </div>
            <div class="customer_orders">
                <div class="customer-table-wrap">
                    <div class="customer-table">
                        <h4>Danh sách đơn hàng mới nhất</h4>
                        <div>
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Mã đơn hàng
                                        </th>
                                        <th class="text-left">
                                            Ngày đặt
                                        </th>
                                        <th class="text-left">
                                            Thành tiền
                                        </th>
                                        <th class="text-left">
                                            Trạng thái thanh toán
                                        </th>
                                        <th class="text-left">
                                            Vận chuyển
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="items-td" v-for="(item, i) in allOders" :key="item.name">
                                        <td><a @click="detailOder(item)">
                                                #{{ item.code }}
                                                <i class="fa-solid fa-eye"></i></a>
                                        </td>
                                        <td>4/4/2023</td>
                                        <td>{{ formatPrice(item) }}</td>
                                        <td>{{ item.status === 0 ? 'Chờ xử lý' : 'Đang giao hàng' }}</td>
                                        <td>Chờ xử lý</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <detailOder :valDetailOder="valDetailOder" :userData="userData"></detailOder>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useUsersStore } from '@/stores/users';
import detailOder from './InForUserOders.vue';
export default {
    components: {
        detailOder
    },

    data() {
        return {
            dialog: false,
            dataUpdateUser: {
                firstname: '',
                lastname: '',
                email: '',
                phone_number: '',
                address: '',
            },
            showDetailOrder: false,
            valDetailOder: [],
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


        click() {
            console.log(this.userData, 81);
        },

        reload() {
            location.reload();
        },

        openModalUpdate() {
            this.dialog = true
            console.log(this.dataUpdateUser);
        },

        async onSubmitUpdateUser() {
            try {
                const data = this.dataUpdateUser
                delete data.email
                await this.updateProfile({ data })
                this.getProfile()

            } catch (error) {
                console.log(error);
            }
        },

        validateEmail(value) {
            // email để trống
            if (!value) {
                this.wrongEmail = false;
                return 'This field is required';
            }

            // email không hợp lệ
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
                this.wrongEmail = false;
                return 'This field must be a valid email';
            }
            this.wrongEmail = true;
            return true;
        },
        formatPrice(item) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.total);
        },
        detailOder(item) {
            this.valDetailOder = item
            this.showDetailOrder = true
            console.log('item', item);
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

.acount {
    padding: 0 50px;
    margin-bottom: 50px;
    /* border: 1px solid #eae4e8; */
}

.acount-info li {
    padding: 6px 12px;
    list-style: none;
    font-size: 0.9rem;
}

.acount-info h4 {
    font-weight: 600;
    border-bottom: 1px solid #eae4e8;
    padding: 6px;
}

.customer-table-wrap {
    background-color: #d9edf7;
    padding: 8px 10px;
    margin: 30px 0;
}

.customer-table {
    background-color: white;
}

.customer-table h4 {
    padding: 4px 12px;
    border-bottom: 1px solid #d9edf7;
}

.text-left {
    width: 20%;
}

.items-td td {
    border-bottom: none !important;
    font-size: 0.9rem;
    color: #34495e;
}

.items-td a {
    color: #34495e;
    text-decoration: none;
}

.items-td a:hover {
    color: #2980b9;
}

.modal-p {
    text-decoration: underline;
    color: #137fc8;
    padding: 6px 12px;
    cursor: pointer;
}

.form-modal {
    margin-bottom: 12px;
}

.form-modal input {
    padding: 4px 8px;
    border: 1px solid black;
    width: 100%;
    border-radius: 6px;
}

.form-modal span {
    font-size: 12px;
    padding: 4px;
    color: red;
}

tr {
    cursor: pointer;
}

.fa-eye {
    margin-left: 6px;
}

:deep(.v-dialog .v-overlay__content) {
    max-height: 0;
}

:deep(.v-card) {
    width: 500px;
}
</style>