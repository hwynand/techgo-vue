<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent width="1024">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props">
                        Thêm sản phẩm <i class="fa-solid fa-plus"></i>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">Add Product</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Name" required variant="solo"
                                        v-model="createProduct.name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select :items="allCategory" item-title="name" item-value="id" label="Categorys"
                                        required variant="solo" v-model="createProduct.category_id"></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select :items="allBrand" item-title="name" item-value="id" label="Brands" required
                                        variant="solo" v-model="createProduct.brand_id"></v-select>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea label="Description..." variant="solo"
                                        v-model="createProduct.description"></v-textarea>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="handaleCreteProduct()">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useProductsStore } from '@/stores/products'
export default {
    props: {
        page: {
            type: Number,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            dialog: false,
            createProduct: {
                name: '',
                category_id: '',
                brand_id: '',
                description: '',
            },
        }
    },
    methods: {
        ...mapActions(useProductsStore, [
            'getBrand',
            'getCategorys',
            'addProduct',
            'getProducts'

        ]),
        async handaleCreteProduct() {
            try {
                let data = this.createProduct
                await this.addProduct({ data })
                this.params.skip = this.page
                this.params.limit = this.size
                await this.getProducts(this.params)
                this.createProduct.name = ''
                this.createProduct.category_id = ''
                this.createProduct.brand_id = ''
                this.createProduct.description = ''
                this.dialog = false;
                // console.log('name', data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    computed: {
        ...mapState(useProductsStore, [
            'allBrand',
            'allCategory',
            'params'
        ]),

    },

    async created() {
        try {
            await this.getBrand()
            await this.getCategorys()
            console.log('created', this.allBrand);
        } catch (error) {

        }

    }
}
</script>

<style scoped>
.fa-plus {
    margin-top: 1px;
    margin-left: 5px;
}

:deep(.v-row) {
    margin: unset;
}

:deep(.v-card-text) {
    padding: 0px 24px 10px !important;
}

:deep(.v-list-item-title) {
    text-transform: capitalize !important;
}
</style>