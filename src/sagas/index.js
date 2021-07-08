import {all} from 'redux-saga/effects';
import { watchCoSoMay } from './coSoMaySaga';
import { watchMaHang } from './maHangSaga';

export default function* rootSaga() {
  yield all([
    ...watchCoSoMay,
    ...watchMaHang
  ])
}