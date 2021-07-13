import { configureStore } from '@reduxjs/toolkit';
import coSoMayReducer from 'reducers/coSoMayReducer';
import homeReducer from 'reducers/homeReducer';
import khachSo1Reduder from 'reducers/khachSo1Reducer';
import loadingReducer from 'reducers/loadingReducer';
import loginReducer from 'reducers/loginReducer';
import maHangReducer from 'reducers/maHangReducer';
import soCatReduder from 'reducers/soCatReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

const rootReducer = {
  loginReducer,
  loadingReducer,
  homeReducer,
  coSoMayReducer,
  maHangReducer,
  soCatReduder,
  khachSo1Reduder
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
