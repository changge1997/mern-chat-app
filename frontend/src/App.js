import "./App.css";
import HomePage from "./Pages/HomePage";
import { Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <ChatProvider>
            <Route exact path="/" component={HomePage} />
            <Route path="/chats" component={ChatPage} />
          </ChatProvider>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
