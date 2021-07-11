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
  if (!!dataSearch.mahangId && !dataSearch.ngaycat) {
    return axiosClient.get(`/socats?q=${dataSearch.mahangId}&_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else if (!dataSearch.mahangId && !!dataSearch.ngaycat) {
    return axiosClient.get(`/socats?q=${dataSearch.ngaycat}&_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else {
    return axiosClient.get(`/socats?ngaycat=${dataSearch.ngaycat}&mahangId=${dataSearch.mahangId}&_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  }
};
