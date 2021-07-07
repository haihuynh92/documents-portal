import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const cosomay = createSlice({
  name: 'cosomay',
  initialState: {
    data: []
  },
  reducers: {
    DSCoSoMay: (state, action) => {
      state.data = action.payload;
    },
    themCS: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    capNhatCS: (state, action) => {
      toastInfo('Cập nhật dữ liệu thành công!');
      return;
    },
    xoaCS: (state, action) => {
      toastInfo('Xóa thành công!');
      return;
    }
  }
});

const { reducer, actions } = cosomay;

export const { DSCoSoMay, themCS, capNhatCS, xoaCS } = actions;

export default reducer;
