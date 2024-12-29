import {
  Action,
  configureStore,
  ReducerType,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";

import AuthSlice from "@redux/modules/auth-slice";
import TokenSlice from "@redux/modules/token-slice";
import UserSlice from "@redux/modules/user-slice";

const reducer = combineReducers({
  token: TokenSlice.reducer,
  auth: AuthSlice.reducer,
  user: UserSlice.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred types: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<ReducerType, unknown, Action>;

export default store;
