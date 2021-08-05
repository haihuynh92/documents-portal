import axiosClient from './axiosClient';

export const layDSSoCatApi = (pagination) => {
  return axiosClient.get(`/socats?_sort=ngaycat&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
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
  if (!!dataSearch.mahangId && !dataSearch.cosomayId && dataSearch.ngaycat === null) {
    return axiosClient.get(`/socats?mahangId=${dataSearch.mahangId}&_sort=ngaycat&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else if (!!dataSearch.cosomayId && !dataSearch.mahangId && dataSearch.ngaycat === null) {
    return axiosClient.get(`/socats?cosomayId=${dataSearch.cosomayId}&_sort=ngaycat&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else if (!dataSearch.cosomayId && !dataSearch.mahangId && !!dataSearch.ngaycat.length) {
    return axiosClient.get(`/socats?ngaycat_gte=${dataSearch.ngaycat[0]}&ngaycat_lte=${dataSearch.ngaycat[1]}&_sort=ngaycat&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else if (!!dataSearch.cosomayId && !!dataSearch.mahangId && dataSearch.ngaycat === null) {
    return axiosClient.get(`/socats?&mahangId=${dataSearch.mahangId}&cosomayId=${dataSearch.cosomayId}&_sort=ngaycat&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else if (!dataSearch.cosomayId && !!dataSearch.mahangId && !!dataSearch.ngaycat.length) {
    return axiosClient.get(`/socats?ngaycat_gte=${dataSearch.ngaycat[0]}&ngaycat_lte=${dataSearch.ngaycat[1]}&mahangId=${dataSearch.mahangId}&_sort=ngaycat&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else if (!!dataSearch.cosomayId && !dataSearch.mahangId && !!dataSearch.ngaycat.length) {
    return axiosClient.get(`/socats?ngaycat_gte=${dataSearch.ngaycat[0]}&ngaycat_lte=${dataSearch.ngaycat[1]}&cosomayId=${dataSearch.cosomayId}&_sort=ngaycat&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  } else if (!!dataSearch.cosomayId && !!dataSearch.mahangId && !!dataSearch.ngaycat.length) {
    return axiosClient.get(`/socats?ngaycat_gte=${dataSearch.ngaycat[0]}&ngaycat_lte=${dataSearch.ngaycat[1]}&mahangId=${dataSearch.mahangId}&cosomayId=${dataSearch.cosomayId}&_sort=ngaycat&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
  }
};
