import type { Admin } from "@/types/auth";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  admin: Admin | null;
};

const initialState: UserState = {
  admin: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
    clearUser: (state) => {
      state.admin = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
