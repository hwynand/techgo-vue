<template>
    <div class="oder-management">
        <div class="management-box" v-if="!showDetail">
            <div class="customer_orders">
                <div class="customer-table-wrap">
                    <div class="customer-table">
                        <div class="management categoty-product">
                            <h4>Quản Lý Sản Phẩm <i class="fa-solid fa-folder-open"></i></h4>
                            <div class="select-category">
                                <v-select label="Loại sản phẩm" :items="allCategory" item-title="name" item-value="id"
                                    variant="solo" :item-props="true" @update:modelValue="filterCategorys">
                                </v-select>
                            </div>
                            <div class="select-category">
                                <v-select label="Loại thương hiệu" :items="allBrand" item-title="name" item-value="id"
                                    variant="solo" @update:modelValue="filterBrands">
                                </v-select>
                            </div>
                            <div class="add-product">
                                <AddProductView :allCategory="allCategory" :allBrand="allBrand" :dialog="dialog"
                                    :page="page" :size="size">
                                </AddProductView>
                            </div>
                        </div>
                        <div class="table-margin">
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left items-img">
                                            Sản phẩm
                                            <span class="total-products">{{ productTotal }}</span>
                                        </th>
                                        <th class="text-left">
                                            Mã sản phẩm
                                        </th>
                                        <th class="text-left">
                                            Thuộc tính
                                        </th>
                                        <th class="text-left">
                                            Tổng tồn kho
                                        </th>
                                        <th class="text-left">
                                            Giá tiền
                                        </th>
                                        <th class="text-left"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="items-td" v-for="item in allProducts" :key="item.name">
                                        <td @click="handaleDetailProduct(item.id)">
                                            <div class="bl-flex">
                                                <div class="box-img">
                                                    <img :src="item.product_variants[0]?.images?.[0].image_path" alt="">
                                                </div>
                                                <span class="bl-name">{{ item.name }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span>---</span>
                                        </td>
                                        <td>
                                            <span>{{ item.product_variants.length }}</span>
                                        </td>
                                        <td>
                                            <span>{{ totalInventoProducVanriants(item) }}</span>
                                        </td>
                                        <td>
                                            <span>{{ formatPrice(item.product_variants[0]?.price) }}</span>
                                        </td>
                                        <td class="item-delete">
                                            <span @click="editProduct(item)">
                                                <i class="fa-solid fa-pen-to-square"></i></span>
                                            <span @click="handleDeleteProduct(item.id)"><i
                                                    class="fa-solid fa-trash"></i></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                            <div class="text-center">
                                <v-pagination v-model="page" :length="totalPages" rounded="circle"
                                    @update:modelValue="updatePage(page, size)">
                                </v-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ---------------------------deital product------------------------------------- -->
        <div class="management-box" v-else>
            <div class="customer_orders">
                <div class="customer-table-wrap" v-if="!showCreateProductVariants">
                    <div class="customer-table">
                        <div class="management">
                            <h4>Chi tiết</h4>
                            <span @click="handaleComebackProduct"> <i class="fa-solid fa-angles-right"></i> Quay lại trang
                                sản phẩm</span>
                        </div>
                        <div class="add-btn">
                            <button @click="addProductVariants()">Thêm sản phẩm <i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div class="table-margin">
                            <v-table>
                                <thead>
                                    <tr>
                                        <th class="text-left items-img">
                                            Sản phẩm
                                        </th>
                                        <th class="text-left">
                                            SKU
                                        </th>
                                        <th class="text-left">
                                            Thuộc tính
                                        </th>
                                        <th class="text-left">
                                            Tồn kho
                                        </th>
                                        <th class="text-left">
                                            Giá tiền
                                        </th>
                                        <th class="text-left">
                                            Trạng thái
                                        </th>
                                        <th class="text-left"></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="items-td" v-for="item in detailProductVariants" :key="item.name">
                                        <td>
                                            <div class="bl-flex">
                                                <div class="box-img">
                                                    <img :src="item.images[0]?.image_path" alt="">
                                                </div>
                                                <span class="bl-name">{{ item.name }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span>{{ item.sku }}</span>
                                        </td>
                                        <td>
                                            <span>{{ item.color }}</span>
                                        </td>
                                        <td>
                                            <span>{{ item.inventory }}</span>
                                        </td>
                                        <td>
                                            <span>{{ item.price }}</span>
                                        </td>
                                        <td>
                                            <span>{{ item.inventory ? 'Còn hàng' : 'Hết hàng' }}</span>
                                        </td>
                                        <td class="item-delete">
                                            <span @click="handleEditProductVariant(item.id)"><i
                                                    class="fa-solid fa-pen-to-square"></i></span>
                                            <span @click="handleDeleteProductVariants(item.id)"><i
                                                    class="fa-solid fa-trash"></i></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <ProductVariantsView :id="idProduct" :showCreateProductVariants="showCreateProductVariants"
                        :valProductVariant="valProductVariant" :isShowEditVariant="isShowEditVariant"
                        @handaleClose="close()">
                    </ProductVariantsView>
                </div>
            </div>
        </div>

        <!-- ---------------------------edit product------------------------------------- -->
        <div class="management-box" v-if="showEditProduct">
            <div class="customer_orders">
                <div class="customer-table-wrap">
                    <div class="customer-table">
                        <h3>Chỉnh sửa sản phẩm <i class="fa-solid fa-feather"></i></h3>
                        <div class="edit-product">
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Name" variant="solo"
                                        v-model="valUpdateProduct.name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select label="Categorys" :items="allCategory" item-title="name" item-value="id"
                                        required variant="solo" v-model="valUpdateProduct.category_id"></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select label="Brands" :items="allBrand" item-title="name" item-value="id" required
                                        variant="solo" v-model="valUpdateProduct.brand_id"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea label="Description..." variant="solo"
                                        v-model="valUpdateProduct.description"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text"
                                    @click="dialog = false, showEditProduct = false">
                                    Close
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="handaleUpdateProduct()">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useProductsStore } from '@/stores/products'
import AddProductView from './AddProductView.vue'
import ProductVariantsView from './ProductVariantsCreateView.vue'
export default {
    props: {
        allProducts: {
            type: Object,
            required: true,
        },
    },
    components: {
        AddProductView,
        ProductVariantsView,
    },
    data() {
        return {
            page: 1,
            size: 10,
            showDetail: false,
            showCreateProductVariants: false,
            idProduct: null,
            dialog: false,
            valueEditProductVariants: {},
            valProductVariant: {},
            isShowEditVariant: false,
            showEditProduct: false,
            valUpdateProduct: {
                name: '',
                category_id: '',
                brand_id: '',
                description: '',
            },
            idProduct: 0,
        }
    },

    methods: {
        ...mapActions(useProductsStore, [
            'getProducts',
            'getProductVariants',
            'deleteProduct',
            'deleteProductVariants',
            'getProductVariant',
            'getBrand',
            'getCategorys',
            'updateProduct',
        ]),
        filterBrands(id) {
            this.params.brand_id = id
            this.params.skip = this.page
            this.params.limit = this.size
            this.getProducts(this.params)
        },
        filterCategorys(id) {
            this.params.category_id = id
            this.params.skip = this.page
            this.params.limit = this.size
            this.getProducts(this.params)
        },
        formatPrice(price) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(price)
        },
        totalInventoProducVanriants(item) {
            let totalInventory = 0;
            for (let i = 0; i < item.product_variants.length; i++) {
                totalInventory += item.product_variants[i].inventory;
            }
            return totalInventory
        },
        handaleDetailProduct(id) {
            this.idProduct = id
            this.getProductVariants(id)
            this.showDetail = true
            this.showEditProduct = false
        },
        async handaleComebackProduct() {
            this.params.skip = this.page
            this.params.limit = this.size
            await this.getProducts(this.params)
            this.showDetail = false
            this.valProductVariant = ''
        },
        addProductVariants() {
            this.showCreateProductVariants = true
        },
        async updatePage(page, size) {
            try {
                this.params.skip = page
                this.params.limit = size
                await this.getProducts(this.params)
            } catch (error) {
                console.log(error);
            }
        },
        close() {
            this.showCreateProductVariants = false
            this.valProductVariant = ''
        },
        async handleDeleteProductVariants(idVariant) {
            try {
                let product_id = this.idProduct
                let variant_id = idVariant
                await this.deleteProductVariants(product_id, variant_id)
                await this.getProductVariants(product_id)
            } catch (error) {
                console.log(error);
            }

        },
        async handleDeleteProduct(id) {
            try {
                await this.deleteProduct(id)
                this.params.skip = this.page
                this.params.limit = this.size
                await this.getProducts(this.params)
            } catch (error) {
                console.log(error);
            }
        },
        editProduct(item) {
            // this.showDetail = false
            this.valUpdateProduct = {
                name: item.name,
                category_id: item.category,
                brand_id: item.brand,
                description: item.description,
            }
            this.idProduct = item.id
            this.showEditProduct = true
            console.log(item, 'item');
        },
        async handleEditProductVariant(idVariant) {
            try {
                let idProduct = this.idProduct
                await this.getProductVariant(idProduct, idVariant)
                this.isShowEditVariant = true
                this.valProductVariant = this.detailVariant
            } catch (error) {
                console.log(error);
            }
            this.showCreateProductVariants = true
        },
        async handaleUpdateProduct() {
            try {
                const id = this.idProduct
                let data = {
                    name: this.valUpdateProduct.name,
                    category_id: this.valUpdateProduct.category_id.id,
                    brand_id: this.valUpdateProduct.brand_id.id,
                    description: this.valUpdateProduct.description,
                }
                await this.updateProduct(id, { data })
                this.params.skip = this.page
                this.params.limit = this.size
                await this.getProducts(this.params)
                this.showEditProduct = false
                this.valUpdateProduct = ''
                console.log('valUpdateProduct', id);
            } catch (error) {
                console.log(error);
            }

        }
    },

    computed: {
        ...mapState(useProductsStore, [
            'allCategory',
            'params',
            'totalProduct',
            'allBrand',
            'detailProductVariants',
            'detailVariant',

        ]),

        totalPages() {
            let number = this.totalProduct.total / this.size
            return Math.ceil(number)
        },

        // tổng số invento của tất cả sản phẩm
        totalInventory() {
            let inventory = 0;
            this.allProducts.forEach(product => {
                product.product_variants.forEach(variant => {
                    inventory += variant.inventory;
                });
            });
            return inventory;
        },
        productTotal() {
            return this.totalProduct.total
        }
    },

    async created() {
        console.log('createdaa', this.valProductVariant);
    },


}
</script>

<style scoped>
.ustomer-table {
    position: relative;
}

.title {
    color: black;
    padding: 16px;
    position: absolute;
    width: 75%;
    border-radius: 10px;
    top: 2%;
    left: 20%;
    display: flex;
    align-items: center;
}

.title h3 {
    font-size: 1.5rem;
}

.customer-table-wrap {
    background-color: #d9edf7;
    padding: 8px 10px;
    margin: 30px 0;
    color: black;
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
    width: 13.333%;
    text-align: center !important;
}

.items-img {
    width: 30%;
    text-align: left !important;
}

.items-td td {
    border-bottom: none !important;
    font-size: 0.82rem;
    margin-bottom: 12px;
    margin-top: 6px;
    text-align: center;
    cursor: pointer;
}

.bl-flex {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
}

.bl-flex span {
    text-align: left !important;
}

.bl-name {
    padding: 6px 12px;
    margin-bottom: 30px;
}


.table-margin {
    margin: 0 !important;
}

.add-btn {
    color: white;

}

.oder-management {
    position: relative;
}

.select-category {
    margin-left: 20px;
}

.select-category select {
    outline: unset;
}

.select-category option {
    padding: 4px;
    width: 100%;
}

.add-btn button {
    border: 1px solid #2980b9;
    position: absolute;
    padding: 4px;
    width: 150px;
    top: -64px;
    border-radius: 6px;
    background-color: #2980b9;
}

.add-btn button:hover {
    background-color: #3498db;
}

.categoty-product {
    justify-content: unset !important;
}

.management {
    display: flex;
    align-items: center;
    color: black;
    justify-content: space-between;
}

.management h4 {
    margin: 0;
}

.management span {
    margin-right: 24px;
    color: blue !important;
    cursor: pointer;
}

.item-delete {
    display: flex;
    align-items: center;
}

.item-delete i {
    margin-right: 32px;
}

.add-product {
    color: white !important;
    position: absolute;
    top: -64px;
    left: 0;
}

.add-product button:hover {
    background-color: #3498db;
}

.box-img {
    width: 15%;
    display: flex;
}

.box-img img {
    width: 100%;
}

.total-products {
    margin-left: 6px;
    font-weight: bold;
    color: #2980b9;
}

.customer-table h3 {
    padding: 8px;
    font-size: 1rem;
}

.edit-product {
    padding: 0 32px;
}

:deep(.v-table__wrapper) {
    border-radius: 12px;
    overflow: hidden;
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

:deep(.v-pagination__list) {
    color: black;
}

:deep(.v-select .v-field.v-field) {
    width: 250px;
}

/* :deep(.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td) {
    height: unset !important;
} */
</style>