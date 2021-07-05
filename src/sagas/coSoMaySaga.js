import { geListCoSoMayFromServer } from 'api/coSoMayApi';
import * as actionTypes from 'constant/actionTypes';
import { LuuCoSoMay } from 'reducers/coSoMayReducer';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* getListCoSoMay(action) {
  try {
    yield put(showLoading());
    const result = yield call(geListCoSoMayFromServer);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(LuuCoSoMay(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const watchCoSoMay = [
  takeLatest(actionTypes.DANH_SACH_CO_SO_MAY, getListCoSoMay)
];