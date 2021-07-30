import { toastInfo } from "actions/notification";

const { createSlice } = require("@reduxjs/toolkit");

const chamcong = createSlice({
  name: 'chamcong',
  initialState: {
    data: []
  },
  reducers: {
    DSCC: (state, action) => {
      state.data = action.payload;
    },
    themCC: (state, action) => {
      toastInfo('Thêm dữ liệu thành công!');
      return;
    },
    xoaCC: (state, action) => {
      toastInfo('Xóa thành công!');
      return;
    },
    capNhatCC: (state, action) => {
      toastInfo('Cập nhật thành công!');
      return;
    }
  }
});

const { reducer, actions } = chamcong;

export const { DSCC, themCC, xoaCC, capNhatCC } = actions;

export default reducer;
