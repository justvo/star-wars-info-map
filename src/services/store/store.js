import { configureStore } from '@reduxjs/toolkit';
import planetsReducer from '../reducers/planetsSlice';
import residentsReducer from '../reducers/residentsSlice';
import filmsReducer from '../reducers/filmsSlice';

const store = configureStore({
  reducer: {
    planets: planetsReducer,
    residents: residentsReducer,
    films: filmsReducer,

  },
});

export default store;
