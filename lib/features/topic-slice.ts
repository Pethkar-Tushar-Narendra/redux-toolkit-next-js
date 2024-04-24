import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState[];
};

type AuthState = {
  _id: string;
  title: string;
  description: string;
};
const initialTopics: AuthState[] = [];

const initialState: InitialState = {
  value: initialTopics,
};

export const topics = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getInitialTopics: () => {
      return initialState;
    },
    setInitialTopics: (state, action) => {
      return { value: action.payload };
    },
  },
});

export const { getInitialTopics, setInitialTopics } = topics.actions;
export default topics.reducer;
