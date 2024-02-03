import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import SubBar from "./components/SubBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <SubBar />
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </div>
  );
}

export default App;
