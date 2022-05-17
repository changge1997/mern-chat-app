import "./App.css";
import HomePage from "./Pages/HomePage";
import { Route, Switch } from "react-router-dom";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/chats" component={ChatPage} />
      </Switch>
    </div>
  );
}

export default App;
