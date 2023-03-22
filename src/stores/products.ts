import {defineStore} from 'pinia'

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

export const useProductsStore = defineStore('products', {
  state: () => ({
    promotionProducts: [] as Product[],
    topSellerProducts: [] as Product[],
    newCollectionProducts: [] as Product[],
    highEndProducts: [] as Product[],
  }),

  actions: {
    getPromotionProducts() {
      this.promotionProducts = []
    }
  }
})