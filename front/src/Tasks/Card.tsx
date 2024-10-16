import { useContext, useMemo } from "react";
import { card } from ".";
import { VooshContext } from "../context/VooshContext";
import { useNavigate } from "react-router-dom";

type props = {
  obj: card;
  setTasks: React.Dispatch<React.SetStateAction<card[] | null>> | null;
  setFilteredtasks: React.Dispatch<React.SetStateAction<card[] | null>> | null;
};

const Card = ({ obj, setFilteredtasks, setTasks }: props) => {
  const navigate = useNavigate();
  const { setMngtsk, setDespop, apiurl, user } = useContext(VooshContext);

  //get due date format
  const due: { txt: string; col: string } | void = useMemo(() => {
    const dat = Number(new Date());
    if (obj.due && obj.type < 3) {
      const dif = Number(new Date(obj.due)) - dat;
      let str = "";
      if (dif > 0) {
        let hr = Math.floor(dif / 3600000);
        str = hr + "hrs left";
        if (hr > 24) {
          let days = Math.floor(hr / 24);
          hr = hr % 24;
          str = days + " days and " + hr + " hrs left";
        }
        return { col: "#8c8426", txt: str };
      } else {
        let hr = Math.floor(-dif / 3600000);
        str = hr + "hrs left";
        if (hr > 24) {
          let days = Math.floor(hr / 24);
          hr = hr % 24;
          str = days + " days and " + hr + " hrs past due date";
        }
        return { col: "#c73e26", txt: str };
      }
    }
  }, []);

  //get local string
  const cdat = useMemo(() => {
    const dat = new Date(obj.created);
    return dat.toLocaleString();
  }, []);

  const deleteCard = async () => {
    try {
      const res = await fetch(apiurl + "/card/delete", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          token: user?.token || "",
        },
        body: JSON.stringify({
          _id: obj._id,
        }),
      });
      const data = await res.json();
      if (data.status === "success") {
        if (setTasks && setFilteredtasks) {
          setTasks(data.cards);
          setFilteredtasks(data.cards);
        }
      } else if (data.status === "unauthorised access") {
        alert(data.status);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card">
      <h3>{obj.title}</h3>
      <p style={{ minHeight: 50 }}>{obj.description}</p>
      <p style={{ fontSize: "0.7rem" }}>{"Created at: " + cdat}</p>
      <p style={{ fontSize: "0.7rem", color: due ? due.col : "white" }}>
        {due ? due.txt : ""}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
          padding: 5,
        }}
      >
        <button style={{ backgroundColor: "#b81c14" }} onClick={deleteCard}>
          Delete
        </button>
        <button
          onClick={() => {
            if (setMngtsk) {
              setMngtsk({ stat: true, obj });
            }
          }}
          style={{ backgroundColor: "#3b92d1" }}
        >
          Edit
        </button>
        <button
          style={{ backgroundColor: "#1472b5" }}
          onClick={() => {
            if (setDespop) {
              setDespop({ stat: true, obj });
            }
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
