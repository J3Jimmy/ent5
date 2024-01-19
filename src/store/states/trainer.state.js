import { createSlice } from "@reduxjs/toolkit";

const trainerSlice = createSlice({
  name: 'trainer',
  initialState: '',
  reducers: {
    setTrainerG: (state, action) => [...state, action.payload],
  }
})

export const { setTrainerG } = trainerSlice.actions

export default trainerSlice.reducer