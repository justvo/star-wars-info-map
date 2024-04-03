import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../../fetchFunctions/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader";
import ImageSlider from "../Slider/Slider";
import { setResidents } from "../../services/reducers/residentsSlice";
import { setFilms } from "../../services/reducers/filmsSlice";
import "./style/style.css";

const FilmItem = () => {
  const [film, setFilm] = useState(null);
  const [isPageLoaled, setIsPageLoaded] = useState(false);
  const persons = useSelector((state) => state.residents.residents);
  const films = useSelector((state) => state.films.films);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const filmId = id;

    fetchData(
      dispatch,
      films,
      filmId,
      "films",
      "filmsPersons",
      persons,
      setResidents,
      setFilms,
      setFilm,
      setIsPageLoaded
    ).catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!isPageLoaled) {
    return <Loader />;
  }

  return (
    <div className="item-component">
      <div className="item-main-information">
        <div className="item-img-container">
          <img className="film-img" src={film?.image} alt={film?.title} />
        </div>
        <div className="item-description">
          <div className="item-name">
            <h1>{film?.title}</h1>
          </div>
          <div className="item-info">
            <div>
              <strong>Opening crawl:</strong> {film?.opening_crawl}
            </div>
            <div>
              <strong>Director:</strong> {film?.director}
            </div>
            <div>
              <strong>Producer:</strong> {film?.producer}
            </div>
            <div>
              <strong>Release date:</strong> {film?.release_date}
            </div>
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
            navigate("/");
          }}
        >
          To planets map
        </button>
      </div>

      <div className="slider">
        <strong>Characters who met in the film </strong>
        {film?.filmsPersons[0] ? (
          <ImageSlider slides={film?.filmsPersons} imageType={"person"} />
        ) : (
          <div className="text-have-not-information">
            Unfortunately, we have no information about this
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmItem;
