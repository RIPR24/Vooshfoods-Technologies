import { useContext, useState } from "react";
import { VooshContext } from "../context/VooshContext";
import { card } from ".";
import { useNavigate } from "react-router-dom";

type props = {
  setTasks: React.Dispatch<React.SetStateAction<card[] | null>> | null;
  setFilteredtasks: React.Dispatch<React.SetStateAction<card[] | null>> | null;
};

const Taskmng = ({ setFilteredtasks, setTasks }: props) => {
  const { mngtsk, setMngtsk, apiurl, user } = useContext(VooshContext);
  const [title, setTitle] = useState<string>(mngtsk.obj?.title || "");
  const navigate = useNavigate();
  const [due, setDue] = useState<string>(mngtsk.obj?.due || "");
  const [description, setDescription] = useState<string>(
    mngtsk.obj?.description || ""
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const val = e.target.value;

    if (e.target.id === "txtar-tit") {
      setTitle(val);
    } else if (e.target.id === "txtar-des") {
      setDescription(val);
    } else {
      setDue(val);
    }
  };

  const modifyCard = async () => {
    if (title.length > 0 && description.length > 0) {
      try {
        const res = await fetch(apiurl + "/card/modify", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            token: user?.token || "",
          },
          body: JSON.stringify({
            _id: mngtsk.obj?._id,
            title,
            description,
            due,
            userid: user?._id,
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          if (setTasks && setFilteredtasks && setMngtsk) {
            setTasks(data.cards);
            setFilteredtasks(data.cards);
            setMngtsk({ stat: false, obj: null });
          }
        } else if (data.status === "unauthorised access") {
          alert(data.status);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addCard = async () => {
    if (title.length > 0 && description.length > 0) {
      try {
        const res = await fetch(apiurl + "/card/add", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            token: user?.token || "",
          },
          body: JSON.stringify({
            title,
            description,
            due,
            type: 1,
            userid: user?._id,
          }),
        });
        const data = await res.json();
        if (data.status === "success") {
          if (setTasks && setFilteredtasks && setMngtsk) {
            setTasks(data.cards);
            setFilteredtasks(data.cards);
            setMngtsk({ stat: false, obj: null });
          }
        } else if (data.status === "unauthorised access") {
          alert(data.status);
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
          if (setMngtsk) {
            setMngtsk({ stat: false, obj: null });
          }
        }}
      ></div>
      <div className="tsk-con">
        <h3 style={{ fontSize: "1.5rem" }}>Title :</h3>
        <textarea
          style={{ height: 70 }}
          id="txtar-tit"
          value={title}
          onChange={handleChange}
        ></textarea>
        <h3 style={{ fontSize: "1.5rem" }}>Description :</h3>
        <textarea
          style={{ height: 140 }}
          id="txtar-des"
          value={description}
          onChange={handleChange}
        ></textarea>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          <h3>Due date:</h3>
          <input
            type="date"
            name="deu"
            id="deu"
            value={due}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: 20, justifyContent: "flex-end" }}>
          {mngtsk.obj ? (
            <button onClick={modifyCard}>Modify</button>
          ) : (
            <button onClick={addCard}>Add</button>
          )}
          <button
            onClick={() => {
              if (setMngtsk) {
                setMngtsk({ stat: false, obj: null });
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

export default Taskmng;
