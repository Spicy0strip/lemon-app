import axios from 'axios'
const $http = axios.create({
    withCredentials: true,
})

export async function getOrder() {
    return await $http.get('/api/note');
}

export async function getOrderList(params) {
    return await $http.get('/api/queryOrders', { params });
}

export async function sendOrder(params) {
    return await $http.get('/api/send', { params });
}

export async function agreeExitOrder(params) {
    return await $http.get('/api/agree', { params });
}

export async function  disAgreeExitOrder(params) {
    return await $http.get('/api/disagree', { params });
}
