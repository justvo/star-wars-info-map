import "./style.css";
const Message = ({ message }) => {
  return (
    <div className={`message-container ${message.clasName}`}>
      <div className="message-sender">{message.name}</div>
      <div className="message-text">{message.message}</div>
    </div>
  );
};
export default Message;
