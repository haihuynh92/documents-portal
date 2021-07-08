import axiosClient from './axiosClient';

export const layDSMaHangApi = (pagination) => {
  return axiosClient.get(`/mahangs?_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
};

export const themMaHangApi = (dataPost) => {
  return axiosClient.post('/mahangs', dataPost);
};

export const capNhatMaHangApi = (dataPost) => {
  return axiosClient.put(`/mahangs/${dataPost.id}`, dataPost);
};

export const xoaMaHangApi = (id) => {
  return axiosClient.delete(`/mahangs/${id}`);
};
