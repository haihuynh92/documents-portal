import { layDSThongTinSCSApi, themThongTinSCSApi, xoaThongTinSCSApi } from 'api/soCoSoApi';
import * as actionTypes from 'constant/actionTypes';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { DSTTCSC, themTTSCS, xoaTTSCS } from 'reducers/soCoSoReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* layDSThongTinSCS(action) {
  try {
    yield put(showLoading());
    const result = yield call(layDSThongTinSCSApi, action.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTTCSC(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* themThongTinSCS(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(themThongTinSCSApi, payload.data, payload.nameArr);
    const res = yield call(layDSThongTinSCSApi, payload.nameArr);
    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTTCSC(res.data));
      yield put(themTTSCS());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* xoaThongTinSCS(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(xoaThongTinSCSApi, payload.id, payload.nameArr);
    const res = yield call(layDSThongTinSCSApi, payload.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTTCSC(res.data));
      yield put(xoaTTSCS());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const watchSoCoSo = [
  takeLatest(actionTypes.DANH_SACH_THONG_TIN_SCS, layDSThongTinSCS),
  takeLatest(actionTypes.THEM_THONG_TIN_SCS, themThongTinSCS),
  takeLatest(actionTypes.THEM_TIEN_UNG_SCS, themThongTinSCS),
  takeLatest(actionTypes.THEM_HANG_LOI_SCS, themThongTinSCS),
  takeLatest(actionTypes.XOA_THONG_TIN_SCS, xoaThongTinSCS)
]