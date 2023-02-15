import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";

const persistConfig = {
  key: "root", // 储存的标识名
  storage, // 储存方式
};

const perReducer = persistReducer(persistConfig,reducer)

const composeEnhancers = 
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  perReducer,
  composeEnhancers(applyMiddleware(thunk))
)

const persistor = persistStore(store)

export {store,persistor}