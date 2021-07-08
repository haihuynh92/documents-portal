import * as actionTypes from 'constant/actionTypes';

export const danhSachMaHang = (pagingState) => {
  return {
    type: actionTypes.DANH_SACH_MA_HANG,
    payload: pagingState
  }
}

export const themMH = (data, pagingState) => {
  return {
    type: actionTypes.THEM_MA_HANG,
    payload: {
      data,
      pagingState
    }
  }
}

export const capNhatMH = (data, pagingState) => {
  return {
    type: actionTypes.CAP_NHAT_MA_HANG,
    payload: {
      data,
      pagingState
    }
  }
}

export const XoaMH = (id, pagingState) => {
  return {
    type: actionTypes.XOA_MA_HANG,
    payload: {
      id,
      pagingState
    }
  }
}