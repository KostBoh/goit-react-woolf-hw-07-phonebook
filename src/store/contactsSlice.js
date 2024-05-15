import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { data: [], filter: '' },
  reducers: {
    addContact: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    deleteContact: (state, action) => {
      state.data = state.data.filter(contact => contact.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
