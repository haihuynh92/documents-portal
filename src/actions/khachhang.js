import * as actionTypes from 'constant/actionTypes';

export const danhSachThongTin = (nameArr) => {
  return {
    type: actionTypes.DANH_SACH_THONG_TIN,
    nameArr
  }
}

export const themThongTin = (data, nameArr) => {
  return {
    type: actionTypes.THEM_THONG_TIN,
    payload: {
      data,
      nameArr
    }
  }
}

export const themTienTraTruoc = (data, nameArr) => {
  return {
    type: actionTypes.THEM_TIEN_TRA_TRUOC,
    payload: {
      data,
      nameArr
    }
  }
}

export const themTienVaiPhuLieu = (data, nameArr) => {
  return {
    type: actionTypes.THEM_TIEN_VAI_PHULIEU,
    payload: {
      data,
      nameArr
    }
  }
}


export const themHangLoi = (data, nameArr) => {
  return {
    type: actionTypes.THEM_HANG_LOI,
    payload: {
      data,
      nameArr
    }
  }
}

export const xoaThongTin = (id, nameArr) => {
  return {
    type: actionTypes.XOA_THONG_TIN,
    payload: {
      id,
      nameArr
    }
  }
}
