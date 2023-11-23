import "./App.css";
import Routing from "./components/routing";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/*" element={<Routing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
