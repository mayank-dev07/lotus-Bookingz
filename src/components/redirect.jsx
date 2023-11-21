import { useNavigate } from "react-router-dom";
export default function Back() {
  const navigate = useNavigate();
  navigate("/");
}

// export default Back;
