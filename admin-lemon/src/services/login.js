import axios from 'axios'

const $http = axios.create({
    withCredentials: true
});

export async function doLogin(params) {
    return await $http.get('/api/login', { params });
}
