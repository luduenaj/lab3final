import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://criptoya.com/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getBitcoin() {
    return apiClient.get('btc/ars/1');
  },
  getEtherum() {
    return apiClient.get('eth/ars/1');
  },
  getUSDC() {
    return apiClient.get('usdc/ars/1');
  },
};
