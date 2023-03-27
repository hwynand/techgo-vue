import axios from 'axios';

const apiUrl = 'https://pxh09.cloud/api';
function authHeaders(token) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}
export const api = {
    async login(username, password) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        return axios.post(`${apiUrl}/login/access-token`, params);
    },
    async register(data) {
        return axios.post(`${apiUrl}/register`, data);
    },
    async getProfile(token) {
        return axios.get(`${apiUrl}/users/me`, authHeaders(token));
    },
    async updateProfile(token, data) {
        return axios.put(`${apiUrl}/users/me`, data, authHeaders(token));
    },
    async getProducts(token, id, skip, limit, productId) {
        // console.log('keyWord', keyWord);
        return axios.get(`${apiUrl}/products/${skip || skip == 0 ? (`?skip=${skip}`) : ''}${id ? (`&brand_id=${id}`) : ''}${limit ? (`&limit=${limit}`) : ''}${productId ? productId : ''} `, authHeaders(token))
    },

    async getBrand(token) {
        return axios.get(`${apiUrl}/brands`, authHeaders(token))
    },

};
