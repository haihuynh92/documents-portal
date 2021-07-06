import * as actionTypes from 'constant/actionTypes';

export const danhSachCoSoMay = (data) => {
  return {
    type: actionTypes.DANH_SACH_CO_SO_MAY,
    payload: data
  }
}

export const themCS = (data) => {
  return {
    type: actionTypes.THEM_CO_SO_MAY,
    payload: {
      data
    }
  }
}

export const capNhatCS = (data) => {
  return {
    type: actionTypes.CAP_NHAT_CO_SO_MAY,
    payload: {
      data
    }
  }
}

export const XoaCS = (id) => {
  return {
    type: actionTypes.XOA_CO_SO_MAY,
    payload: {
      id
    }
  }
}