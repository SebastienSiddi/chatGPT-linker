import React, { useEffect, useState } from "react";
import Style from "./chat.module.css";
import { FaTimes } from "react-icons/fa";
const { Configuration, OpenAIApi } = require("openai");

const Chat = ({ setOpenChat, name1Value, name2Value, promptValue }) => {
  const [prompt, setPrompt] = useState(
    `tu t'appelles ${name1Value}, et tu discutes avec ${name2Value}, tu lui pose une question à ce sujet ${promptValue}`
  );
  const [responseChat1, setResponseChat1] = useState([]);
  const [responseChat2, setResponseChat2] = useState([]);
  const [responses, setResponses] = useState([]);

  const configurationChat1 = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY_1,
  });
  delete configurationChat1.baseOptions.headers["User-Agent"];

  const configurationChat2 = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY_2,
  });
  delete configurationChat2.baseOptions.headers["User-Agent"];

  const openaiChat1 = new OpenAIApi(configurationChat1);
  const openaiChat2 = new OpenAIApi(configurationChat2);

  useEffect(() => {
    async function generateResponse() {
      try {
        if (responseChat1.length === 0) {
          const completionChat1 = await openaiChat1.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.5,
            n: 1,
          });
          const data = completionChat1.data.choices[0].message.content;
          setResponseChat1((prevResponses) => [...prevResponses, data]);
          setResponses((prevResponses) => [...prevResponses, data]);
        } else {
          const completionChat1 = await openaiChat1.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: responseChat2[responseChat2.length - 1],
              },
            ],
            temperature: 0.5,
            n: 1,
          });
          const data = completionChat1.data.choices[0].message.content;
          setResponseChat1((prevResponses) => [...prevResponses, data]);
          setResponses((prevResponses) => [...prevResponses, data]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    generateResponse();
  }, [responseChat2]);

  useEffect(() => {
    async function generateResponse() {
      try {
        if (responseChat1.length > 0) {
          const completionChat2 = await openaiChat2.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: responseChat1[responseChat1.length - 1],
              },
            ],
            temperature: 0.5,
            n: 1,
          });
          const data = completionChat2.data.choices[0].message.content;
          setResponseChat2((prevResponses) => [...prevResponses, data]);
          setResponses((prevResponses) => [...prevResponses, data]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    generateResponse();
  }, [responseChat1]);

  function closeChatWindows() {
    setOpenChat(false);
  }

  useEffect(() => {
    console.log(responseChat1);
  }, [responseChat1]);

  useEffect(() => {
    console.log(responseChat2);
  }, [responseChat2]);

  return (
    <div className={Style.container}>
      <div className={Style.button_container}>
        <FaTimes className={Style.button} onClick={closeChatWindows} />
      </div>
      <div className={Style.chat_container}>
        <div className={Style.chat_box}>
          {responses.map((message, index) => (
            <div
              key={index}
              className={
                index % 2 === 0 ? Style.character1_msg : Style.character2_msg
              }
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
