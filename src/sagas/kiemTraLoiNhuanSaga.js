import { layDSTrongNamApi, layDSTrongThangApi } from 'api/kiemTraLoiNhuanApi';
import * as actionTypes from 'constant/actionTypes';
import { DSHangGiaoTrongNam, DSHangGiaoTrongThang } from 'reducers/kiemTraLoiNhuanReducer';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* layDSTrongThang(action) {
  const { payload } = action;
  let result = {
    data: []
  };
  try {
    yield put(showLoading());
    for(let i = 0; i < payload.data.so.length; i++) {
      let res = yield call(layDSTrongThangApi, payload.data.so[i], payload.data.thang);
      result.data = result.data.concat(res.data);
    }

    yield delay(1000);
    yield put(hideLoading());
    yield put(DSHangGiaoTrongThang(result.data));
  } catch (error) {
    throw new Error(error);
  }
}

export function* layDSTrongNam(action) {
  const { payload } = action;
  let result = {
    data: []
  };
  try {
    yield put(showLoading());
    for(let i = 0; i < payload.data.so.length; i++) {
      let res = yield call(layDSTrongNamApi, payload.data.so[i], payload.data.nam);
      result.data = result.data.concat(res.data);
    }

    yield delay(1000);
    yield put(hideLoading());
    yield put(DSHangGiaoTrongNam(result.data));
  } catch (error) {
    throw new Error(error);
  }
}

export const watchKiemTraLoiNhuan = [
  takeLatest(actionTypes.KIEM_TRA_LOI_NHUAN_THANG, layDSTrongThang),
  takeLatest(actionTypes.KIEM_TRA_LOI_NHUAN_NAM, layDSTrongNam)
];