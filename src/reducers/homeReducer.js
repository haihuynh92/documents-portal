
const { createSlice } = require("@reduxjs/toolkit");

const home = createSlice({
  name: 'home',
  initialState: {
    dsmahang: [],
    dscosomay: []
  },
  reducers: {
    DSMaHang: (state, action) => {
      state.dsmahang = action.payload;
    },
    DSCoSoMay: (state, action) => {
      state.dscosomay = action.payload;
    }
  }
});

const { reducer, actions } = home;

export const { DSMaHang, DSCoSoMay } = actions;

export default reducer;
