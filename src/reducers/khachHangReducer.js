import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const khachhang = createSlice({
  name: 'khachhang',
  initialState: {
    data: []
  },
  reducers: {
    DSThongTin: (state, action) => {
      state.data = action.payload;
    },
    themThongTin: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    xoaThongTin: (state, action) => {
      toastInfo('Xóa thành công!');
      return;
    }
  }
});

const { reducer, actions } = khachhang;

export const { DSThongTin, themThongTin, xoaThongTin } = actions;

export default reducer;
