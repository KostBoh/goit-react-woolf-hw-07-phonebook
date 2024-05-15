import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get(
      'https://6644d761b8925626f8902dcf.mockapi.io/contacts'
    );
    return response.data;
  }
);

export const addContacts = createAsyncThunk(
  'contacts/addContacts',
  async contactData => {
    const response = await axios.post(
      'https://6644d761b8925626f8902dcf.mockapi.io/contacts',
      contactData
    );
    return response.data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContacts',
  async contactId => {
    await axios.delete(
      `https://6644d761b8925626f8902dcf.mockapi.io/contacts/${contactId}`
    );
    return contactId;
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContacts.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data = state.data.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export const { setFilter } = contactSlice.actions;
export default contactSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: { data: [], filter: '' },
//   reducers: {
//     addContact: (state, action) => {
//       state.data = [...state.data, action.payload];
//     },
//     deleteContact: (state, action) => {
//       state.data = state.data.filter(contact => contact.id !== action.payload);
//     },
//     setFilter: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
// });

// export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
// export default contactsSlice.reducer;
