import { capNhatSoCatApi, layDSSoCatApi, themSoCatApi, timKiemSoCatApi, xoaSoCatApi } from 'api/soCatApi';
import * as actionTypes from 'constant/actionTypes';
import moment from 'moment';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { capNhatSC, DSSoCat, themSC, xoaSC } from 'reducers/soCatReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

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
    const res = yield call(layDSSoCatApi, payload.pagingState);
    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSSoCat(res.data));
      yield put(themSC());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* capNhatSoCat(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(capNhatSoCatApi, payload.data);
    const res = yield call(layDSSoCatApi, payload.pagingState);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSSoCat(res.data));
      yield put(capNhatSC());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* xoaSoCat(action) {
  const { payload } = action;
  
  try {
    yield put(showLoading());
    const result = yield call(xoaSoCatApi, payload.id);
    const res = yield call(layDSSoCatApi, payload.pagingState);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSSoCat(res.data));
      yield put(xoaSC());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* timKiemSoCat(action) {
  const { payload } = action;
  try {
    if (payload.dataSearch.ngaycat === null && !payload.dataSearch.mahangId && !payload.dataSearch.cosomayId) {
      return;
    }
    const convertData = {
      ngaycat: payload.dataSearch.ngaycat === null ? null : [moment(payload.dataSearch.ngaycat[0]).format('DD/MM/YYYY'), moment(payload.dataSearch.ngaycat[1]).format('DD/MM/YYYY')],
      mahangId: payload.dataSearch.mahangId,
      cosomayId: payload.dataSearch.cosomayId
    };
    yield put(showLoading());
    const result = yield call(timKiemSoCatApi, convertData, payload.pagingState);
    
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSSoCat(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const watchSoCat = [
  takeLatest(actionTypes.DANH_SACH_SO_CAT, layDSSC),
  takeLatest(actionTypes.THEM_SO_CAT, themSoCat),
  takeLatest(actionTypes.CAP_NHAT_SO_CAT, capNhatSoCat),
  takeLatest(actionTypes.XOA_SO_CAT, xoaSoCat),
  takeLatest(actionTypes.TIM_KIEM_SO_CAT, timKiemSoCat)
]