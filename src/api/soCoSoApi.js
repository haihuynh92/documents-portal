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
