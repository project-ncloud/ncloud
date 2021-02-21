import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PathBar from "./PathBar";
import ItemContainer from "./ItemContainer";

function Explorer() {
  const path = useSelector((state) => state.explorerReducer.path);
  const explorerConst = useSelector((state) => state.explorerControlReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (explorerConst.path === "") {
      history.push("/user");
    }
  });

  useEffect(() => {
    const openDrive = async () => {
      try {
        const res = await axios.get(`http://${explorerConst.address}/dir/`, {
          params: { path },
        });
        if (res.status === 200) {
          dispatch({ type: "STORE_EXPLORER_DATA", data: res.data });
        }
      } catch (Error) {}
    };
    openDrive();
  }, [dispatch, path]);

  const downDir = (name) => {
    dispatch({ type: "STORE_EXPLORER_PATH", data: path + "/" + name });
  };

  const upDir = () => {
    if (path !== explorerConst.path) {
      dispatch({
        type: "STORE_EXPLORER_PATH",
        data: path.substring(0, path.lastIndexOf("/")),
      });
    }
  };

  return (
    <div className="fExplorer">
      <div className="fHeader fPadding">
        <h1>Explorer</h1>
      </div>
      <PathBar path={path} />
      <ItemContainer path={path} upFunc={upDir} downFunc={downDir} />
    </div>
  );
}

export default Explorer;
