import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Order from "./pages/Order";
import Sub from "./pages/Sub";
import Status from "./pages/Status";
import Settings from "./components/control/Settings";
function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/plan" Component={Plans} />
          <Route path="/order" Component={Order} />
          <Route path="/status" Component={Status} />
          <Route path="/sub" element={<Sub />}>
            <Route path="settings" Component={Settings} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
