import { capNhatChamCongApi, filterChamCongApi, layDSChamCongApi, themChamCongApi, xacNhanChamCongApi, xoaChamCongApi } from 'api/soChamCongApi';
import * as actionTypes from 'constant/actionTypes';
import moment from 'moment';
import { hideLoading, showLoading } from 'reducers/loadingReducer';
import { capNhatCC, DSCC, themCC, xoaCC } from 'reducers/soChamCongReducer';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

export function* layDSChamCong(action) {
  try {
    yield put(showLoading());
    const result = yield call(layDSChamCongApi, action.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSCC(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* themChamCong(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(themChamCongApi, payload.data, payload.nameArr);
    const res = yield call(layDSChamCongApi, payload.nameArr);
    if (result.status === 201) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSCC(res.data));
      yield put(themCC());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* xoaChamCong(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(xoaChamCongApi, payload.id, payload.nameArr);
    const res = yield call(layDSChamCongApi, payload.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSCC(res.data));
      yield put(xoaCC());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* capNhatChamCong(action) {
  const { payload } = action;

  try {
    yield put(showLoading());
    const result = yield call(capNhatChamCongApi, payload.data, payload.nameArr);
    const res = yield call(layDSChamCongApi, payload.nameArr);
    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSCC(res.data));
      yield put(capNhatCC());
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* filterChamCong(action) {
  const { payload } = action;
  try {
    if (payload.arrDate === null) {
      return;
    }
    const convertData = {
      ngaynhap: payload.arrDate === null ? null : [moment(payload.arrDate[0]).format('DD/MM/YYYY'), moment(payload.arrDate[1]).format('DD/MM/YYYY')]
    };
    yield put(showLoading());
    const result = yield call(filterChamCongApi, convertData, payload.nameArr);

    if (result.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSCC(result.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export function* xacNhanChamCong(action) {
  const { payload } = action;
  try {
    yield put(showLoading());
    for(let i = 0; i < payload.dataConfirm.length; i++) {
      let dataPost = {
        ...payload.dataConfirm[i],
        thanhtoan: true
      }
      yield call(xacNhanChamCongApi, dataPost, payload.nameArr);
    }
    const res = yield call(layDSChamCongApi, payload.nameArr);
    if (res.status === 200) {
      yield delay(1000);
      yield put(hideLoading());
      yield put(DSCC(res.data));
    }
  } catch (error) {
    throw new Error(error);
  }
}

export const watchSoChamCong = [
  takeLatest(actionTypes.DANH_SACH_CHAM_CONG, layDSChamCong),
  takeLatest(actionTypes.THEM_CHAM_CONG, themChamCong),
  takeLatest(actionTypes.THEM_TIEN_UNG_STL, themChamCong),
  takeLatest(actionTypes.THEM_TIEN_BOI_DUONG, themChamCong),
  takeLatest(actionTypes.XOA_CHAM_CONG, xoaChamCong),
  takeLatest(actionTypes.CAP_NHAT_CHAM_CONG, capNhatChamCong),
  takeLatest(actionTypes.FILTER_CHAM_CONG, filterChamCong),
  takeLatest(actionTypes.XAC_NHAN_CHAM_CONG, xacNhanChamCong)
]