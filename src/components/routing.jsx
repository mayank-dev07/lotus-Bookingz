import Nav from "./nav";
import Home from "./home";
import HallCreate from "./createHall";
import HallStatus from "./hallstatus";
import BookForm from "./bookform";
import HodStatus from "./hodstatus";
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
        <Route path="/hodstatus" exact element={<HodStatus />} />
      </Routes>
    </>
  );
}

export default Routing;
