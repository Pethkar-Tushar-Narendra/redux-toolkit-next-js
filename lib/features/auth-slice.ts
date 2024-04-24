import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  key: string;
  // topics: {}[];
};

const initialState = {
  value: {
    key: "value",
    topics: [],
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    action1: () => {
      return initialState;
    },
    action2: (state, action: PayloadAction<string>) => {
      return {
        value: {
          key: action.payload,
        },
      };
    },
    // updateList: (state, action: PayloadAction<string>) => {
    //   return {
    //     value: {
    //       key: action.payload,
    //     },
    //   };
    // },
  },
});

export const { action1, action2 } = auth.actions;
export default auth.reducer;
