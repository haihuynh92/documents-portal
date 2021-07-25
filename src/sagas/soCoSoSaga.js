import { filterThongTinSCSApi, layDSThongTinSCSApi, themThongTinSCSApi, updateThongTinSCSApi, xoaThongTinSCSApi } from 'api/soCoSoApi';
import * as actionTypes from 'constant/actionTypes';
import moment from 'moment';
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

export function* filterThongTinSCS(action) {
  const { payload } = action;
  try {
    if (payload.arrDate === null) {
      return;
    }
    const convertData = {
      ngaynhap: payload.arrDate === null ? null : [moment(payload.arrDate[0]).format('DD/MM/YYYY'), moment(payload.arrDate[1]).format('DD/MM/YYYY')]
    };
    yield put(showLoading());
    const result = yield call(filterThongTinSCSApi, convertData, payload.nameArr);

    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTTCSC(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* updateThongTinSCS(action) {
  const { payload } = action;
  try {
    yield put(showLoading());
    for(let i = 0; i < payload.dataUpate.length; i++) {
      let dataPost = {
        ...payload.dataUpate[i],
        thanhtoan: true
      }
      yield call(updateThongTinSCSApi, dataPost, payload.nameArr);
    }
    const res = yield call(layDSThongTinSCSApi, payload.nameArr);
    if (res.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSTTCSC(res.data));
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
  takeLatest(actionTypes.XOA_THONG_TIN_SCS, xoaThongTinSCS),
  takeLatest(actionTypes.FILTER_THONG_TIN_SCS, filterThongTinSCS),
  takeLatest(actionTypes.UPDATE_THONG_TIN_SCS, updateThongTinSCS)
]