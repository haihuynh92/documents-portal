import axiosClient from './axiosClient';

export const layDSKhachSo1Api = () => {
  return axiosClient.get("/khachso1s?_sort=ngaytao&_order=desc");
};

export const themKhachSo1Api = (dataPost) => {
  return axiosClient.post('/khachso1s', dataPost);
};

// export const capNhatSoCatApi = (dataPost) => {
//   return axiosClient.put(`/socats/${dataPost.id}`, dataPost);
// };

// export const xoaSoCatApi = (id) => {
//   return axiosClient.delete(`/socats/${id}`);
// };

// export const timKiemSoCatApi = (dataSearch, pagination) => {
//   if (!!dataSearch.mahangId && !dataSearch.ngaycat) {
//     return axiosClient.get(`/socats?mahangId=${dataSearch.mahangId}&_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
//   } else if (!dataSearch.mahangId && !!dataSearch.ngaycat) {
//     return axiosClient.get(`/socats?ngaycat=${dataSearch.ngaycat}&_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
//   } else {
//     return axiosClient.get(`/socats?ngaycat=${dataSearch.ngaycat}&mahangId=${dataSearch.mahangId}&_sort=ngaytao&_order=desc&_page=${pagination.page}&_limit=${pagination.limit}`);
//   }
// };
