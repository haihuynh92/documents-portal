import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const socat = createSlice({
  name: 'socat',
  initialState: {
    data: [],
    dsmahang: []
  },
  reducers: {
    DSSoCat: (state, action) => {
      state.data = action.payload;
    },
    DSMaHang: (state, action) => {
      state.dsmahang = action.payload;
    },
    themSC: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    // capNhatMH: (state, action) => {
    //   toastInfo('Cập nhật dữ liệu thành công!');
    //   return;
    // },
    xoaSC: (state, action) => {
      toastInfo('Xóa thành công!');
      return;
    }
  }
});

const { reducer, actions } = socat;

export const { DSSoCat, themSC, DSMaHang, xoaSC } = actions;

export default reducer;
