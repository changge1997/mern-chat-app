import "./App.css";
import HomePage from "./Pages/HomePage";
import { Route } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={HomePage}></Route>
      <Route path="/chats" component={ChatPage}></Route>
    </div>
  );
}

export default App;
