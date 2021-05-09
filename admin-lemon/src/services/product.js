import axios from 'axios'
const $http = axios.create({
    withCredentials: true,
})

export async function getProductList(params) {
    return await $http.get('/api/queryCargo', { params });
}

export async function getProductType() {
    return await $http.get('/api/queryType');
}

export async function createProduct(body) {
    return await $http.post('/api/insertCargo', body);
}

export async function updateProduct(body) {
    return await $http.post('/api/updateCargo', body);
}


export async function getOrderList() {
    return await $http.get('/api/note');
}

export async function upCargo(params) {
    return await $http.get('/api/upCargo', { params });
}

export async function downCargo(params) {
    return await $http.get('/api/downCargo', { params });
}
