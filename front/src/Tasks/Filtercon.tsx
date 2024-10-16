import { useState } from "react";
import { card } from ".";

type props = {
  setFilteredtasks: React.Dispatch<React.SetStateAction<card[] | null>> | null;
  tasks: card[] | null;
};

const Filtercon = (props: props) => {
  const [srch, setSrch] = useState<string>("");
  const [srt, setSrt] = useState<string>("none");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSrch(val);
    if (props.tasks) {
      const fil = props.tasks.filter(
        (el) =>
          el.title.toLowerCase().includes(val) ||
          el.description.toLowerCase().includes(val)
      );
      if (props.setFilteredtasks) {
        props.setFilteredtasks(fil);
      }
    }
  };

  const getSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const val = e.target.value;
    setSrt(val);
    if (val === "None") {
      if (props.setFilteredtasks) {
        props.setFilteredtasks(props.tasks);
      }
    } else if (val === "Recent") {
      if (props.tasks) {
        const copy: card[] = [...props.tasks];
        copy.sort((a, b) => {
          const bd = new Date(b.created);
          const ad = new Date(a.created);
          return Number(bd) - Number(ad);
        });
        if (props.setFilteredtasks) {
          props.setFilteredtasks([...copy]);
        }
      }
    } else {
      if (props.tasks) {
        const copy: card[] = [...props.tasks];
        copy.sort((a, b) => {
          if (b.due && a.due) {
            const bd = new Date(b.due);
            const ad = new Date(a.due);
            return Number(bd) - Number(ad);
          } else {
            return 0;
          }
        });
        if (props.setFilteredtasks) {
          props.setFilteredtasks([...copy]);
        }
      }
    }
  };

  return (
    <div className="filtercon">
      <label htmlFor="srch">
        Search :{" "}
        <input
          type="text"
          name="srch"
          id="srch"
          placeholder="Search"
          value={srch}
          onChange={handleChange}
          style={{ padding: 5 }}
        />
      </label>
      <label htmlFor="srtby">
        Sort By:
        <select value={srt} onChange={getSort}>
          <option id="none">None</option>
          <option id="recent">Recent</option>
          <option id="due">Due date</option>
        </select>
      </label>
    </div>
  );
};

export default Filtercon;
