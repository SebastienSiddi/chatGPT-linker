import React, { useState } from "react";
import Style from "./app.module.css";
import Chat from "./Chat";

function App() {
  const [openChat, setOpenChat] = useState(false);
  const [name1Value, setName1Value] = useState("ChatGTP 1");
  const [name2Value, setName2Value] = useState("ChatGTP 2");
  const [promptValue, setPromptValue] = useState(null);

  function openChatWindow() {
    setOpenChat(true);
  }
  function handleName1Value(e) {
    setName1Value(e.target.value);
  }
  function handleName2Value(e) {
    setName2Value(e.target.value);
  }
  function handlePromptValue(e) {
    setPromptValue(e.target.value);
  }

  return (
    <>
      {!openChat ? (
        <div className={Style.container}>
          <img src="icon-128.png" className={Style.logo} alt="logo" />
          <h1 className={Style.title}>ChatGPT Linker</h1>
          <div className={Style.input_container}>
            <label className={Style.label}>Change first character name :</label>
            <input
              type="text"
              placeholder="ChatGTP1"
              id="character1"
              className={Style.input}
              value={name1Value}
              onChange={handleName1Value}
            />
            <label className={Style.label}>
              Change second character name :
            </label>
            <input
              type="text"
              placeholder="ChatGPT2"
              id="character2"
              className={Style.input}
              value={name2Value}
              onChange={handleName2Value}
            />
            <label className={Style.label}>Enter your prompt :</label>
            <textarea
              id="prompt"
              className={Style.textarea}
              value={promptValue}
              onChange={handlePromptValue}
            />
          </div>
          <button
            id="open-windows"
            className={Style.button}
            onClick={openChatWindow}
          >
            Start Chat
          </button>
        </div>
      ) : (
        <div>
          <Chat
            setOpenChat={setOpenChat}
            name1Value={name1Value}
            name2Value={name2Value}
            promptValue={promptValue}
          />
        </div>
      )}
    </>
  );
}

export default App;
