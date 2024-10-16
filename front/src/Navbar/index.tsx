import { NavLink, useNavigate } from "react-router-dom";
import notes from "../assets/notes.svg";
import { useContext } from "react";
import { VooshContext } from "../context/VooshContext";
//import pro from "../assets/profile-logo.svg";

const Nav = () => {
  const { user, setUser } = useContext(VooshContext);
  const navigate = useNavigate();

  const logout = () => {
    if (setUser) {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <nav>
      <img src={notes} alt="" />
      {user?.token ? (
        <div>
          {/*user.avatar.length > 0 && <img src={user.avatar} className="avt" />*/}
          <button style={{ backgroundColor: "#ab2f29" }} onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <NavLink to={"./login"}>Login</NavLink>
          <NavLink to={"./signup"}>Signup</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Nav;
