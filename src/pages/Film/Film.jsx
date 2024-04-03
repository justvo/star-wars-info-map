import FilmItem from "../../components/FilmItem";
import ModalWin from "../../components/ModalWin";
import { useState } from "react";

const Film = () => {
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
      <FilmItem />
    </div>
  );
};

export default Film;
