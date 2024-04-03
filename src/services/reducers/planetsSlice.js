import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  planets: [],
};

const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    setPlanets: (state, action) => {
      const incomingPlanets = action.payload;

      incomingPlanets.forEach((incomingPlanet) => {
        if (!state.planets.find((planet) => planet.id == incomingPlanet.id)) {
          state.planets.push(incomingPlanet);
        }
      });

      state.planets = state.planets.map((planet) => {
        const incomingPlanet = incomingPlanets.find((p) => p.id == planet.id);
        if (incomingPlanet) {
          return { ...planet, ...incomingPlanet };
        } else {
          return planet;
        }
      });
    },
  },
});

export const { setPlanets } = planetsSlice.actions;
export default planetsSlice.reducer;
