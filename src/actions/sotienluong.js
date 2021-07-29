import * as actionTypes from 'constant/actionTypes';

export const danhSachTienLuong = (nameArr) => {
  return {
    type: actionTypes.DANH_SACH_TIEN_LUONG,
    nameArr
  }
}

export const themChamCong = (data, nameArr) => {
  return {
    type: actionTypes.THEM_CHAM_CONG,
    payload: {
      data,
      nameArr
    }
  }
}

export const themTienUngSTL = (data, nameArr) => {
  return {
    type: actionTypes.THEM_TIEN_UNG_STL,
    payload: {
      data,
      nameArr
    }
  }
}

export const themTienBoiDuong = (data, nameArr) => {
  return {
    type: actionTypes.THEM_TIEN_BOI_DUONG,
    payload: {
      data,
      nameArr
    }
  }
}

export const xoaNgayLam = (id, nameArr) => {
  return {
    type: actionTypes.XOA_NGAY_LAM,
    payload: {
      id,
      nameArr
    }
  }
}

export const capNhatNgayLam = (data, nameArr) => {
  return {
    type: actionTypes.CAP_NHAT_NGAY_LAM,
    payload: {
      data,
      nameArr
    }
  }
}

export const themLuongCoBan = (data, nameArr) => {
  return {
    type: actionTypes.LUONG_CO_BAN,
    payload: {
      data,
      nameArr
    }
  }
}

// export const filterThongTinSCS = (arrDate, nameArr) => {
//   return {
//     type: actionTypes.FILTER_THONG_TIN_SCS,
//     payload: {
//       arrDate,
//       nameArr
//     }
//   }
// }

// export const updateThongTinSCS = (dataUpate, nameArr) => {
//   return {
//     type: actionTypes.UPDATE_THONG_TIN_SCS,
//     payload: {
//       dataUpate,
//       nameArr
//     }
//   }
// }
