import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "country",
  initialState: {
    countryList: [],
    isDark: false,
  },
  reducers: {
    fetchCountry: (state, action) => {
      state.countryList = action.payload;
    },
    setTheme: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { fetchCountry, setTheme } = countrySlice.actions;

export default countrySlice.reducer;
