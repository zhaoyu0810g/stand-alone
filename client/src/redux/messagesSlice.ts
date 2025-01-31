import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    }
  },
});

export const { updateMessages, clearMessages } = messagesSlice.actions
