import axios from "axios";
import { React, useState } from "react";
import { AUTH_HEADER } from "../../actions/helper";
import { LOGERR, LOGINFO } from "../../actions/log";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalButton from "./subcomponents/ModalButton";
import ModalCheckbox from "./subcomponents/ModalCheckbox";
import ModalError from "./subcomponents/ModalError";

const INIT = {
  current_address: "",
  current_name: "",
  name: "",
  address: "",
  writable: false,
};

const ERR_OBJ = {
  is_error: false,
  msg: "",
};

const SharedPreferences = ({ func }) => {
  const [iState, setIState] = useState(INIT);
  const [error, setErr] = useState(ERR_OBJ);
  const [busy, setBusy] = useState(false);

  const applyConfig = async () => {
    setBusy(true);
    try {
      const res = await axios.put("/Pending/", iState, AUTH_HEADER());
      if (res.status === 200 && res.data.status === true) {
        LOGINFO("Configuration Applied", iState.current_name);
        // await getServers();
        // await reFetchServer({ name: iState.name, address: iState.address });
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
      <div className="list userListM" style={{ height: "150px" }}>
        <ModalCheckbox
          cKey="sharedPrefWritable"
          name="Write access to shared user"
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
                writable: iState.writable,
              });
            }
          }}
        />
      </ModalButtom>
    </>
  );
};

export default SharedPreferences;
