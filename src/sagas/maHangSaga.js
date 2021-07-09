import { capNhatMaHangApi, layDSMaHangApi, themMaHangApi, timKiemMaHangApi, xoaMaHangApi } from 'api/maHangApi';
import * as actionTypes from 'constant/actionTypes';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { capNhatMH, DSMaHang, themMH, xoaMH } from 'reducers/maHangReducer';
import { call, delay, put, select, takeLatest } from 'redux-saga/effects';

export function* layDSMH(action) {
  try {
    yield put(showLoading());
    const result = yield call(layDSMaHangApi, action.pagingState);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSMaHang(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* themMaHang(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(themMaHangApi, payload.data);

    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield layDSMH(payload);
      yield put(themMH());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* capNhatMaHang(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(capNhatMaHangApi, payload.data);

    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield layDSMH(payload);
      yield put(capNhatMH());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* xoaMaHang(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(xoaMaHangApi, payload.id);

    if (result.status === 200) {
      yield layDSMH(payload);
      const listMH = yield select((state) => state.maHangReducer);
      if (!listMH.data.data.length) {
        yield layDSMH({
          pagingState: {
            page: 1,
            limit: listMH.data.pagination._limit
          }
        });
      }
      yield delay(1000);
      yield put(hideLoading());
      yield put(xoaMH());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* timKiemTenHang(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(timKiemMaHangApi, payload.keySearch, payload.pagingState);

    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSMaHang(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const watchMaHang = [
  takeLatest(actionTypes.DANH_SACH_MA_HANG, layDSMH),
  takeLatest(actionTypes.THEM_MA_HANG, themMaHang),
  takeLatest(actionTypes.CAP_NHAT_MA_HANG, capNhatMaHang),
  takeLatest(actionTypes.XOA_MA_HANG, xoaMaHang),
  takeLatest(actionTypes.TIM_KIEM_TEN_HANG, timKiemTenHang)
];