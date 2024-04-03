import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  films: [],
  film: null,
};

const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setFilms: (state, action) => {
      const incomingFilms = action.payload;

      incomingFilms.forEach((incomingFilm) => {
        if (!state.films.find((film) => film.id == incomingFilm.id)) {
          state.films.push(incomingFilm);
        }
      });

      state.films = state.films.map((film) => {
        const incomingFilm = incomingFilms.find((f) => f.id == film.id);
        if (incomingFilm) {
          return { ...film, ...incomingFilm };
        } else {
          return film;
        }
      });
    }
  },
});

export const { setFilms } = filmsSlice.actions;
export default filmsSlice.reducer;
