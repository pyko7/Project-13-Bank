import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  username: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = "";
    },
    updateUserName: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken, removeToken, updateUserName } = userSlice.actions;

export default userSlice.reducer;
