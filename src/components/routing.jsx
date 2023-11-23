import Nav from "./nav";
import Home from "./home";
import HallCreate from "./createHall";
import Book from "./bookHall";
import { Routes, Route } from "react-router-dom";

function Routing() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/hall" exact element={<HallCreate />} />
        <Route path="/book" exact element={<Book />} />
      </Routes>
    </>
  );
}

export default Routing;
