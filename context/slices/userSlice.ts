// store/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { BACKEND_URL } from "@/utils/constants";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  rewardPoints: number;
  // add other fields as necessary
}

interface UserState {
  userInfo: UserInfo | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  status: "idle",
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (userId: string): Promise<UserInfo> => {
    const response = await fetch(`${BACKEND_URL}/getpromoterinfo/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }
    const data = await response.json();
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserInfo.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.status = "succeeded";
          state.userInfo = action.payload;
        }
      )
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user info";
      });
  },
});

export const { clearUserInfo } = userSlice.actions;
export const getUserInfo = (state: RootState) => state.user.userInfo;
export default userSlice.reducer;
