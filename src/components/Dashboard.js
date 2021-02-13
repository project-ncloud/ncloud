import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_pending_users } from "../actions/pending_user";
import { get_users } from "../actions/user";
import "../styles/container/dashboard.scss";

function Dashboard({ toggle }) {
  const aliveObj = useSelector((state) => state.serverAliveReducer);
  const pendingUserCount = useSelector(
    (state) => state.pendingUserReducer.count
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function xx() {
      await get_pending_users();
      await get_users();
    }
    xx();
  }, []);

  return (
    <section className={`dashboard ${toggle ? null : "hide"}`} id="dashboard">
      <div className="sectionTitle purple">Dashboard</div>
      <div className="grid">
        <div className="box">
          {aliveObj.alive_count === 0 ? (
            <i id="powerOFF" className="ri-shut-down-line red"></i>
          ) : (
            <i id="powerON" className="ri-shut-down-line cyan"></i>
          )}
        </div>
        <div
          className="box bigbox"
          onClick={() => {
            dispatch({ type: "TOGGLE_SHOW_USERS", data: true });
          }}
        >
          <i className="ri-user-settings-fill yellow"></i>
          <p className="yellow">Manage Users</p>
        </div>
        <div
          className="box bigbox"
          onClick={() => {
            dispatch({ type: "TOGGLE_SHOW_PENDING_USERS", data: true });
          }}
        >
          <i className="ri-user-add-fill red"></i>
          <p className="red">Pending Requests</p>
          {pendingUserCount === 0 ? null : (
            <p className="count">{pendingUserCount}</p>
          )}
        </div>
        <div className="box bigbox">
          <i className="ri-user-6-fill purple"></i>
          <p className="purple">Managers</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
