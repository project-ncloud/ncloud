import { React, useState } from "react";
import { useSelector } from "react-redux";
import { TIMEOUT } from "../../actions/helper";
import { changeSharedAccess } from "../../actions/user_admin";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalButton from "./subcomponents/ModalButton";
import ModalCheckbox from "./subcomponents/ModalCheckbox";

const INIT = {
  writable: false,
};

const SharedPreferences = ({ func }) => {
  const explorerConst = useSelector((state) => state.explorerControlReducer);
  const [iState, setIState] = useState(INIT);
  const [busy, setBusy] = useState(false);

  const applyConfig = async () => {
    setBusy(true);
    const ret = await changeSharedAccess({
      server_name: explorerConst.server_name,
      server_address: explorerConst.address,
      host_name: explorerConst.name,
      writable: iState.writable,
    });
    if (!ret) {
      setIState(!iState.writable);
    }
    setBusy(false);
    TIMEOUT(200);
    func();
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

      <ModalButtom busy={busy}>
        <ModalButton
          key="key1"
          name="Cancel"
          type2={true}
          onClick={() => {
            func();
          }}
        />
        <ModalButton key="key2" name="Apply" onClick={() => applyConfig()} />
      </ModalButtom>
    </>
  );
};

export default SharedPreferences;
