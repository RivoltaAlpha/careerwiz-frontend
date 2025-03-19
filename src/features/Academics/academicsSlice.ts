import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Academics } from "../../types/types";

export interface AcademicsState {
  selectedAcademic: Academics | null;
  academic: Academics | null;
}

const initialState: AcademicsState = {
  selectedAcademic: JSON.parse(localStorage.getItem("selectedAcademic") || "null"),
  academic: JSON.parse(localStorage.getItem("academic") || "null"),
};

const academicsSlice = createSlice({
  name: "academic",
  initialState,
  reducers: {
    setSelectedAcademic: (state, action: PayloadAction<Academics | null>) => {
      state.selectedAcademic = action.payload;
      localStorage.setItem("selectedAcademic", JSON.stringify(action.payload));
    },
    updateSelectedAcademic: (state, action: PayloadAction<Academics>) => {
      state.selectedAcademic = action.payload;
      localStorage.setItem("selectedAcademic", JSON.stringify(action.payload));
    },
    clearSelectedAcademic: (state) => {
      state.selectedAcademic = null;
      localStorage.removeItem("selectedAcademic");
    },
  },
});

export const { setSelectedAcademic, updateSelectedAcademic, clearSelectedAcademic } =
  academicsSlice.actions;

export default academicsSlice.reducer;