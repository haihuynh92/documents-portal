const { createSlice } = require("@reduxjs/toolkit");

const loadingControl = createSlice({
  name: 'loadingControl',
  initialState: false,
  reducers: {
    showLoading: (state) => {
      return state = true;
    },
    hideLoading: (state) => {
      return state = false;
    }
  }
});

const { reducer, actions } = loadingControl;

export const { showLoading, hideLoading } = actions;

export default reducer;
