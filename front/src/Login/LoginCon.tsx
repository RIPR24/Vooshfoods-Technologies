import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VooshContext } from "../context/VooshContext";
import { useGoogleLogin } from "@react-oauth/google";

type info = {
  email: string;
  pass: string;
};

const LoginCon = () => {
  const navigate = useNavigate();
  const { apiurl, setUser } = useContext(VooshContext);
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<info>({
    email: "",
    pass: "",
  });

  const responseGoogle = async (authRes: any) => {
    try {
      if (authRes.code) {
        setDisable(true);
        const res = await fetch(apiurl + "/user/glogin", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            code: authRes.code,
          }),
        });
        const data = await res.json();
        setDisable(false);
        if (data.status === "success") {
          if (setUser) {
            setUser(data.user);
          }
          navigate("/tasks");
        } else {
          setProb(data.status);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const google = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  const login = async () => {
    const reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    //email Validation
    if (reg.test(info.email)) {
      setDisable(true);
      const res = await fetch(apiurl + "/user/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: info.email,
          password: info.pass,
        }),
      });
      const data = await res.json();
      setDisable(false);
      if (data.status === "success") {
        if (setUser) {
          setUser(data.user);
        }
        navigate("/tasks");
      } else {
        setProb(data.status);
      }
    } else {
      setProb("Enter Valid email");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInfo({ ...info, [e.target.id]: val });
  };

  return (
    <div className="con">
      <p>Login</p>
      <div className="logcon">
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="pass"
          id="pass"
        />
        <p style={{ color: "red" }}>{prob}</p>
        <button
          disabled={disable}
          className={disable ? "disb" : ""}
          onClick={login}
        >
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
            style={{ color: "#106fe3", cursor: "pointer" }}
          >
            {" "}
            Signup
          </span>
        </p>
        <button
          disabled={disable}
          className={disable ? "disb" : ""}
          onClick={google}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginCon;
