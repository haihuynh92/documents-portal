import { configureStore } from '@reduxjs/toolkit';
import coSoMayReducer from 'reducers/coSoMayReducer';
import homeReducer from 'reducers/homeReducer';
import khachHangReduder from 'reducers/khachHangReducer';
import kiemTraLoiNhuanReduder from 'reducers/kiemTraLoiNhuanReducer';
import loadingReducer from 'reducers/loadingReducer';
import loginReducer from 'reducers/loginReducer';
import maHangReducer from 'reducers/maHangReducer';
import menuReduder from 'reducers/menuReducer';
import soCatReduder from 'reducers/soCatReducer';
import soCoSoReducer from 'reducers/soCoSoReducer';
import soChamCongReduder from 'reducers/soChamCongReducer';
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
  soCoSoReducer,
  soChamCongReduder
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
