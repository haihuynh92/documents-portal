import axiosClient from './axiosClient';

export const layDSSoCatApi = (pagination) => {
  return axiosClient.get(`/socats?_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
};

export const themSoCatApi = (dataPost) => {
  return axiosClient.post('/socats', dataPost);
};

export const capNhatSoCatApi = (dataPost) => {
  return axiosClient.put(`/socats/${dataPost.id}`, dataPost);
};

export const xoaSoCatApi = (id) => {
  return axiosClient.delete(`/socats/${id}`);
};

export const timKiemSoCatApi = (dataSearch, pagination) => {
  if (!!dataSearch.mahangId && !dataSearch.cosomayId) {
    return axiosClient.get(`/socats?mahangId=${dataSearch.mahangId}&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else if (!!dataSearch.cosomayId && !dataSearch.mahangId) {
    return axiosClient.get(`/socats?cosomayId=${dataSearch.cosomayId}&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else {
    return axiosClient.get(`/socats?mahangId=${dataSearch.mahangId}&cosomayId=${dataSearch.cosomayId}&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  }
};
