import { useSelector, useDispatch } from "react-redux";
import { setPlanets } from "../../services/reducers/planetsSlice";
import { setResidents } from "../../services/reducers/residentsSlice";
import { fetchDataPlanet } from "../../fetchFunctions/fetchDataPlanet";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemInformation from '../ItemInformation'
import ImageSlider from "../Slider/Slider";
import "./style/style.css";
import Loader from "../Loader";

const PlanetItem = () => {
  const [planet, setPlanet] = useState(null);
  const [isPageLoaled, setIsPageLoaded] = useState(false);
  const planets = useSelector((state) => state.planets.planets);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const planetId = id;

    fetchDataPlanet(
      planets,
      planetId,
      dispatch,
      setPlanets,
      setPlanet,
      setIsPageLoaded,
      setResidents
    ).catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!isPageLoaled) {
    return <Loader />;
  }

  return (
    <div className="item-component">
      <ItemInformation
        image={planet.image}
        name={planet.name}
        description={
          planet.name !== "unknown" ? (
            <>
              <div>Rotation period: {planet.rotation_period}</div>
              <div>Orbital period: {planet.orbital_period}</div>
              <div>Diameter: {planet.diameter}</div>
              <div>Climate: {planet.climate}</div>
              <div>Gravity: {planet.gravity}</div>
              <div>Terrain: {planet.terrain}</div>
              <div>Surface water: {planet.surface_water}</div>
              <div>Population: {planet.population}</div>
            </>
          ) : (
            <div>
              This planet is a generalization for all planets from the infinite
              universe about which nothing is known, it includes all characters
              whose homeland is unknown
            </div>
          )
        }
        imageClass={'planet-image'}
      />

      <button
        className="navigate-buttons"
        onClick={() => {
          navigate(`/`);
        }}
      >
        Space Map
      </button>

      <div className="sliders">
        <div className="resident-slider">
          <h2>Residents of planet:</h2>
          {planet.planetsResidents[0] ? (
            <ImageSlider
              slides={planet.planetsResidents}
              imageType={"person"}
            />
          ) : (
            <div className="text-have-not-information">
              Unfortunately, we have no information about this
            </div>
          )}
        </div>
        <div className="films-slider">
          <h2>Films in which the planet was shown</h2>
          {planet.planetsFilms[0] ? (
            <ImageSlider slides={planet.planetsFilms} imageType={"film"} />
          ) : (
            <div className="text-have-not-information">
              Unfortunately, we have no information about this
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetItem;
