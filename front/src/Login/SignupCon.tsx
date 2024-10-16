import { useContext, useState } from "react";
import { VooshContext } from "../context/VooshContext";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

type info = {
  fname: string;
  lname: string;
  email: string;
  pass: string;
  cpass: string;
};

const SignupCon = () => {
  const navigate = useNavigate();
  const { apiurl } = useContext(VooshContext);
  const [disable, setDisable] = useState(false);
  const [prob, setProb] = useState("");
  const [info, setInfo] = useState<info>({
    fname: "",
    lname: "",
    email: "",
    pass: "",
    cpass: "",
  });

  const responseGoogle = async (authRes: any) => {
    try {
      if (authRes.code) {
        setDisable(true);
        const res = await fetch(apiurl + "/user/gsignup", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            code: authRes.code,
          }),
        });
        const data = await res.json();
        setDisable(false);
        if (data.status === "success") {
          navigate("/login");
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

  const signup = async () => {
    const name = info.fname + " " + info.lname;
    const reg =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (name.length > 1) {
      if (reg.test(info.email)) {
        //email Validation
        if (info.pass === info.cpass) {
          setDisable(true);
          const res = await fetch(apiurl + "/user/signup", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              name,
              email: info.email,
              password: info.pass,
              avatar: "",
            }),
          });
          const data = await res.json();
          setDisable(false);
          if (data.status === "success") {
            navigate("/login");
          } else {
            setProb(data.status);
          }
        } else {
          setProb("Password did not match");
        }
      } else {
        setProb("Enter Valid email");
      }
    } else {
      setProb("Enter valid name");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInfo({ ...info, [e.target.id]: val });
  };

  return (
    <div className="con">
      <p>Signup</p>
      <div className="logcon">
        <input
          type="text"
          placeholder="First name"
          value={info.fname}
          name="fname"
          onChange={handleChange}
          id="fname"
        />
        <input
          type="text"
          placeholder="Last name"
          name="lname"
          value={info.lname}
          onChange={handleChange}
          id="lname"
        />
        <input
          type="email"
          placeholder="Email"
          value={info.email}
          name="email"
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          placeholder="Password"
          name="pass"
          id="pass"
          onChange={handleChange}
          value={info.pass}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          name="cpass"
          id="cpass"
          onChange={handleChange}
          value={info.cpass}
        />
        <p style={{ color: "red" }}>{prob}</p>
        <button
          disabled={disable}
          className={disable ? "disb" : ""}
          onClick={signup}
        >
          Signup
        </button>
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/login");
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
          Signup with Google
        </button>
      </div>
    </div>
  );
};

export default SignupCon;
