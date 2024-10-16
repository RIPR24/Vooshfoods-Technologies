import { useContext } from "react";
import { VooshContext } from "../context/VooshContext";

const Description = () => {
  const { despop, setDespop } = useContext(VooshContext);
  const { obj } = despop;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      <div
        className="back"
        onClick={() => {
          if (setDespop) {
            setDespop({ stat: false, obj: null });
          }
        }}
      ></div>
      <div className="tsk-con">
        <h3 style={{ fontSize: "1.5rem" }}>Title :</h3>
        <p>{obj?.title}</p>
        <h3 style={{ fontSize: "1.5rem" }}>Description :</h3>
        <p>{obj?.description}</p>
        <p>{"Created on: " + obj?.created}</p>
        <p>{`Due date: ${obj?.due || ""}`}</p>
        <div style={{ display: "flex", gap: 20, justifyContent: "flex-end" }}>
          <button
            onClick={() => {
              if (setDespop) {
                setDespop({ stat: false, obj: null });
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;
