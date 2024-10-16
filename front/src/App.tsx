import { Outlet } from "react-router-dom";
import Nav from "./Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="85449916853-ilvmr3fr74rmit72esdsbvoptgvbr1m3.apps.googleusercontent.com">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Nav />
        <Outlet />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
