import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Career } from "../../types/types";

export interface CareerState {
  selectedCareer: Career | null;
  career: Career | null;
}

const initialState: CareerState = {
  selectedCareer: JSON.parse(localStorage.getItem("selectedCareer") || "null"),
  career: JSON.parse(localStorage.getItem("career") || "null"),
};

const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    setSelectedCareer: (state, action: PayloadAction<Career | null>) => {
      state.selectedCareer = action.payload;
      localStorage.setItem("selectedCareer", JSON.stringify(action.payload));
    },
    updateSelectedCareer: (state, action: PayloadAction<Career>) => {
      state.selectedCareer = action.payload;
      localStorage.setItem("selectedCareer", JSON.stringify(action.payload));
    },
    clearSelectedCareer: (state) => {
      state.selectedCareer = null;
      localStorage.removeItem("selectedCareer");
    },
  },
});

export const { setSelectedCareer, updateSelectedCareer, clearSelectedCareer } =
  careerSlice.actions;

export default careerSlice.reducer;
