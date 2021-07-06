import { toastInfo } from "actions/notification";
import { findIndex } from "lodash";

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
      toastInfo('Thêm dữ liệu thành công!')
      state.data.push(action.payload);
    },
    capNhatCS: (state, action) => {
      toastInfo('Cập nhật dữ liệu thành công!')
      var index = findIndex(state.data, x => x.id === action.payload.id);
      state.data[index] = action.payload;
    },
    xoaCS: (state, action) => {
      toastInfo('Xóa thành công!');
      var index = findIndex(state.data, x => x.id === action.payload);
      state.data.splice(index, 1);
    }
  }
});

const { reducer, actions } = cosomay;

export const { DSCoSoMay, themCS, capNhatCS, xoaCS } = actions;

export default reducer;
