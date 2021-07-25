import axiosClient from './axiosClient';

export const layDSThongTinSCSApi = (nameArr) => {
  return axiosClient.get(`/${nameArr}?_sort=ngaynhap&_order=desc`);
};

export const themThongTinSCSApi = (dataPost, nameArr) => {
  return axiosClient.post(`/${nameArr}`, dataPost);
};

export const xoaThongTinSCSApi = (id, nameArr) => {
  return axiosClient.delete(`/${nameArr}/${id}`);
};

export const filterThongTinSCSApi = (convertData, nameArr) => {
  return axiosClient.get(`/${nameArr}?ngaynhap_gte=${convertData.ngaynhap[0]}&ngaynhap_lte=${convertData.ngaynhap[1]}&thanhtoan=false&_sort=ngaynhap&_order=desc`);
};

export const updateThongTinSCSApi = (dataPost, nameArr) => {
  return axiosClient.put(`/${nameArr}/${dataPost.id}`, dataPost);
};
