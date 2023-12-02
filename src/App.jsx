import "./App.css";
import Routing from "./components/routing";
import Login from "./components/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
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
