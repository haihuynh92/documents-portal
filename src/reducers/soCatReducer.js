import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const socat = createSlice({
  name: 'socat',
  initialState: {
    data: []
  },
  reducers: {
    DSSoCat: (state, action) => {
      state.data = action.payload;
    },
    themSC: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    capNhatSC: (state, action) => {
      toastInfo('Cập nhật dữ liệu thành công!');
      return;
    },
    xoaSC: (state, action) => {
      toastInfo('Xóa thành công!');
      return;
    }
  }
});

const { reducer, actions } = socat;

export const { DSSoCat, themSC, xoaSC, capNhatSC } = actions;

export default reducer;
