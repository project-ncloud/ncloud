import axios from "axios";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AUTH_HEADER } from "../../actions/helper";
import { LOGERR, LOGINFO } from "../../actions/log";
import { getServers, reFetchServer } from "../../actions/server";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalButton from "./subcomponents/ModalButton";
import ModalCheckbox from "./subcomponents/ModalCheckbox";
import ModalError from "./subcomponents/ModalError";
import ModalText from "./subcomponents/ModalText";

const INIT = {
  server_name: "",
  current_host_name: "",
  current_host_path: "",
  current_public_access: false,
  current_write_access: false,
  name: "",
  path: "",
  public: false,
  writable: false,
};

const ERR_OBJ = {
  is_error: false,
  msg: "",
};

function HostPreferences({ func }) {
  const [iState, setIState] = useState(INIT);
  const serverObj = useSelector((state) => state.serverReducer);
  const hostObj = useSelector((state) => state.hostReducer);
  const [error, setErr] = useState(ERR_OBJ);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setIState({
      server_name: serverObj.name,
      current_host_name: hostObj.name,
      current_host_path: hostObj.path,
      current_public_access: hostObj.public,
      current_write_access: hostObj.writable,
      name: hostObj.name,
      path: hostObj.path,
      public: hostObj.public,
      writable: hostObj.writable,
    });
  }, [serverObj, hostObj]);

  useEffect(() => {
    setErr(ERR_OBJ);
  }, [serverObj]);

  const applyConfig = async () => {
    setBusy(true);
    try {
      const res = await axios.post(
        "/server/host/config/",
        iState,
        AUTH_HEADER()
      );
      if (res.status === 200 && res.data.status === true) {
        LOGINFO("Configuration Applied", iState.current_host_name);
        await getServers();
        await reFetchServer({ name: iState.name, address: iState.address });
        setBusy(false);
        return {
          is_error: false,
          msg: "",
        };
      }
    } catch (Error) {
      LOGERR(Error.message, iState.current_host_name);
      setBusy(false);
      return {
        is_error: true,
        msg: Error.message,
      };
    }
  };

  return (
    <>
      <div className="list userListM" style={{ height: "350px" }}>
        <ModalText
          name="Host Name"
          forName="hostNameHP"
          value={iState.name}
          func={(e) => {
            setIState({ ...iState, name: e.target.value });
          }}
        />

        <ModalText
          name="Host Path"
          forName="hostPathHP"
          value={iState.path}
          func={(e) => {
            setIState({ ...iState, path: e.target.value });
          }}
        />

        <div className="row addServerRow">
          <label htmlFor="dummy" className="purple">
            Access control
          </label>
        </div>

        <ModalCheckbox
          key="public"
          name="Public Access"
          data={iState.public}
          icon={<i className="ri-server-line"></i>}
          func={(e) => {
            setIState({
              ...iState,
              public: !iState.public,
            });
          }}
        />

        <ModalCheckbox
          key="write"
          name="Write Access"
          data={iState.writable}
          icon={<i className="ri-server-line"></i>}
          func={(e) => {
            setIState({
              ...iState,
              writable: !iState.writable,
            });
          }}
        />
      </div>

      <ModalError error={error.is_error} msg={error.msg} />

      <div className="row addServerRow"></div>

      <ModalButtom busy={busy}>
        <ModalButton
          key="key1"
          name="Cancel"
          type2={true}
          onClick={() => {
            func();
          }}
        />
        <ModalButton
          key="key2"
          name="Apply"
          onClick={async () => {
            const ERR = await applyConfig();
            if (!ERR.is_error) {
              func();
            } else {
              setErr(ERR);
              setIState({
                ...iState,
                name: iState.current_name,
                address: iState.current_address,
                auto_start: serverObj.autoStart,
              });
            }
          }}
        />
      </ModalButtom>
    </>
  );
}

export default HostPreferences;
