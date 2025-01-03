import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, AppThunkDispatch, RootState } from "@/redux/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useThunkDispatch: () => AppThunkDispatch = useDispatch;
