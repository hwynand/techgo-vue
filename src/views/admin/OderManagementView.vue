<template>
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
                                            Trạng thái thanh toán
                                        </th>
                                        <th class="text-left">
                                            Vận chuyển
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="items-td" v-for="(item, index) in orderList" :key="item.menu">
                                        <td @click="handleShowListOder(index)">{{ item.menu }}</td>
                                        <td>{{ item.date }}</td>
                                        <td>{{ item.price }}</td>
                                        <td>{{ item.status }}</td>
                                        <td>{{ item.ship }}</td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </div>
                        <div class="title">
                            <h3>Table ProductManagement</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="customer_orders" v-if="showListOder">
                <div class="customer-table-wrap">
                    <div class="customer-table">
                        <h4>Chi tiết đơn hàng {{ orderList.menu }}</h4>
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
                                    <tr class="items-td" v-for="item in orderDetail" :key="item.name">
                                        <td class="bl-flex">
                                            <div class="bl-img">
                                                <img :src="item.thumb" alt="">
                                            </div>
                                            <span class="bl-name">{{ item.name }}</span>
                                        </td>
                                        <td><span>{{ item.productcode }}</span></td>
                                        <td><span>{{ item.unitprice }}</span></td>
                                        <td><span>{{ item.salary }}</span></td>
                                        <td><span> 20.916.000đ</span></td>
                                    </tr>
                                </tbody>
                            </v-table>
                            <div class="block-body">
                                <div class="block-p">
                                    <p>Tổng tiền :</p>
                                    <p>20.916.000đ</p>
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
export default {
    components: {

    },
    data() {
        return {
            showListOder: false,
            orderList: [
                { menu: '#100037', date: '08/02/2023', price: '62550000', status: 'Chờ sử lý', ship: 'Chờ sử lý' },
                { menu: '#100037', date: '08/02/2023', price: '62550000', status: 'Chờ sử lý', ship: 'Chờ sử lý' },
            ],
            orderDetail: [
                {
                    thumb: 'https://product.hstatic.net/200000516791/product/product_28_1_5043e2df20164cd1a4dbca5bb832937f_178c708a80114db18ee385c6f26fa0eb_master.png',
                    name: 'Smart Tivi NanoCell LG 4K 50 inch 50NANO86TPA', unitprice: '20916000', salary: '1', productcode: '',
                },
                {
                    thumb: 'https://product.hstatic.net/200000516791/product/product_28_1_5043e2df20164cd1a4dbca5bb832937f_178c708a80114db18ee385c6f26fa0eb_master.png',
                    name: 'Smart Tivi NanoCell LG 4K 50 inch 50NANO86TPA', unitprice: '20916000', salary: '1', productcode: '',
                },
                {
                    thumb: 'https://product.hstatic.net/200000516791/product/product_28_1_5043e2df20164cd1a4dbca5bb832937f_178c708a80114db18ee385c6f26fa0eb_master.png',
                    name: 'Smart Tivi NanoCell LG 4K 50 inch 50NANO86TPA', unitprice: '20916000', salary: '1', productcode: '',
                },
                {
                    thumb: 'https://product.hstatic.net/200000516791/product/product_28_1_5043e2df20164cd1a4dbca5bb832937f_178c708a80114db18ee385c6f26fa0eb_master.png',
                    name: 'Smart Tivi NanoCell LG 4K 50 inch 50NANO86TPA', unitprice: '20916000', salary: '1', productcode: '',
                },
            ],
        }
    },

    methods: {
        handleShowListOder(index) {
            this.showListOder = true;
            console.log(index);
        }
    }

}
</script>

<style scoped>
.ustomer-table {
    position: relative;
}

.title {
    background-color: #0c2461;
    color: white;
    padding: 16px;
    position: absolute;
    width: 75%;
    border-radius: 10px;
    top: 12%;
    left: 23%;
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

::v-deep .v-table__wrapper {
    border-radius: 12px;
    overflow: hidden;
    margin-top: 30px;
}

::v-deep .v-table {
    border-radius: 12px;
}

::v-deep .v-table>.v-table__wrapper>table {
    margin-top: 26px;
}

.table-margin ::v-deep .v-table>.v-table__wrapper>table {
    margin-top: 0;
}
</style>