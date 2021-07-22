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
      role: 'admin'
    },
    {
      id: 'RNIcXqsYBxH139puqOHae4n5CRgWMAdP',
      email: 'hhuynh88@dxc.com',
      password: '123456',
      firstName: 'Hằng',
      lastName: 'Huỳnh',
      role: 'user'
    }
  ],
  reducers: {
    
  }
});

const { reducer } = user;

export default reducer;
