import { createSlice } from "@reduxjs/toolkit";

const gradeSlice = createSlice({
  name: "grade",
  initialState: {
    sports: null,
    events: null,
    loading: "ids",
    error: null,
  },
  reducers: {
    setSports(state, action) {
      state.sports = action.payload;
      state.loading = "loaded";
      state.error = null;
    },

    setEvents(state, action) {
      state.events = action.payload;
      state.loading = "loaded";
      state.error = null;
    },
    resetLoading(state) {
      state.loading = "idle";
      state.error = null;
    },
    onError(state, action) {
      state.loading = "error";
      state.error = action.payload;
    },
  },
});

export const { setSports, setEvents, resetLoading, onError } =
  gradeSlice.actions;

export default gradeSlice.reducer;
