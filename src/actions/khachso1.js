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


// export const capNhatSC = (data, pagingState) => {
//   return {
//     type: actionTypes.CAP_NHAT_SO_CAT,
//     payload: {
//       data,
//       pagingState
//     }
//   }
// }

// export const XoaSC = (id, pagingState) => {
//   return {
//     type: actionTypes.XOA_SO_CAT,
//     payload: {
//       id,
//       pagingState
//     }
//   }
// }

// export const timKiemSC = (dataSearch, pagingState) => {
//   return {
//     type: actionTypes.TIM_KIEM_SO_CAT,
//     payload: {
//       dataSearch,
//       pagingState
//     }
//   }
// }