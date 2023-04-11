<template>
    <h2 class="oder-h2">Danh sách quản lí Oders <i class="fa-solid fa-cart-shopping"></i></h2>
    <div class="oder-management">
        <div class="management-box">
            <div class="customer_orders">
                <div class="customer-table-wrap">
                    <div class="customer-table">
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
                                            Trạng thái
                                        </th>
                                        <th class="text-left">
                                            Vận chuyển
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="items-td" v-for="(item, index) in admGetAllOders" :key="item.menu">
                                        <td class="item-code" @click="handleShowListOder(item.id)">
                                            #{{ item.code }}
                                            <span><i class="fa-solid fa-eye"></i></span>
                                        </td>
                                        <td>11/4/2023</td>
                                        <td>{{ formatPriceTotals(item.total) }}</td>
                                        <td class="item-status">
                                            <v-switch v-model="model" color="success" value="0"></v-switch>
                                            {{ item.status === 0 ? 'Chờ xử lý' : 'Đang giao hàng' }}
                                        </td>
                                        <td>Chờ xử lý</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="customer_orders" v-if="showListOder">
                <div class="customer-table-wrap">
                    <div class="customer-table">
                        <h4>Chi tiết đơn hàng {{ '#' + getOderId.code }}</h4>
                        <div class="table-margin">
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left items-img">
                                            Sản phẩm
                                        </th>
                                        <th class="text-left">
                                            Mã sản phẩm
                                        </th>
                                        <th class="text-left">
                                            Đơn giá
                                        </th>
                                        <th class="text-left">
                                            Số lượng
                                        </th>
                                        <th class="text-left">
                                            Thành tiền
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="items-td" v-for="item in getOderId.order_items" :key="item.name">
                                        <td class="bl-flex">
                                            <div class="bl-img">
                                                <img :src="item.product_variant.images?.[0]?.image_path" alt="">
                                            </div>
                                            <span class="bl-name">{{ item.product_variant.name }}</span>
                                        </td>
                                        <td><span>---</span></td>
                                        <td><span>{{ priceProductVariant(item.product_variant?.price) }}</span></td>
                                        <td><span>{{ item?.qty }}</span></td>
                                        <td>
                                            <span>
                                                {{ totalPriceProductVariant(item.product_variant?.price, item?.qty) }}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                            <div class="block-body">
                                <div class="block-p">
                                    <p>Tổng tiền :</p>
                                    <p style="margin-right: 16px;">{{ totalPriceOder }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useOderStore } from '@/stores/oders'
export default {
    components: {

    },
    data() {
        return {
            showListOder: false,
            page: 1,
            size: 10,
            model: [0, 1],
        }
    },

    methods: {
        click(e) {
            console.log(e);
        },
        ...mapActions(useOderStore, [
            'getAllOders',
            'getOder',
        ]),
        async handleShowListOder(id) {
            try {
                await this.getOder(id)
                this.showListOder = true;
                console.log('getOderId1', this.getOderId);
            } catch (error) {

            }
        },
        formatPriceTotals(total) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(total);
        },
        priceProductVariant(price) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price);
        },
        totalPriceProductVariant(price, qty) {
            let number = price * qty;
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
        }
    },
    computed: {
        ...mapState(useOderStore, [
            'admGetAllOders',
            'getOderId',
        ]),

        totalPriceOder() {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(this.getOderId.total);
        }


    },
    async created() {
        try {
            await this.getAllOders(this.page, this.size)
            console.log('admGetAllOders', this.admGetAllOders);
        } catch (error) {
            console.log(error);
        }

    }

}
</script>

<style scoped>
.ustomer-table {
    position: relative;
}

.customer-table-wrap {
    background-color: #d9edf7;
    padding: 8px 10px;
    margin: 30px 0;
}

.customer-table-wrap {
    background-color: #d9edf7;
    padding: 8px 10px;
    margin: 30px 0;
}

.customer-table-wrap {
    background-color: #d9edf7;
    padding: 8px 10px;
    margin: 30px 0;
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
    color: black;
}

.text-left {
    width: 13.75%;
    text-align: center !important;
}

.items-img {
    width: 45%;
    text-align: left !important;
}

.items-td td {
    border-bottom: none !important;
    font-size: 0.82rem;
    margin-bottom: 12px;
    margin-top: 6px;
    text-align: center;
}

.bl-flex {
    display: flex;
}

.bl-img {
    width: 12%;
}

.bl-img img {
    width: 100%;
}

.bl-name {
    padding: 6px 12px;
}

.bl-name {
    padding: 6px 12px;
}

.table-margin {
    margin: 0 !important;
}

.block-body {
    border-top: 1px solid #d9edf7;
    margin-top: 24px;
}

.block-p {
    display: flex;
    justify-content: space-between;
    padding: 6px 20px;
    color: black;
}

.block-p p {
    font-weight: 500;
    font-size: 0.9rem;
}

.item-code {
    cursor: pointer;
}

.item-code:hover {
    color: #3498db;
}

:deep(.v-table__wrapper) {
    border-radius: 12px;
    overflow: hidden;
    margin-top: 30px;
}

:deep(.v-table) {
    border-radius: 12px;
}

:deep(.v-table>.v-table__wrapper>table) {
    margin-top: 26px;
}

.table-margin :deep(.v-table>.v-table__wrapper>table) {
    margin-top: 0;
}

.item-status {
    display: flex;
    align-items: center;
    justify-content: center;
}

.oder-h2 {
    color: black;
    font-weight: 600 !important;
}

:deep(.v-input__details) {
    display: none !important;
}

:deep(.v-input--density-default) {
    margin-left: 30px;
}

:deep(.v-switch .v-selection-control) {
    min-height: unset;
    display: unset;
}

:deep(.v-input) {
    flex: unset;
}

:deep(.v-switch .v-selection-control__wrapper) {
    margin-right: 12px;
}
</style>