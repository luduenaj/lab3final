import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://laboratorio3-f36a.restdb.io/rest',
  withCredentials: false,
  headers: {
    'x-apikey': '60eb09146661365596af552f',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  postCompra(compra) {
    return apiClient.post('/transactions', compra);
  },
  getHistorial(id) {
    return apiClient.get(`/transactions?q={"user_id": "${id}"}`);
  },
  deleteMovimiento(id) {
    return apiClient.delete(`/transactions/${id}`);
  },
};
