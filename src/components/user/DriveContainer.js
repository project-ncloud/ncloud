import { React, useEffect } from "react";
import { getSizeStr, is_user_admin } from "../../actions/explorer";
import { TIMEOUT } from "../../actions/helper";
import { get_users } from "../../actions/user";
import DriveCard from "./DriveCard";

function DriveContainer({ data }) {
  useEffect(() => {
    async function xx() {
      await TIMEOUT(2000);
      if (is_user_admin()) {
        await get_users();
      }
    }
    xx();
  }, []);
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
            free={Math.floor((item.used * 100) / item.total)}
            validUsers={item.validUsers}
            driveInfo={{
              str: `${getSizeStr(item.total - item.used)} free of ${getSizeStr(
                item.total
              )}`,
              total: item.total,
              used: item.used,
            }}
          />
        );
      })}
    </div>
  );
}

export default DriveContainer;
