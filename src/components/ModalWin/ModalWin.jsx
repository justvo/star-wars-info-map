import "./style.css";

const ModalWin = ({ message, onClose, isShowed }) => {
  if (!isShowed) {
    return null;
  }

  return (
    <div className="modal-window">
      <div className="modal-window-container">
        <h1 className="modal-window-title">Please pay attention</h1>
        <p className="modal-window-text">{message}</p>
        <button className="modal-window-button" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
};
export default ModalWin;
