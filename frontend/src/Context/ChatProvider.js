import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState(" ");
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const history = useHistory();

  const login = (userInfo) => {
    setUser(userInfo);
    if (!userInfo) {
      history.push("/");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      setUser(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        login,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
