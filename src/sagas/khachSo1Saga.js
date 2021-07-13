import { layDSKhachSo1Api, themKhachSo1Api } from 'api/khachSo1Api';
import * as actionTypes from 'constant/actionTypes';
import { DSKS1, themKS1 } from 'reducers/khachSo1Reducer';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* layDSKS1() {
  try {
    yield put(showLoading());
    const result = yield call(layDSKhachSo1Api);
    
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSKS1(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* themKhachSo1(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(themKhachSo1Api, payload.data);
    const res = yield call(layDSKhachSo1Api);
    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSKS1(res.data));
      yield put(themKS1());
    }
  } catch (error) {
    throw new Error(error);
  }
}

// export function* capNhatSoCat(action) {
//   const { payload } = action;

//   try {
//     yield put(showLoading());
//     const result = yield call(capNhatSoCatApi, payload.data);
//     const res = yield call(layDSSoCatApi, payload.pagingState);
//     if (result.status === 200) {
//       yield delay(1000);
//       yield put(hideLoading());
//       yield put(DSSoCat(res.data));
//       yield put(capNhatSC());
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// export function* xoaSoCat(action) {
//   const { payload } = action;
  
//   try {
//     yield put(showLoading());
//     const result = yield call(xoaSoCatApi, payload.id);
//     const res = yield call(layDSSoCatApi, payload.pagingState);
//     if (result.status === 200) {
//       yield delay(1000);
//       yield put(hideLoading());
//       yield put(DSSoCat(res.data));
//       yield put(xoaSC());
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// export function* timKiemSoCat(action) {
//   const { payload } = action;
//   try {
//     if (!payload.dataSearch.ngaycat && !payload.dataSearch.mahangId) {
//       return;
//     }
//     const convertData = {
//       ngaycat: !moment(payload.dataSearch.ngaycat).isValid() ? "" : moment(payload.dataSearch.ngaycat).format('DD/MM/YYYY'),
//       mahangId: payload.dataSearch.mahangId
//     };
//     yield put(showLoading());
//     const result = yield call(timKiemSoCatApi, convertData, payload.pagingState);
//     if (result.status === 200) {
//       yield delay(1000);
//       yield put(hideLoading());
//       yield put(DSSoCat(result.data));
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export const watchKhachSo1 = [
  takeLatest(actionTypes.DANH_SACH_SO_KHACH1, layDSKS1),
  takeLatest(actionTypes.THEM_SO_KHACH1, themKhachSo1),
  // takeLatest(actionTypes.CAP_NHAT_SO_CAT, capNhatSoCat),
  // takeLatest(actionTypes.XOA_SO_CAT, xoaSoCat),
  // takeLatest(actionTypes.TIM_KIEM_SO_CAT, timKiemSoCat)
]