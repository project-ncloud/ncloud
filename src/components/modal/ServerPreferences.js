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
  current_address: "",
  current_name: "",
  name: "",
  address: "",
  auto_start: false,
};

const ERR_OBJ = {
  is_error: false,
  msg: "",
};

function ServerPreferences({ func }) {
  const [iState, setIState] = useState(INIT);
  const serverObj = useSelector((state) => state.serverReducer);
  const [error, setErr] = useState(ERR_OBJ);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setIState({
      current_address: serverObj.address,
      address: serverObj.address,
      current_name: serverObj.name,
      name: serverObj.name,
      auto_start: serverObj.autoStart,
    });
  }, [serverObj]);

  useEffect(() => {
    setErr(ERR_OBJ);
  }, [serverObj]);

  const applyConfig = async () => {
    setBusy(true);
    try {
      const res = await axios.put("/server/", iState, AUTH_HEADER());
      if (res.status === 200 && res.data.status === true) {
        LOGINFO("Configuration Applied", iState.current_name);
        await getServers();
        await reFetchServer({ name: iState.name, address: iState.address });
        setBusy(false);
        return {
          is_error: false,
          msg: "",
        };
      }
    } catch (Error) {
      LOGERR(Error.message, iState.current_name);
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
          name="Server Name"
          forName="serverNameSP"
          value={iState.name}
          func={(e) => {
            setIState({ ...iState, name: e.target.value });
          }}
        />

        <ModalText
          name="Server Address"
          forName="serverAddressSP"
          value={iState.address}
          func={(e) => {
            setIState({ ...iState, address: e.target.value });
          }}
        />

        <div className="row addServerRow">
          <label htmlFor="dummy" className="purple">
            Configurations
          </label>
        </div>

        <ModalCheckbox
          key="autoStartSrvr"
          name="Auto start server"
          data={iState.auto_start}
          icon={<i className="ri-server-line"></i>}
          func={(e) => {
            setIState({
              ...iState,
              auto_start: !iState.auto_start,
            });
          }}
        />
      </div>

      <ModalError error={error.is_error} msg={error.msg} />

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

export default ServerPreferences;
