import { configureStore, createStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, productReducer);

const store = configureStore({
  reducer: {
    product: persistedReducer,
  },
});
const persistor = persistStore(store);

export { store, persistor };
