import * as actionTypes from 'constant/actionTypes';

export const danhSachThongTinSCS = (nameArr) => {
  return {
    type: actionTypes.DANH_SACH_THONG_TIN_SCS,
    nameArr
  }
}

export const themThongTinSCS = (data, nameArr) => {
  return {
    type: actionTypes.THEM_THONG_TIN_SCS,
    payload: {
      data,
      nameArr
    }
  }
}

export const themTienUngSCS = (data, nameArr) => {
  return {
    type: actionTypes.THEM_TIEN_UNG_SCS,
    payload: {
      data,
      nameArr
    }
  }
}

export const themHangLoiSCS = (data, nameArr) => {
  return {
    type: actionTypes.THEM_HANG_LOI_SCS,
    payload: {
      data,
      nameArr
    }
  }
}

export const xoaThongTinSCS = (id, nameArr) => {
  return {
    type: actionTypes.XOA_THONG_TIN_SCS,
    payload: {
      id,
      nameArr
    }
  }
}
