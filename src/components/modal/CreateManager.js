import { React, useState } from "react";
import { create_manager, get_managers } from "../../actions/manager";
import "../../styles/modal/list.scss";
import "../../styles/modal/addServer.scss";
import ModalText from "./subcomponents/ModalText";
import ModalButtom from "./subcomponents/ModalButtom";
import ModalError from "./subcomponents/ModalError";
import ModalButton from "./subcomponents/ModalButton";

const INIT = {
  name: "",
  username: "",
  password1: "",
  password2: "",
};

const ERR_OBJ = {
  is_error: false,
  msg: "",
};

function CreateManager({ func }) {
  const [iState, setIState] = useState(INIT);
  const [error, setErr] = useState(ERR_OBJ);
  const [busy, setBusy] = useState(false);

  const create_Manager = async () => {
    setBusy(true);
    const resObj = await create_manager({
      name: iState.name,
      username: iState.username,
      password1: iState.password1,
      password2: iState.password2,
    });

    setErr(resObj);

    if (!resObj.is_error) {
      await get_managers();
      func();
    }

    setBusy(false);
  };

  return (
    <>
      <ModalText
        name="Name"
        forName="createManagerName"
        value={iState.name}
        func={(e) => {
          setIState({ ...iState, name: e.target.value });
        }}
      />

      <ModalText
        name="Username"
        forName="createManagerUsername"
        value={iState.username}
        func={(e) => {
          setIState({ ...iState, username: e.target.value });
        }}
      />

      <ModalText
        name="Password"
        forName="createManagerPassword"
        value={iState.password1}
        type="password"
        func={(e) => {
          setIState({ ...iState, password1: e.target.value });
        }}
      />

      <ModalText
        name="Retype Password"
        forName="createManagerPassword2"
        value={iState.password2}
        type="password"
        func={(e) => {
          setIState({ ...iState, password2: e.target.value });
        }}
      />

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
          name="Create"
          onClick={() => create_Manager()}
        />
      </ModalButtom>
    </>
  );
}

export default CreateManager;
