import axiosClient from './axiosClient';

export const layDSSoCatApi = (pagination) => {
  return axiosClient.get(`/socats?_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
};

export const themSoCatApi = (dataPost) => {
  return axiosClient.post('/socats', dataPost);
};

// export const capNhatMaHangApi = (dataPost) => {
//   return axiosClient.put(`/mahangs/${dataPost.id}`, dataPost);
// };

export const xoaSoCatApi = (id) => {
  return axiosClient.delete(`/socats/${id}`);
};

// export const timKiemMaHangApi = (keySearch, pagination) => {
//   return axiosClient.get(`/mahangs?q=${keySearch}&_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
// };
