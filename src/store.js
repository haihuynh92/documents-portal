import { configureStore } from '@reduxjs/toolkit';
import coSoMayReducer from 'reducers/coSoMayReducer';
import homeReducer from 'reducers/homeReducer';
import khachHangReduder from 'reducers/khachHangReducer';
import soCoSoReducer from 'reducers/soCoSoReducer';
import loadingReducer from 'reducers/loadingReducer';
import loginReducer from 'reducers/loginReducer';
import maHangReducer from 'reducers/maHangReducer';
import soCatReduder from 'reducers/soCatReducer';
import kiemTraLoiNhuanReduder from 'reducers/kiemTraLoiNhuanReducer';
import menuReduder from 'reducers/menuReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

const rootReducer = {
  loginReducer,
  loadingReducer,
  homeReducer,
  coSoMayReducer,
  maHangReducer,
  soCatReduder,
  khachHangReduder,
  menuReduder,
  kiemTraLoiNhuanReduder,
  soCoSoReducer
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
