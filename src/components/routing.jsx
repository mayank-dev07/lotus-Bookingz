import Nav from "./nav";
import Home from "./home";
import HallCreate from "./createHall";
import HallStatus from "./hallstatus";
import BookForm from "./bookform";
import { Routes, Route } from "react-router-dom";

function Routing() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/hall" exact element={<HallCreate />} />
        <Route path="/status" exact element={<HallStatus />} />
        <Route path="/book" exact element={<BookForm />} />
      </Routes>
    </>
  );
}

export default Routing;
