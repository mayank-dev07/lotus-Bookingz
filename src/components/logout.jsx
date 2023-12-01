import { useNavigate } from "react-router-dom";
// import Login from "./login";

export default function Logout() {
  const navigate = useNavigate();
  navigate("/home");
  //   console.log("login again");
}
