import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

import loginReducer from 'reducers/loginReducer';
import homeReducer from 'reducers/homeReducer';
import loadingReducer from 'reducers/loadingReducer';
import coSoMayReducer from 'reducers/coSoMayReducer';
import maHangReducer from 'reducers/maHangReducer';
import soCatReduder from 'reducers/soCatReducer';

const rootReducer = {
  loginReducer,
  loadingReducer,
  homeReducer,
  coSoMayReducer,
  maHangReducer,
  soCatReduder
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;
