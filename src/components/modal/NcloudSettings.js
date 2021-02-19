import { React, useEffect, useState } from "react";
import "../../styles/modal/list.scss";
import "../../styles/modal/addServer.scss";
import "../../styles/modal/checkbox.scss";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalError from "./subcomponents/ModalError";
import ModalButton from "./subcomponents/ModalButton";
import ModalCheckbox from "./subcomponents/ModalCheckbox";
import axios from "axios";
import { AUTH_HEADER } from "../../actions/helper";
import { useSelector } from "react-redux";
import { LOGERR, LOGINFO } from "../../actions/log";

const INIT = {
  addall_inNewHosts: false,
  allowRegistration: false,
  autoStartSrvr: false,
  pendingNewUser: false,
};

const ERR_OBJ = {
  is_error: false,
  msg: "",
};

function NcloudSettings({ func }) {
  const [iState, setIState] = useState(INIT);
  const modalToggle = useSelector(
    (state) => state.modalReducer.show_ncloud_preferences
  );
  const [error, setErr] = useState(ERR_OBJ);
  const [busy, setBusy] = useState(false);

  const fetchConfig = async () => {
    try {
      const res = await axios.get("/ncloud/config/", AUTH_HEADER());
      if (res.status === 200 && res.data.status === true) {
        setIState(res.data.data);
      }
    } catch (Error) {
      LOGERR(Error.message, "NCLOUD CONFIG");
      func();
    }
  };

  const applyConfig = async () => {
    setBusy(true);
    try {
      const res = await axios.post("/ncloud/config/", iState, AUTH_HEADER());
      if (res.status === 200 && res.data.status === true) {
        LOGINFO("Configuration Applied", "NCLOUD CONFIG");
        setBusy(false);
        return {
          is_error: false,
          msg: "",
        };
      }
    } catch (Error) {
      LOGERR(Error.message, "NCLOUD CONFIG");
      setBusy(false);
      return {
        is_error: true,
        msg: Error.message,
      };
    }
  };

  useEffect(() => {
    async function dummy() {
      await fetchConfig();
    }
    dummy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalToggle]);

  return (
    <>
      <div className="list userListM" style={{ height: "350px" }}>
        <div className="row addServerRow">
          <label htmlFor="dummy" className="purple">
            Genaral
          </label>
        </div>

        <ModalCheckbox
          cKey="autoStartSrvrNP"
          name="Auto start server"
          data={iState.autoStartSrvr}
          icon={<i className="ri-server-line"></i>}
          func={(e) => {
            setIState({
              ...iState,
              autoStartSrvr: !iState.autoStartSrvr,
            });
          }}
        />

        <div className="row addServerRow"></div>

        <div className="row addServerRow">
          <label htmlFor="dummy" className="purple">
            User
          </label>
        </div>

        <ModalCheckbox
          cKey="allowRegistrationNP"
          name="Allow registration"
          data={iState.allowRegistration}
          icon={<i className="ri-user-settings-line"></i>}
          func={(e) => {
            setIState({
              ...iState,
              allowRegistration: !iState.allowRegistration,
            });
          }}
        />

        <ModalCheckbox
          cKey="pendingNewUserNP"
          name="Put new users into pending Users"
          data={iState.pendingNewUser}
          icon={<i className="ri-user-shared-line"></i>}
          func={(e) => {
            setIState({
              ...iState,
              pendingNewUser: !iState.pendingNewUser,
            });
          }}
        />
        <ModalCheckbox
          cKey="addall_inNewHostsNP"
          name="Automatically add users after approval"
          data={iState.addall_inNewHosts}
          icon={<i className="ri-user-add-line"></i>}
          func={(e) => {
            setIState({
              ...iState,
              addall_inNewHosts: !iState.addall_inNewHosts,
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
              setErr(ERR.msg);
            }
          }}
        />
      </ModalButtom>
    </>
  );
}

export default NcloudSettings;
