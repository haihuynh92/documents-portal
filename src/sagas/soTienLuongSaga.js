import { capNhatNgayLamApi, layDSTienLuongApi, themChamCongApi, xoaNgayLamApi } from 'api/soTienLuongApi';
import * as actionTypes from 'constant/actionTypes';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { capNhatTL, DSTL, themTL, xoaTL } from 'reducers/soTienLuongReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* layDSTienLuong(action) {
  try {
    yield put(showLoading());
    const result = yield call(layDSTienLuongApi, action.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTL(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* themChamCong(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(themChamCongApi, payload.data, payload.nameArr);
    const res = yield call(layDSTienLuongApi, payload.nameArr);
    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTL(res.data));
      yield put(themTL());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* xoaNgayLam(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(xoaNgayLamApi, payload.id, payload.nameArr);
    const res = yield call(layDSTienLuongApi, payload.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTL(res.data));
      yield put(xoaTL());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* capNhatNgayLam(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(capNhatNgayLamApi, payload.data, payload.nameArr);
    const res = yield call(layDSTienLuongApi, payload.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTL(res.data));
      yield put(capNhatTL());
    }
  } catch (error) {
    throw new Error(error);
  }
}

// export function* filterThongTinSCS(action) {
//   const { payload } = action;
//   try {
//     if (payload.arrDate === null) {
//       return;
//     }
//     const convertData = {
//       ngaynhap: payload.arrDate === null ? null : [moment(payload.arrDate[0]).format('DD/MM/YYYY'), moment(payload.arrDate[1]).format('DD/MM/YYYY')]
//     };
//     yield put(showLoading());
//     const result = yield call(filterThongTinSCSApi, convertData, payload.nameArr);

//     if (result.status === 200) {
//       yield delay(1000);
//       yield put(hideLoading());
//       yield put(DSTTCSC(result.data));
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// export function* updateThongTinSCS(action) {
//   const { payload } = action;
//   try {
//     yield put(showLoading());
//     for(let i = 0; i < payload.dataUpate.length; i++) {
//       let dataPost = {
//         ...payload.dataUpate[i],
//         thanhtoan: true
//       }
//       yield call(updateThongTinSCSApi, dataPost, payload.nameArr);
//     }
//     const res = yield call(layDSThongTinSCSApi, payload.nameArr);
//     if (res.status === 200) {
//       yield delay(1000);
//       yield put(hideLoading());
//       yield put(DSTTCSC(res.data));
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export const watchSoTienLuong = [
  takeLatest(actionTypes.DANH_SACH_TIEN_LUONG, layDSTienLuong),
  takeLatest(actionTypes.THEM_CHAM_CONG, themChamCong),
  takeLatest(actionTypes.THEM_TIEN_UNG_STL, themChamCong),
  takeLatest(actionTypes.THEM_TIEN_BOI_DUONG, themChamCong),
  takeLatest(actionTypes.LUONG_CO_BAN, themChamCong),
  takeLatest(actionTypes.XOA_NGAY_LAM, xoaNgayLam),
  takeLatest(actionTypes.CAP_NHAT_NGAY_LAM, capNhatNgayLam),
  // takeLatest(actionTypes.FILTER_THONG_TIN_SCS, filterThongTinSCS),
  // takeLatest(actionTypes.UPDATE_THONG_TIN_SCS, updateThongTinSCS)
]