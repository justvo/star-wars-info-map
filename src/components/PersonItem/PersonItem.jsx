import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setFilms } from "../../services/reducers/filmsSlice";
import { setResidents } from "../../services/reducers/residentsSlice";
import { fetchData } from "../../fetchFunctions/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import ImageSlider from "../Slider/Slider";
import "./style/style.css";

const PersonItem = () => {
  const [person, setPerson] = useState(null);
  const [isPageLoaled, setIsPageLoaded] = useState(false);
  const persons = useSelector((state) => state.residents.residents);
  const films = useSelector((state) => state.films.films);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const personId = id;

    fetchData(
      dispatch,
      persons,
      personId,
      "people",
      "personsFilms",
      films,
      setFilms,
      setResidents,
      setPerson,
      setIsPageLoaded
    ).catch((error) => console.error("Error fetching data:", error));
  }, []);

  function getHomePlanetId() {
    const path = person.homeworld;
    const parts = path.split("/");
    const planetId = Number(parts[parts.length - 1]);
    console.log(planetId);
    return planetId;
  }

  if (!isPageLoaled) {
    return <Loader />;
  }

  return (
      <div className="item-component">
        <div className="item-main-information">
          <div className="item-img-container">
            <img
              className="person-img"
              src={person?.image}
              alt={person?.name}
            />
          </div>
          <div className="item-description">
            <div className="item-name">
              <h1>{person?.name}</h1>
            </div>
            <div className="item-info">
              <div>Height: {person?.height}</div>
              <div>Mass: {person?.mass}</div>
              <div>Hair color: {person?.hair_color}</div>
              <div>Skin color: {person?.skin_color}</div>
              <div>Eye color: {person?.eye_color}</div>
              <div>Birth year: {person?.birth_year}</div>
              <div>Gender: {person?.gender}</div>
            </div>
          </div>
        </div>
        <div className="navigate-buttons">
        <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <button
            onClick={() => {
              navigate(`/about-planet/${getHomePlanetId()}`);
            }}
          >
            To homeworld
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            To planets map
          </button>

        </div>

        <div className="slider">
          {person?.personsFilms ? (
            <ImageSlider slides={person?.personsFilms} imageType={"film"} />
          ) : (
            <div className="text-have-not-information">
              Unfortunately, we have no information about this
            </div>
          )}
        </div>
      </div>
    )
  
};

export default PersonItem;
