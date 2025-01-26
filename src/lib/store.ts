import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import bottomSheetReducer from "./features/bottomsheet/bottomsheet.slice";
import userReducer from "./features/user/user.slice";
import CommunityReducer from "./features/community/community.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      bottomSheet: bottomSheetReducer,
      userRecord: userReducer,
      masterCommunity: CommunityReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch;
// export const useAppSelector = useSelector;
// export const useAppStore = useStore;
export const useAppDispatch = useDispatch?.withTypes<AppDispatch>?.();
export const useAppSelector = useSelector?.withTypes<RootState>?.();
export const useAppStore = useStore?.withTypes<AppStore>?.();
