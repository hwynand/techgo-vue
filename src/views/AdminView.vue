<template>
    <div class="MenuAdmin">
        <div class="admin-content">
            <div class="admin-box admin-left">
                <div class="techgo-header">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <span>TechGo Shop</span>
                </div>
                <ul class="menu-list">
                    <li @click="selected = 'UserManagement'" :class="[selected == 'UserManagement' ? 'color-grenn' : '']">
                        <i class="fa-solid fa-id-card"></i>
                        <span>User Management</span>
                    </li>
                    <li @click="selected = 'ProductManagement'"
                        :class="[selected == 'ProductManagement' ? 'color-grenn' : '']">
                        <i class="fa-solid fa-list-check"></i>
                        <span>Products Management</span>
                    </li>
                    <li @click="selected = 'OderManagement'" :class="[selected == 'OderManagement' ? 'color-grenn' : '']">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span>Oder Management</span>
                    </li>
                </ul>
            </div>
            <div class="admin-right">
                <div class="setting-adm">
                    <div>
                        <input type="text" placeholder="Tìm kiếm..." v-model="searchProduct" @keyup.enter="onSearch()"
                            @input="searchText($event)">
                        <i class="fa-solid fa-circle-user"></i>
                        <i class="fa-solid fa-gear"></i>
                        <i class="fa-solid fa-bell"></i>
                    </div>
                </div>
                <component :is="selected" :allProducts="allProducts"></component>
            </div>
        </div>
    </div>
</template>

<script>
import UserManagement from '../views/admin/UserManagementView.vue';
import ProductManagement from '../views/admin/ProductManagementView.vue';
import OderManagement from '../views/admin/OderManagementView.vue';
import { mapActions, mapState } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useUsersStore } from '@/stores/users'

export default {
    components: {
        UserManagement,
        ProductManagement,
        OderManagement,
    },
    data() {
        return {
            selected: 'UserManagement',
            page: 1,
            size: 10,
        }
    },
    methods: {
        ...mapActions(useProductsStore, [
            'getProducts',
        ]),

        ...mapActions(useUsersStore, [
            'checkLoggedIn'
        ]),

        UserManagement() {
            this.selected = 'UserManagement'
        },
        async onSearch() {
            // console.log('search', this.params)
            this.params.keyword = this.searchProduct
            await this.getProducts(this.params)
        },

        async searchText(event) {
            let value = event.target.value
            if (value === '') {
                this.onSearch()
            } else if (value != '') {
                this.onSearch()
            }
            console.log('event: ', event.target.value);
        },
    },
    computed: {
        ...mapState(useProductsStore, [
            'allProducts',
            'params'
        ]),
        ...mapState(useUsersStore, [
            'auth',
        ]),
    },
    async created() {
        try {
            console.log('auth', this.auth.user);
            const isLoggedIn = localStorage.getItem('isLoggedIn')
            const userData = localStorage.getItem('user')
            if (!isLoggedIn && !userData) {
                this.$router.push({ path: '/dang-nhap-admin' })
            }

            if (this.auth.user.is_admin == false) {
                this.$router.push({ path: '/dang-nhap-admin' })
            }

            this.params.skip = this.page
            this.params.limit = this.size
            await this.getProducts(this.params)
        } catch (error) {
            console.log(error);
        }

    },


}
</script>

<style scoped>
.admin-content {
    color: white;
    display: flex;
}

.admin-box {
    min-height: 90vh;
}

.techgo-header {
    border-bottom: 1px solid #b2bec3;
    padding: 12px 24px;
}

.techgo-header span {
    font-size: 1.5rem;
    font-weight: 600;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.techgo-header i {
    font-size: 1.5rem;
    margin-right: 12px;
}

.menu-list {
    padding: 12px;
}

.menu-list li {
    list-style: none;
    padding: 18px 24px;
    cursor: pointer;
    display: flex;
}

.menu-list li i {
    margin-right: 12px;
    font-size: 1.2rem;
}

.menu-list li span {
    font-size: 0.9rem;
    font-weight: 600;
}

.admin-right {
    width: 80%;
}

.admin-left {
    width: 20%;
    background-color: #2d3436;
    border-radius: 12px 12px 0 0;
    margin-right: 24px;
    position: sticky;
    height: 100vh;
    top: 0;
}

.color-grenn {
    background-color: #487eb0;
    border-radius: 16px;
}

.btn {
    width: 92%;
    background-color: #487eb0;
    padding: 18px 24px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    margin: 0 12px;
    position: absolute;
    bottom: 2%;
}

.btn:hover {
    background-color: #0c2461;
    transition: 0.2s linear;

}

.admin-left a {
    text-decoration: none;
    color: white;
}

.setting-adm {
    display: flex;
    justify-content: end;
    margin-right: 32px;
    margin-top: 24px;
}

.setting-adm i {
    color: black;
}

input {
    padding: 4px 12px;
    border: 1px solid gray;
    border-radius: 8px;
    color: #34495e;
}

input:focus {
    outline: 1px solid #487eb0;
}

i {
    margin-left: 6px;
    padding: 6px;
    font-size: 1.3rem;
}
</style>