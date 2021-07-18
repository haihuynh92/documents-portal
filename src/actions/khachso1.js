import * as actionTypes from 'constant/actionTypes';

export const danhSachKhachSo1 = () => {
  return {
    type: actionTypes.DANH_SACH_SO_KHACH1
  }
}

export const themSoKhachSo1 = (data) => {
  return {
    type: actionTypes.THEM_SO_KHACH1,
    payload: {
      data
    }
  }
}

export const themTienTraTruoc = (data) => {
  return {
    type: actionTypes.THEM_TIEN_TRA_TRUOC,
    payload: {
      data
    }
  }
}

export const themHangLoi = (data) => {
  return {
    type: actionTypes.THEM_HANG_LOI,
    payload: {
      data
    }
  }
}
