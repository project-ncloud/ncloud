import { React, useEffect } from "react";
import { getSizeStr, is_user_admin } from "../../actions/explorer";
import { TIMEOUT } from "../../actions/helper";
import { get_users } from "../../actions/user";
import DriveCard from "./DriveCard";

function DriveContainer({ data }) {
  useEffect(() => {
    async function xx() {
      await TIMEOUT(100);
      if (is_user_admin()) {
        await get_users();
      }
    }
    return xx();
  }, []);
  return (
    <div className="driveContainer">
      {data.map((item) => {
        return (
          <DriveCard
            key={item.host_name + "drive"}
            data={item}
            free={Math.floor((item.used * 100) / item.total)}
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
