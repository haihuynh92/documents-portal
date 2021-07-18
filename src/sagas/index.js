import {all} from 'redux-saga/effects';
import { watchCoSoMay } from './coSoMaySaga';
import { watchHandleMenu } from './handleMenuSaga';
import { watchHome } from './homeSaga';
import { watchKhachSo1 } from './khachSo1Saga';
import { watchMaHang } from './maHangSaga';
import { watchSoCat } from './soCatSaga';

export default function* rootSaga() {
  yield all([
    ...watchHandleMenu,
    ...watchHome,
    ...watchCoSoMay,
    ...watchMaHang,
    ...watchSoCat,
    ...watchKhachSo1
  ])
}