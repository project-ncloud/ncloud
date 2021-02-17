import { React, useState } from "react";
import { useSelector } from "react-redux";
import DriveCard from "./DriveCard";

function DriveContainer({ data }) {
  const servers = useSelector((state) => state.serversReducer);
  const [state, setState] = useState(false);
  return (
    <div className="driveContainer">
      {data.map((item) => {
        return (
          <DriveCard
            key={item.host_name + "drive"}
            name={item.host_name}
            admin={item.is_you_user_admin}
            running={item.is_running}
            free={60}
            driveInfo="1GB Free out of 32GB"
          />
        );
      })}
    </div>
  );
}

export default DriveContainer;
