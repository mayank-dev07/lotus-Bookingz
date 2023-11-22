import "./App.css";
import Nav from "./components/nav";
import Home from "./components/home";
import Login from "./components/login";
import Hall from "./components/createHall";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                <Nav />
                <Home />
              </>
            }
          />
          <Route
            path="/hall"
            element={
              <>
                <Nav />
                <Hall />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
