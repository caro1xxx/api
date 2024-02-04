import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </div>
  );
}

export default App;
