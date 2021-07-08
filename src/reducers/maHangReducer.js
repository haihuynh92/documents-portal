import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const mahang = createSlice({
  name: 'mahang',
  initialState: {
    data: []
  },
  reducers: {
    DSMaHang: (state, action) => {
      state.data = action.payload;
    },
    themMH: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    capNhatMH: (state, action) => {
      toastInfo('Cập nhật dữ liệu thành công!');
      return;
    },
    xoaMH: (state, action) => {
      toastInfo('Xóa thành công!');
      return;
    }
  }
});

const { reducer, actions } = mahang;

export const { DSMaHang, themMH, capNhatMH, xoaMH } = actions;

export default reducer;
