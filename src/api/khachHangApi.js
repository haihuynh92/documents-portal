import axiosClient from './axiosClient';

export const layDSThongTinApi = (nameArr) => {
  return axiosClient.get(`/${nameArr}?_sort=ngaytao&_order=desc`);
};

export const themThongTinApi = (dataPost, nameArr) => {
  return axiosClient.post(`/${nameArr}`, dataPost);
};
