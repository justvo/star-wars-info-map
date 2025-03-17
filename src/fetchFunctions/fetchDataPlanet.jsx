import { mainFetch } from "./mainFetch";
export const fetchDataPlanet = async (
  planets,
  planetId,
  dispatch,
  setPlanets,
  setPlanet,
  setIsPageLoaded,
  setResidents,

) => {
  let currPlanet = planets.find((planet) => planet.id == planetId);
  if (!currPlanet) {
    currPlanet = await mainFetch(
      `https://swapi.dev/api/planets/${planetId}`,
      dispatch,
      "planets"
    );
  }


  if (currPlanet && !currPlanet.planetsFilms) {
    const residentsPromise = Promise.all(
      currPlanet.residents.map((url) => mainFetch(url, dispatch, "residents"))
    );

    const filmsPromise = Promise.all(
      currPlanet.films.map((url) => mainFetch(url, dispatch, "films"))
    );

    try {
      const [residentsData, filmsData] = await Promise.allSettled([
        residentsPromise,
        filmsPromise,
      ]);

      if (residentsData.status === "fulfilled") {
        currPlanet = {
          ...currPlanet,
          planetsResidents: residentsData.value,
        };
        dispatch(setResidents(residentsData.value));
      }

      if (filmsData.status === "fulfilled") {
        currPlanet = {
          ...currPlanet,
          planetsFilms: filmsData.value,
        };
      }

      dispatch(setPlanets([currPlanet]));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  setPlanet(currPlanet);
  setIsPageLoaded(true);
};
