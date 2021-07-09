import { layDSSoCatApi, themSoCatApi, xoaSoCatApi } from 'api/soCatApi';
import * as actionTypes from 'constant/actionTypes';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { DSSoCat, themSC, xoaSC } from 'reducers/soCatReducer';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

export function* layDSSC(action) {
  try {
    yield put(showLoading());
    const result = yield call(layDSSoCatApi, action.pagingState);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSSoCat(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* themSoCat(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(themSoCatApi, payload.data);

    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield layDSSC(payload);
      yield put(themSC());
    }
  } catch (error) {
    throw new Error(error);
  }
}

// export function* capNhatMaHang(action) {
//   const { payload } = action;

//   try {
//     yield put(showLoading());
//     const result = yield call(capNhatMaHangApi, payload.data);
//     const res = yield call(layDSMaHangApi, payload.pagingState);

//     if (result.status === 200) {
//       yield delay(1000);
//       yield put(hideLoading());
//       yield put(DSMaHang(res.data));
//       yield put(capNhatMH());
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export function* xoaSoCat(action) {
  const { payload } = action;
  
  try {
    yield put(showLoading());
    const result = yield call(xoaSoCatApi, payload.id);
    
    if (result.status === 200) {
      yield layDSSC(payload);
      const DSSoCat = yield select((state) => state.soCatReduder);
      if (!DSSoCat.data.data.length) {
        yield layDSSC({
          pagingState: {
            page: 1,
            limit: DSSoCat.data.pagination._limit
          }
        });
      }
      yield delay(1000);
      yield put(hideLoading());
      yield put(xoaSC());
    }
  } catch (error) {
    throw new Error(error);
  }
}

// export function* timKiemTenHang(action) {
//   const { payload } = action;

//   try {
//     yield put(showLoading());
//     const result = yield call(timKiemMaHangApi, payload.keySearch, payload.pagingState);

//     if (result.status === 200) {
//       yield delay(1000);
//       yield put(hideLoading());
//       yield put(DSMaHang(result.data));
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }


export const watchSoCat = [
  takeLatest(actionTypes.DANH_SACH_SO_CAT, layDSSC),
  takeLatest(actionTypes.THEM_SO_CAT, themSoCat),
  // takeLatest(actionTypes.CAP_NHAT_MA_HANG, capNhatMaHang),
  takeLatest(actionTypes.XOA_SO_CAT, xoaSoCat),
  // takeLatest(actionTypes.TIM_KIEM_TEN_HANG, timKiemTenHang)
];