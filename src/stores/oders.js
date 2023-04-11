import { defineStore } from 'pinia'

import { api, authApi } from "../apis"

export const useOderStore = defineStore('oders', {
    state: () => ({
        allOders: [],
        admGetAllOders: [],
        getOderId: {},
    }),
    actions: {
        async getOders() {
            const res = await authApi.get('/orders/me')
            if (res.status === 200) {
                this.allOders = res.data
            }
        },
        async getOder(id) {
            const res = await authApi.get(`/orders/${id}`)
            if (res.status === 200) {
                this.getOderId = res.data
            }
        },
        async addOder(oders) {
            try {
                const res = await authApi.post('/orders/me', oders)
                if (res.status === 200) {
                    console.log('oders', res.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAllOders(skip, limit) {
            try {
                const res = await authApi.get(`/orders/?skip=${skip}&limit=${limit}`)
                if (res.status === 200) {
                    this.admGetAllOders = res.data
                }
            } catch (error) {
                console.log(error);
            }
        }
    },


})