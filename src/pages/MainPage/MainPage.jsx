import ModalWin from "../../components/ModalWin";
import StarMap from "../../components/starMap/starMap";
import { useState } from "react";

const MainPage = () => {
  const storedValue = localStorage.getItem("isShowedPlanetsMessage");
  const initialValue = storedValue ? JSON.parse(storedValue) : true;
  const [isShowed, setIsShowed] = useState(initialValue);

  const onClose = () => {
    setIsShowed(false);
    localStorage.setItem("isShowedPlanetsMessage", false);
  };
  const message =
    "It is an information site about the relationship between planets, movies, and characters in the Star Wars universe. You now see a list of planets for which information is available (60). To learn more about a planet, click on it.";

  return (
    <div>
      <ModalWin isShowed={isShowed} message={message} onClose={onClose} />
      <StarMap />
    </div>
  );
};
export default MainPage;
