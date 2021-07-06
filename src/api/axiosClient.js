import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'https://manage-documents.herokuapp.com',
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use((response) => {
  // if (response && response.data) {
  //   return response.data;
  // }
  return response;
}, err => {
  return {err};
});

export default axiosClient;
