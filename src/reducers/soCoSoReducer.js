import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const thongtinsocoso = createSlice({
  name: 'thongtinsocoso',
  initialState: {
    data: []
  },
  reducers: {
    DSTTCSC: (state, action) => {
      state.data = action.payload;
    },
    themTTSCS: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    xoaTTSCS: (state, action) => {
      toastInfo('Xóa thành công!');
      return;
    }
  }
});

const { reducer, actions } = thongtinsocoso;

export const { DSTTCSC, themTTSCS, xoaTTSCS } = actions;

export default reducer;
