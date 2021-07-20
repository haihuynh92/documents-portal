import axiosClient from './axiosClient';

export const layDSThongTinApi = (nameArr) => {
  return axiosClient.get(`/${nameArr}?_sort=ngaynhap&_order=desc`);
};

export const themThongTinApi = (dataPost, nameArr) => {
  return axiosClient.post(`/${nameArr}`, dataPost);
};

export const xoaThongTinApi = (id, nameArr) => {
  return axiosClient.delete(`/${nameArr}/${id}`);
};
