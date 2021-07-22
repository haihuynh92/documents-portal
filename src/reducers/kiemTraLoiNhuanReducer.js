
const { createSlice } = require("@reduxjs/toolkit");

const kiemtraloinhuan = createSlice({
  name: 'kiemtraloinhuan',
  initialState: {
    dataInMonth: [],
    dataInYear: []
  },
  reducers: {
    DSHangGiaoTrongThang: (state, action) => {
      state.dataInMonth = action.payload;
    },
    DSHangGiaoTrongNam: (state, action) => {
      state.dataInYear = action.payload;
    }
  }
});

const { reducer, actions } = kiemtraloinhuan;

export const { DSHangGiaoTrongThang, DSHangGiaoTrongNam } = actions;

export default reducer;
