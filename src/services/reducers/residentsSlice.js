import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  residents: [],
};

const residentsSlice = createSlice({
  name: "residents",
  initialState,
  reducers: {
    setResidents: (state, action) => {
      const incomingResidents = action.payload;

      incomingResidents.forEach((incomingResident) => {
        if (!state.residents.find((resident) => resident.id == incomingResident.id)) {
          state.residents.push(incomingResident);
        }
      });

      state.residents = state.residents.map((resident) => {
        const incomingResident = incomingResidents.find((r) => r.id == resident.id);
        if (incomingResident) {
          return { ...resident, ...incomingResident };
        } else {
          return resident;
        }
      });
    },
  },
});

export const { setResidents } = residentsSlice.actions;
export default residentsSlice.reducer;
