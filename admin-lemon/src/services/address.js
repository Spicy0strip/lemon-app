import axios from 'axios'
const $http = axios.create({
    withCredentials: true,
})

export async function getAddressList() {
    return $http.get('/api/queryAddress');
}

export async function createAddress(body) {
    return $http.post('/api/addAddress', body);
}
