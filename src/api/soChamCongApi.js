import axiosClient from './axiosClient';

export const layDSChamCongApi = (nameArr) => {
  return axiosClient.get(`/${nameArr}?_sort=ngaynhap&_order=desc`);
};

export const themChamCongApi = (dataPost, nameArr) => {
  return axiosClient.post(`/${nameArr}`, dataPost);
};

export const xoaChamCongApi = (id, nameArr) => {
  return axiosClient.delete(`/${nameArr}/${id}`);
};

export const capNhatChamCongApi = (dataPost, nameArr) => {
  return axiosClient.put(`/${nameArr}/${dataPost.id}`, dataPost);
};

export const filterChamCongApi = (convertData, nameArr) => {
  return axiosClient.get(`/${nameArr}?ngaynhap_gte=${convertData.ngaynhap[0]}&ngaynhap_lte=${convertData.ngaynhap[1]}&thanhtoan=false&_sort=ngaynhap&_order=desc`);
};

export const xacNhanChamCongApi = (dataPost, nameArr) => {
  return axiosClient.put(`/${nameArr}/${dataPost.id}`, dataPost);
};
