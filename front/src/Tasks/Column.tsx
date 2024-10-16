import { useContext } from "react";
import { card } from ".";
import Card from "./Card";
import { VooshContext } from "../context/VooshContext";
import { useNavigate } from "react-router-dom";

type props = {
  setTasks: React.Dispatch<React.SetStateAction<card[] | null>> | null;
  setFilteredtasks: React.Dispatch<React.SetStateAction<card[] | null>> | null;
  arr: card[] | void;
  type: number;
};

const Column = (props: props) => {
  const { apiurl, user } = useContext(VooshContext);
  const navigate = useNavigate();

  let str = "";
  if (props.type === 1) {
    str = "TODO";
  } else if (props.type === 2) {
    str = "IN PROGRESS";
  } else if (props.type === 3) {
    str = "DONE";
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, el: card) => {
    e.dataTransfer.setData("cid", el._id);
    e.dataTransfer.setData("ctype", el.type.toString());
  };

  const handleDrop = async (e: React.DragEvent, type: number) => {
    e.preventDefault();
    const cid = e.dataTransfer.getData("cid");
    const ctype = Number(e.dataTransfer.getData("ctype"));
    if (ctype !== type) {
      try {
        const res = await fetch(apiurl + "/card/modify", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            token: user?.token || "",
          },
          body: JSON.stringify({
            _id: cid,
            type,
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          if (props.setTasks && props.setFilteredtasks) {
            props.setTasks(data.cards);
            props.setFilteredtasks(data.cards);
          }
        } else if (data.status === "unauthorised access") {
          alert(data.status);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
    const high = document.querySelectorAll(".highlight");
    high.forEach((el) => {
      el.classList.remove("highlight");
    });
  };

  return (
    <div style={{ padding: 10 }}>
      <h2 id={str} className="headers">
        {str}
      </h2>
      <div
        style={{
          padding: 10,
          overflowY: "auto",
          height: "100%",
          transition: ".2s",
          backgroundColor: "white",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("highlight");
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove("highlight");
        }}
        onDrop={(e) => {
          handleDrop(e, props.type);
        }}
      >
        {props.arr?.map((el) => {
          return (
            <div
              key={el._id}
              data-id
              draggable={true}
              onDragStart={(e) => {
                handleDragStart(e, el);
              }}
            >
              <Card
                setFilteredtasks={props.setFilteredtasks}
                setTasks={props.setTasks}
                obj={el}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Column;
