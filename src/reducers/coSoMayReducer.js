// import { toastSuccess } from "features/actions";

const { createSlice } = require("@reduxjs/toolkit");

const cosomay = createSlice({
  name: 'cosomay',
  initialState: [],
  reducers: {
    LuuCoSoMay: (state, action) => {
      return state = action.payload;
    }
  }
});

const { reducer, actions } = cosomay;

export const { LuuCoSoMay } = actions;

export default reducer;
