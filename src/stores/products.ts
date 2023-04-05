import { defineStore } from 'pinia'

import { api } from "../apis"

interface Category {
  id: number,
  name: string,
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
    totalProduct: '',

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
    async getDetailProduct({ id }, params: ParamsGetProduct) {
      try {
        const res = await api.get(`/products/${id}?page=${params.skip}&size=${params.limit}`)
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
        this.promotionProducts = res.data
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
        this.topSellerProducts = res.data
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
        this.newCollectionProducts = res.data
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
        this.highEndProducts = res.data
      } catch (e) {
        console.error(e)
      }
    },

  }
})