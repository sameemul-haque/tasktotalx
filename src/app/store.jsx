import { configureStore, combineReducers } from "@reduxjs/toolkit";
import otpSlice from "../feature/otpSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["otp"],
};

const rootReducer = combineReducers({
  otp: otpSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({ reducer: persistedReducer });
const persistor = persistStore(store);

export { store, persistor };
