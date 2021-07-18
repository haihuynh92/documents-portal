import * as actionTypes from 'constant/actionTypes';
import { controlMenu } from 'reducers/menuReducer';
import { put, takeLatest } from 'redux-saga/effects';

export function* handleControlMenu(action) {
  yield put(controlMenu(action.payload.isShow));
}

export const watchHandleMenu = [
  takeLatest(actionTypes.HANDLE_MENU, handleControlMenu)
];