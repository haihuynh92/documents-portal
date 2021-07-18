
const { createSlice } = require("@reduxjs/toolkit");

const menu = createSlice({
  name: 'menu',
  initialState: false,
  reducers: {
    controlMenu: (state, action) => {
      return state = action.payload;
    }
  }
});

const { reducer, actions } = menu;

export const { controlMenu } = actions;

export default reducer;
