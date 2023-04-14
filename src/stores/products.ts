import { defineStore } from 'pinia'

import { api, authApi } from "../apis"

interface Category {
  id: number,
  name: string,
  image: string,
}

interface Brand {
  id: number,
  name: string,
}

interface Image {
  id: number,
  image_path: string,
}

interface ProductVariant {
  id: number,
  product_id: number,
  name: string,
  sku: string,
  price: number,
  inventory: number,
  images: Image[],
}

interface Product {
  id: number,
  name: string,
  category: Category,
  brand: Brand,
  description: string,
  product_variants: ProductVariant[],
}

interface ParamsGetProduct {
  keyword?: string,
  category_id?: number[],
  brand_id?: number[],
  skip?: number,
  limit?: number,
  min_price?: number,
  max_price?: number,
}

enum ProductTypes {
  ALL = 0,
  PROMOTION = 1,
  TOP_SELLER = 2,
  NEW_COLLECTION = 3,
  HIGH_END = 4
}


export const useProductsStore = defineStore('products', {
  state: () => ({
    allProducts: [] as Product[],
    promotionProducts: [] as Product[],
    topSellerProducts: [] as Product[],
    newCollectionProducts: [] as Product[],
    highEndProducts: [] as Product[],
    allBrand: [] as Brand[],
    allCategory: [] as Category[],
    params: {} as ParamsGetProduct,
    detailProduct: [] as Product[],
    totalProduct: {},
    // variant: {} as ProductVariant[],
    image_path: [],
    detailProductVariants: [],
    detailVariant: [],
  }),

  actions: {
    async getProducts(params: ParamsGetProduct) {
      console.log('params', params);
      try {
        const res = await api.get(`/products/?page=${params.skip}&size=${params.limit}`, { params })
        if (res.status === 200) {
          this.allProducts = res.data.results
          this.totalProduct = res.data
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getDetailProduct({ id }) {
      try {
        const res = await api.get(`/products/${id}`)
        if (res.status === 200) {
          this.detailProduct = res.data
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getBrand() {
      try {
        const res = await api.get('/brands/')
        if (res.status === 200) {
          this.allBrand = res.data
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getCategorys(params: ParamsGetProduct) {
      try {
        const res = await api.get('/categories/', { params })
        if (res.status === 200) {
          this.allCategory = res.data
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getPromotionProducts(params: ParamsGetProduct) {
      try {
        const res = await api.get('/products/', {
          params: {
            ...params,
            type: ProductTypes.PROMOTION,
          }
        })
        this.promotionProducts = res.data.results
      } catch (e) {
        console.error(e)
      }
    },
    async getTopSellerProducts(params: ParamsGetProduct) {
      try {
        const res = await api.get('/products/', {
          params: {
            ...params,
            type: ProductTypes.TOP_SELLER,
          }
        })
        this.topSellerProducts = res.data.results
      } catch (e) {
        console.error(e)
      }
    },
    async getNewCollectionProducts(params: ParamsGetProduct) {
      try {
        const res = await api.get('/products/', {
          params: {
            ...params,
            type: ProductTypes.NEW_COLLECTION,
          }
        })
        this.newCollectionProducts = res.data.results
      } catch (e) {
        console.error(e)
      }
    },
    async getHighEndProducts(params: ParamsGetProduct) {
      try {
        const res = await api.get('/products/', {
          params: {
            ...params,
            type: ProductTypes.HIGH_END,
          }
        })
        this.highEndProducts = res.data.results
      } catch (e) {
        console.error(e)
      }
    },
    async addProduct({ data }) {
      try {
        const res = await authApi.post('/products/', data)
        console.log('add products', res);
      } catch (error) {
        console.log(error);
      }
    },
    async updateProduct(id: Number, { data }) {
      try {
        const res = await authApi.put(`/products/${id}`, data)
        console.log('add products', res);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct(id: Number) {
      try {
        await authApi.delete(`/products/${id}`)
      } catch (error) {
        console.log(error);
      }
    },
    async uploadImage(image: any, data: any, cb: any) {
      console.log('upload image', image)
      var form = new FormData();
      form.append('file', image[0]);
      try {
        const res = await authApi.post('/product-variants/uploadfile/', form)
        if (res.status === 200) {
          this.image_path = res.data
          cb(data, res.data)

        }
      } catch (error) {
        console.log(error);
      }
    },
    async addProductVariant(id: Number, variant: ProductVariant) {
      console.log('variant_', variant)
      try {
        await authApi.post(`/product-variants/products/${id}/variants`, variant)
      } catch (error) {
        console.log(error);
      }
    },
    async getProductVariants(id: Number) {
      try {
        const res = await authApi.get(`/product-variants/products/${id}/variants`)
        if (res.status === 200) {
          this.detailProductVariants = res.data
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProductVariants(product_id: Number, variants_id: Number) {
      try {
        await authApi.delete(`/product-variants/products/${product_id}/variants/${variants_id}`)
      } catch (error) {
        console.log(error);
      }
    },
    async getProductVariant(product_id: Number, variants_id: Number) {
      try {
        const res = await authApi.get(`/product-variants/products/${product_id}/variants/${variants_id}`)
        if (res.status === 200) {
          this.detailVariant = res.data
          console.log(this.detailVariant, 'detailVariant');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateProductVariant(product_id: Number, variants_id: Number, variant: ProductVariant) {
      try {
        const res = await authApi.put(`/product-variants/products/${product_id}/variants/${variants_id}`, variant)
        if (res.status === 200) {
          console.log('updateProductVariant', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
})