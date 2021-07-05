import {all} from 'redux-saga/effects';
import { watchCoSoMay } from './coSoMaySaga';

export default function* rootSaga() {
  yield all([
    ...watchCoSoMay
  ])
}