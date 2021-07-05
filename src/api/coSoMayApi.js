import axiosClient from './axiosClient';

export const geListCoSoMayFromServer = () => {
  return axiosClient.get('/cosomays');
};
