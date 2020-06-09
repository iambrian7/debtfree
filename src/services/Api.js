import axios from 'axios'
// import store from '@/store/store'
import store from '../store/index';

export default () => {
  return axios.create({
    baseURL: `/`,
    // baseURL: `http://localhost:8080/`,
    headers: {
      // Authorization: `Bearer xxxxx`
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
