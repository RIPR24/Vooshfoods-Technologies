import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { VooshContext } from "../context/VooshContext";

const Login = () => {
  const { user } = useContext(VooshContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
      <Outlet />
    </div>
  );
};

export default Login;
