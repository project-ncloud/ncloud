import { React } from "react";
import DriveCard from "./DriveCard";

function DriveContainer({ data }) {
  return (
    <div className="driveContainer">
      {data.map((item) => {
        return (
          <DriveCard
            key={item.host_name + "drive"}
            name={item.host_name}
            admin={item.is_you_user_admin}
            running={item.is_running}
            address={item.address}
            path={item.path}
            writable={item.writable}
            free={60}
            driveInfo="1GB Free out of 32GB"
          />
        );
      })}
    </div>
  );
}

export default DriveContainer;
