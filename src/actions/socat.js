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

// export const capNhatMH = (data, pagingState) => {
//   return {
//     type: actionTypes.CAP_NHAT_MA_HANG,
//     payload: {
//       data,
//       pagingState
//     }
//   }
// }

export const XoaSC = (id, pagingState) => {
  return {
    type: actionTypes.XOA_SO_CAT,
    payload: {
      id,
      pagingState
    }
  }
}

// export const timKiemTH = (keySearch, pagingState) => {
//   return {
//     type: actionTypes.TIM_KIEM_TEN_HANG,
//     payload: {
//       keySearch,
//       pagingState
//     }
//   }
// }