// store.js
import { configureStore } from "@reduxjs/toolkit";
import MeasurmentReducer from "./slices/MeasurmentSlice";
import ZoomInOutSlice from "./slices/ZoomInOutSlice";

const store = configureStore({
  reducer: {
    Measurment: MeasurmentReducer,
    ZoomValue: ZoomInOutSlice,
  },
});

export default store;
