import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_LIMIT } from "./helper";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVE_CHAT_LIMIT, 1); // this line is very important....if we comment it...after a certain point of time when the browser page cache limit is reached..the page will start to slow down and will ultimately freeze and result in a bad UX
      // to avoid bad UX, we will be deleting the oldest message as soon as 11th message is added to the UI
      // .splice(10, 1) means at index 10 remove one message...since we are adding new elements at the beginning of the array..removing elements from the back is the right choice
      // Now, one more optmization we can do is, have this limit stored inside a contant and configure is dynamically based on browser parameters

      state.messages.unshift(action.payload); // adding new messages at the front instead of the back since we want to move older messages to the top
    },
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;
