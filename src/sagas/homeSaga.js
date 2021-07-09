import { layDSCoSoMayApi } from 'api/coSoMayApi';
import { layDSTatCaMaHangApi } from 'api/maHangApi';
import * as actionTypes from 'constant/actionTypes';
import { DSCoSoMay, DSMaHang } from 'reducers/homeReducer';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* layDSTatCaMaHang() {
  try {
    yield put(showLoading());
    const result = yield call(layDSTatCaMaHangApi);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSMaHang(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* layDSTatCaCoSoMay() {
  try {
    yield put(showLoading());
    const result = yield call(layDSCoSoMayApi);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSCoSoMay(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const watchHome = [
  takeLatest(actionTypes.DANH_SACH_TAT_CA_MA_HANG, layDSTatCaMaHang),
  takeLatest(actionTypes.DANH_SACH_TAT_CA_CO_SO_MAY, layDSTatCaCoSoMay),
];