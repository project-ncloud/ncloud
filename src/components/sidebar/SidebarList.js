import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarListElement from "./SidebarListElement";
import {getServers} from '../../actions/server'
import "../../styles/sidebar/sidebarList.scss";

function SidebarList() {
  const dispatch = useDispatch();
  const serverData = useSelector((state) => state.serversReducer);

  useEffect(() => {
    getServers();
  }, []);

  const gotoServer = (item) => {
    dispatch({ type: "STORE_SERVER", data: item });
    dispatch({ type: "TOGGLE_UI", data: "showServerContainer" });
  };

  return (
    <div className="list">
      {serverData.map((item) => {
        return (
          <SidebarListElement
            key={item.address + item.name}
            data={item}
            func={() => gotoServer(item)}
          />
        );
      })}
    </div>
  );
}

export default SidebarList;
