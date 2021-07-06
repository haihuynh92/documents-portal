import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

import loginReducer from 'reducers/loginReducer';
import loadingReducer from 'reducers/loadingReducer';
import coSoMayReducer from 'reducers/coSoMayReducer';

const rootReducer = {
  loginReducer,
  loadingReducer,
  coSoMayReducer
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;