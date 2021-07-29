import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const thongtintienluong = createSlice({
  name: 'thongtintienluong',
  initialState: {
    data: []
  },
  reducers: {
    DSTL: (state, action) => {
      state.data = action.payload;
    },
    themTL: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    xoaTL: (state, action) => {
      toastInfo('Xóa thành công!');
      return;
    },
    capNhatTL: (state, action) => {
      toastInfo('Cập nhật thành công!');
      return;
    }
  }
});

const { reducer, actions } = thongtintienluong;

export const { DSTL, themTL, xoaTL, capNhatTL } = actions;

export default reducer;
