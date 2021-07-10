import * as actionTypes from 'constant/actionTypes';

export const danhSachSoCat = (pagingState) => {
  return {
    type: actionTypes.DANH_SACH_SO_CAT,
    pagingState: pagingState
  }
}

export const themSC = (data, pagingState) => {
  return {
    type: actionTypes.THEM_SO_CAT,
    payload: {
      data,
      pagingState
    }
  }
}

export const capNhatSC = (data, pagingState) => {
  return {
    type: actionTypes.CAP_NHAT_SO_CAT,
    payload: {
      data,
      pagingState
    }
  }
}

export const XoaSC = (id, pagingState) => {
  return {
    type: actionTypes.XOA_SO_CAT,
    payload: {
      id,
      pagingState
    }
  }
}

export const timKiemSC = (dataSearch, pagingState) => {
  return {
    type: actionTypes.TIM_KIEM_SO_CAT,
    payload: {
      dataSearch,
      pagingState
    }
  }
}