import PlanetItem from "../../components/PlanetItem";
import { useState } from "react";
import ModalWin from "../../components/ModalWin";

const AboutPlanet = () => {
  const storedValue = localStorage.getItem("isShowedItemMessage");
  const initialValue = storedValue ? JSON.parse(storedValue) : true;
  const [isShowed, setIsShowed] = useState(initialValue);
  const message =
    "You can also check out this page, as well as other addictions of characters and movies. Don't forget, if you have any questions, don't hesitate to ask our AI assistant";
  const onClose = () => {
    setIsShowed(false);
    localStorage.setItem("isShowedItemMessage", false);
  };
  return (
    <div>
      <ModalWin isShowed={isShowed} message={message} onClose={onClose} />
      <PlanetItem />
    </div>
  );
};

export default AboutPlanet;
