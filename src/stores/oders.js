import { defineStore } from 'pinia'

import { api, authApi } from "../apis"

export const useOderStore = defineStore('oders', {
    state: () => ({
        allOders: [],
    }),
    actions: {
        async getOders() {
            const res = await authApi.get('/orders/me')
            if (res.status === 200) {
                this.allOders = res.data
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
        }
    },


})