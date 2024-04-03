import "./style.css";
import { useState, useRef } from "react";
import Message from "../Message";
import ResponseLoader from "../ResponseLoader";

const ChatAI = () => {
  const [isShowChat, setIsShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      name: "AI",
      message: "What can I do for you, young adventurer?",
      clasName: "ai-message",
    },
  ]);
  const [isAiGiveresonce, setIsAiGiveresonce] = useState(false);
  const inputTextRef = useRef();

  const askQastion = () => {
    if(inputTextRef.current.value.trim()===''){
      return null;
    }
    setMessages((prev) => {
      return [
        ...prev,
        {
          id: Date.now(),
          name: "Young Jedi",
          message: inputTextRef.current.value,
          clasName: "users-message",
        },
      ];
    });
    setIsAiGiveresonce(true);

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: import.meta.env.VITE_AUTHORIZATION
          
      },
      body: JSON.stringify({
        response_as_dict: true,
        attributes_as_list: false,
        show_original_response: false,
        settings: '{ "openai": "gpt-3.5-turbo-instruct" }',
        temperature: 0,
        max_tokens: 1000,
        providers: "openai",
        text:
          "Answer the following question for me, only in the context of the Star Wars universe. Do not mention anything that has been said before in your answer. Question: " +
          inputTextRef.current.value,
      }),
    };

    fetch("https://api.edenai.run/v2/text/generation", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.openai.generated_text);
        setMessages((prev) => {
          return [
            ...prev,
            {
              id: Date.now(),
              name: "AI",
              message: response.openai.generated_text,
              clasName: "ai-message",
            },
          ];
        });
        setIsAiGiveresonce(false);
      })
      .catch((err) => console.error(err));

    inputTextRef.current.value = "";
  };

  const toggleShowed = () => {
    setIsShowChat(!isShowChat);
  };

  return (
    <div>
      {!isShowChat ? (
        <button className="ai-button" onClick={toggleShowed}>
          AI
        </button>
      ) : (
        <div className="ai-chart">
          <div className="ai-chart-nav">
            <div className="chart-title">AI assistant</div>
            <button className="exit-button" onClick={toggleShowed}>
              X
            </button>
          </div>
          <div className="chart-content">
            {messages.map((message) => {
              return <Message key={message.id} message={message} />;
            })}

            {isAiGiveresonce && <ResponseLoader />}
          </div>
          <div className="input-container">
            <input
              ref={inputTextRef}
              className="chart-input"
              placeholder="Ask questions"
            ></input>

            <button className="input-button" onClick={askQastion}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M10 17l5-5-5-5v10z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatAI;
