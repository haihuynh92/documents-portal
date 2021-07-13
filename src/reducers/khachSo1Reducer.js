import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const khachso1 = createSlice({
  name: 'khachso1',
  initialState: {
    data: []
  },
  reducers: {
    DSKS1: (state, action) => {
      state.data = action.payload;
    },
    themKS1: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    // capNhatSC: (state, action) => {
    //   toastInfo('Cập nhật dữ liệu thành công!');
    //   return;
    // },
    // xoaSC: (state, action) => {
    //   toastInfo('Xóa thành công!');
    //   return;
    // }
  }
});

const { reducer, actions } = khachso1;

export const { DSKS1, themKS1 } = actions;

export default reducer;
