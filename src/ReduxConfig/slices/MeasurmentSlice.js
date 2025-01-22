import { createSlice } from "@reduxjs/toolkit";

const measurmentsSlice = createSlice({
  name: "measurments",
  initialState: {
    length: 31,
    width: 41,
    height: 44,
    allSidesNoBars: 6,
    TopBottomNoBars: 4,
    NoBottomBars: 4,
    NoTopBars: 4,
    BarHeight: 6,
    BarWidth: 1,
    boxType: "Crate",
    isHandle: false,
    isdaiognalBar: false,
    toplid: false,
    handleWidth: "",
    handleHeight: "",
  },
  reducers: {
    setValue(state, action) {
      // state.BarHeight = action.payload.BarHeight;
      Object.keys(action.payload).forEach((key) => {
        state[key] =
          typeof state[key] === "number"
            ? Number(action.payload[key])
            : action.payload[key];
      });
    },
    setIsHandle: (state, actions) => {
      state.isHandle = actions.payload;
    },
    setHandleMeasure: (state, actions) => {
      state.handleWidth = actions.payload.handleWidth;
      state.handleHeight = actions.payload.handleHeight;
    },
    setIsTopLid: (state, actions) => {
      state.toplid = actions.payload;
    },
  },
});

export const { setValue, setIsHandle, setHandleMeasure, setIsTopLid } =
  measurmentsSlice.actions;
export default measurmentsSlice.reducer;
