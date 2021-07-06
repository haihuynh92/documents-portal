import axiosClient from './axiosClient';

export const layDSCoSoMayApi = () => {
  return axiosClient.get('/cosomays');
};

export const themCoSoMayApi = (dataPost) => {
  return axiosClient.post('/cosomays', dataPost);
};

export const capNhatCoSoMayApi = (dataPost) => {
  return axiosClient.put(`/cosomays/${dataPost.id}`, dataPost);
};

export const xoaCoSoMayApi = (id) => {
  return axiosClient.delete(`/cosomays/${id}`);
};
