import axiosClient from './axiosClient';

export const layDSTrongThangApi = (nameArr, month) => {
  return axiosClient.get(`/${nameArr}?month=${month}&thongtin=giaohang&thongtin=hangloi`);
};

export const layDSTrongNamApi = (nameArr, year) => {
  return axiosClient.get(`/${nameArr}?year=${year}&thongtin=giaohang&thongtin=hangloi`);
};
