import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import DashBoard from "./page/DashBoard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/dashboard" Component={DashBoard} />
      </Routes>
    </div>
  );
}

export default App;
