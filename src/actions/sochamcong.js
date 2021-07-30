import * as actionTypes from 'constant/actionTypes';

export const danhSachChamCong = (nameArr) => {
  return {
    type: actionTypes.DANH_SACH_CHAM_CONG,
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

export const xoaChamCong = (id, nameArr) => {
  return {
    type: actionTypes.XOA_CHAM_CONG,
    payload: {
      id,
      nameArr
    }
  }
}

export const capNhatChamCong = (data, nameArr) => {
  return {
    type: actionTypes.CAP_NHAT_CHAM_CONG,
    payload: {
      data,
      nameArr
    }
  }
}

export const filterChamCong = (arrDate, nameArr) => {
  return {
    type: actionTypes.FILTER_CHAM_CONG,
    payload: {
      arrDate,
      nameArr
    }
  }
}

// export const updateThongTinSCS = (dataUpate, nameArr) => {
//   return {
//     type: actionTypes.UPDATE_THONG_TIN_SCS,
//     payload: {
//       dataUpate,
//       nameArr
//     }
//   }
// }
