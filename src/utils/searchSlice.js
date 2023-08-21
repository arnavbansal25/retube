import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {
    cacheResults: (state, action) => {
      // state = {...state, ...action.payload}
      // the above will not work here, since we are just changing the state which not possible with {...state, ...action.payload} because this does not create a new object but updates the old one. However, object.assign will work since it creates a separate new object. however, we can return a new object like below

      // Object.assign(state, action.payload)
      // the above will work just fine

      return { ...state, ...action.payload };
    },
  },
});

export const { cacheResults } = searchSlice.actions;

export default searchSlice.reducer;
