import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./component/Home";
import Create from "./component/Create";

function App() {
  return (
    <div className="App">
      <h2></h2>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/create" exact element={<Create/>} />

      </Routes>
    </div>
  );
}

export default App;
