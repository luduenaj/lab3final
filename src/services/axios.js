import axios from 'axios';
const apiClient = axios.create({
  baseURL: '',
  withCredentials: false,
  headers:{
    Accept:'application/json',
    'Content-Type':'application/json',
  }
})

export default {
  getCanciones(cancion){
    return apiClient.get('https://musicbrainz.org/ws/2/recording?fmt=json&query='+cancion);
  },
}