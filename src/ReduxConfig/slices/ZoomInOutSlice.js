import { createSlice } from "@reduxjs/toolkit";

const ZoomInOutSlice = createSlice({
  name: "zoomValue",
  initialState: {
    zoomValue: 20,
  },
  reducers: {
    setZoomValue: (state, actions) => {
      // console.log("actions.payload :>> ", actions.payload);
      // console.log("state :>> ", state.zoomValue);
      // Object.assign(state, actions.payload);
      state.zoomValue = actions.payload;
      // console.log("state :>> ", state.zoomValue);
    },
    ZoomOut: (state) => {
      console.log("ZoomIn", state.zoomValue);
      state.zoomValue = state.zoomValue + 1;
    },
    ZoomIn: (state) => {
      state.zoomValue = state.zoomValue - 1;
    },
  },
});

export const { setZoomValue, ZoomIn, ZoomOut } = ZoomInOutSlice.actions;
export default ZoomInOutSlice.reducer;
