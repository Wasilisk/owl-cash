import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from "./sagas";
import rootReducer from "./reducers";

const persistConfig = {
    key: 'root',
    whitelist: ['auth'],
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()


export const store = createStore(persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

