import { createSlice } from '@reduxjs/toolkit';
import { addContacts, deleteContact, fetchContacts } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContacts.pending, handlePending)
      .addCase(addContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data.push(action.payload);
      })
      .addCase(addContacts.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data = state.data.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const { setFilter } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;

// import axios from 'axios';

// export const fetchContacts = createAsyncThunk(
//   'contacts/fetchContacts',
//   async () => {
//     const response = await axios.get(
//       'https://6644d761b8925626f8902dcf.mockapi.io/contacts'
//     );
//     return response.data;
//   }
// );

// export const addContacts = createAsyncThunk(
//   'contacts/addContacts',
//   async contactData => {
//     const response = await axios.post(
//       'https://6644d761b8925626f8902dcf.mockapi.io/contacts',
//       contactData
//     );
//     return response.data;
//   }
// );

// export const deleteContact = createAsyncThunk(
//   'contacts/deleteContacts',
//   async contactId => {
//     await axios.delete(
//       `https://6644d761b8925626f8902dcf.mockapi.io/contacts/${contactId}`
//     );
//     return contactId;
//   }
// );

//
//
//

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
