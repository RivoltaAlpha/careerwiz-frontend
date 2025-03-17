import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer,} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersAPI } from "../features/users/usersAPI";
import { registrationAPI } from "../features/register/register";
import { loginApi } from "../features/login/loginAPI";
import { careersApi } from "../features/careers/careersAPI";
import { academicsAPI } from "../features/Academics/academicsAPI";
import { InterestsApi } from "../features/interests/interestsAPI";
import UserAuthReducer from "../features/login/loginSlice";
import userReducer from "../features/users/userSlice";
import careerReducer from "../features/careers/careersSlice";
import academicsReducer from "../features/Academics/academicsSlice";


const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    usersAPI.reducerPath,
    registrationAPI.reducerPath,
    loginApi.reducerPath  ,
    careersApi.reducerPath,
    academicsAPI.reducerPath,
    InterestsApi.reducerPath,
    careersApi.reducerPath],
  whitelist: [loginApi.reducerPath],
};

const rootReducer = combineReducers({
    userAuth: UserAuthReducer,
    user: userReducer,
    career: careerReducer,
    academics: academicsReducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [registrationAPI.reducerPath]: registrationAPI.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [careersApi.reducerPath]: careersApi.reducer,
    [academicsAPI.reducerPath]: academicsAPI.reducer,
    [InterestsApi.reducerPath]: InterestsApi.reducer,
  // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }).concat(
      usersAPI.middleware,
      registrationAPI.middleware,
      loginApi.middleware,
      careersApi.middleware,
      academicsAPI.middleware,
      InterestsApi.middleware
      // Add other middleware here
    ),
});

const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };