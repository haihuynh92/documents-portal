import { toast } from 'react-toastify';

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