import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: undefined,
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
    setUserData: (state, action) => {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastname: action.payload.lastname,
      };
    },
    updateUserData: (state, action) => {
      state.user = {
        firstName: action.payload.firstName,
        lastname: action.payload.lastname,
      };
    },
  },
});

export const { setToken, removeToken, setUserData, updateUserData } =
  userSlice.actions;

export default userSlice.reducer;
