import { toast } from 'react-toastify';
import * as actionTypes from 'constant/actionTypes';

export const toastInfo = msg => {
  return toast.info(msg, {
    autoClose: 3000,
  });
}

export const toastError = msg => {
  return toast.error(msg, {
    autoClose: 3000,
  });
}

export const handleMenu = (isShow) => {
  return {
    type: actionTypes.HANDLE_MENU,
    payload: {
      isShow
    }
  }
}