import { layDSThongTinApi, themThongTinApi } from 'api/khachHangApi';
import * as actionTypes from 'constant/actionTypes';
import { DSThongTin, themThongTin } from 'reducers/khachHangReducer';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* layDSThongTin(action) {
  try {
    yield put(showLoading());
    const result = yield call(layDSThongTinApi, action.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSThongTin(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* themThongTinGiaoHang(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(themThongTinApi, payload.data, payload.nameArr);
    const res = yield call(layDSThongTinApi, payload.nameArr);
    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSThongTin(res.data));
      yield put(themThongTin());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const watchKhachHang = [
  takeLatest(actionTypes.DANH_SACH_THONG_TIN, layDSThongTin),
  takeLatest(actionTypes.THEM_THONG_TIN, themThongTinGiaoHang),
  takeLatest(actionTypes.THEM_TIEN_TRA_TRUOC, themThongTinGiaoHang),
  takeLatest(actionTypes.THEM_HANG_LOI, themThongTinGiaoHang)
]