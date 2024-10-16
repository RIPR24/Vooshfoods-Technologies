import { useContext, useEffect, useMemo, useState } from "react";
import { VooshContext } from "../context/VooshContext";
import { useNavigate } from "react-router-dom";
import Filtercon from "./Filtercon";
import Column from "./Column";
import Taskmng from "./Taskmng";
import Description from "./Description";

export type card = {
  _id: string;
  title: string;
  description: string;
  type: number;
  created: string;
  due?: string;
  userid: string;
};

const Tasks = () => {
  const { user, apiurl, mngtsk, setMngtsk, despop } = useContext(VooshContext);
  const [tasks, setTasks] = useState<card[] | null>([]);
  const [filteredtasks, setFilteredtasks] = useState<card[] | null>([]);

  const todo: card[] | void = useMemo(() => {
    return filteredtasks?.filter((el) => el.type === 1);
  }, [filteredtasks]);
  const prog: card[] | void = useMemo(() => {
    return filteredtasks?.filter((el) => el.type === 2);
  }, [filteredtasks]);
  const done: card[] | void = useMemo(() => {
    return filteredtasks?.filter((el) => el.type === 3);
  }, [filteredtasks]);

  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const res = await fetch(apiurl + "/card/get", {
        headers: {
          token: user?.token || "",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        setFilteredtasks(data.cards);
        setTasks(data.cards);
      } else if (data.status === "unauthorised access") {
        alert(data.status);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.token) {
      getTasks();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="main-con">
      <button
        onClick={() => {
          if (setMngtsk) {
            setMngtsk({ stat: true, obj: null });
          }
        }}
        className="add-btn"
      >
        Add Task
      </button>
      <Filtercon setFilteredtasks={setFilteredtasks} tasks={tasks} />
      <div className="col-con">
        <Column
          arr={todo}
          setTasks={setTasks}
          setFilteredtasks={setFilteredtasks}
          type={1}
        />
        <Column
          arr={prog}
          setTasks={setTasks}
          setFilteredtasks={setFilteredtasks}
          type={2}
        />
        <Column
          arr={done}
          setTasks={setTasks}
          setFilteredtasks={setFilteredtasks}
          type={3}
        />
      </div>
      {mngtsk.stat && (
        <Taskmng setFilteredtasks={setFilteredtasks} setTasks={setTasks} />
      )}
      {despop.stat && <Description />}
    </div>
  );
};

export default Tasks;
