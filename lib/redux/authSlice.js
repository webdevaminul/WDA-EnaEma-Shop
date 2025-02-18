import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    LoginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    requestFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    userClearSuccess: (state) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const {
  requestStart,
  LoginSuccess,
  loginFailure,
  requestFailure,
  resetError,
  userClearSuccess,
} = authSlice.actions;

export default authSlice.reducer;
