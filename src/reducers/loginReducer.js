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
    },
    {
      id: 'Rq0qhIXFCemZ3QiqvK7wgm4Z7SLairje',
      email: 'phuonganhtran3292@dxc.com',
      password: '123456',
      firstName: 'Anh',
      lastName: 'Trần',
    }
  ],
  reducers: {
    
  }
});

const { reducer } = user;

export default reducer;
