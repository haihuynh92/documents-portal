const { createSlice } = require("@reduxjs/toolkit");

const user = createSlice({
  name: 'users',
  initialState: [
    {
      id: 'ZNIcXqsYBxH139puqOHae4n5CRgWMAdP',
      email: 'hhuynh30@dxc.com',
      password: 'Hai@jr99',
      firstName: 'Hải',
      lastName: 'Huỳnh',
    }
  ],
  reducers: {
    
  }
});

const { reducer } = user;

export default reducer;
