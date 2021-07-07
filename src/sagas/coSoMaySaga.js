import { capNhatCoSoMayApi, layDSCoSoMayApi, themCoSoMayApi, xoaCoSoMayApi } from 'api/coSoMayApi';
import * as actionTypes from 'constant/actionTypes';
import { capNhatCS, DSCoSoMay, themCS, xoaCS } from 'reducers/coSoMayReducer';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* layDSCoSoMay() {
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

export function* themCoSoMay(action) {

  const { payload } = action;
  
  try {
    yield put(showLoading());
    const result = yield call(themCoSoMayApi, payload.data);

    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield layDSCoSoMay();
      yield put(themCS());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* capNhatCoSoMay(action) {
  try {
    yield put(showLoading());
    const result = yield call(capNhatCoSoMayApi, action.payload.data);

    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield layDSCoSoMay();
      yield put(capNhatCS());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* xoaCoSoMay(action) {
  try {
    yield put(showLoading());
    const result = yield call(xoaCoSoMayApi, action.payload.id);

    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield layDSCoSoMay();
      yield put(xoaCS());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const watchCoSoMay = [
  takeLatest(actionTypes.DANH_SACH_CO_SO_MAY, layDSCoSoMay),
  takeLatest(actionTypes.THEM_CO_SO_MAY, themCoSoMay),
  takeLatest(actionTypes.CAP_NHAT_CO_SO_MAY, capNhatCoSoMay),
  takeLatest(actionTypes.XOA_CO_SO_MAY, xoaCoSoMay)
];