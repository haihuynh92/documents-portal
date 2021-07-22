import * as actionTypes from 'constant/actionTypes';

export const danhSachTatCaTrongThang = (data) => {
  return {
    type: actionTypes.KIEM_TRA_LOI_NHUAN_THANG,
    payload: {
      data
    }
  }
}

export const danhSachTatCaTrongNam = (data) => {
  return {
    type: actionTypes.KIEM_TRA_LOI_NHUAN_NAM,
    payload: {
      data
    }
  }
}
