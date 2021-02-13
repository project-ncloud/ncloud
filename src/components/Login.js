import { React, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN, IS_TOKEN_VALID } from "../actions/auth";
import { LOGINFO } from "../actions/log";

import "../styles/auth/authBase.scss";
import "../styles/auth/login.scss";
import logo from "../styles/res/img/fullLogo.png";

function Login() {
  const loginInfo = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [iState, setIState] = useState({ username: "", password: "" });
  const [warn, setWarn] = useState(false);
  const [errmsg, setErrMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function checkingToken() {
      const token = localStorage.getItem("NCLOUD_TOKEN");
      if (token !== null) {
        const obj = await IS_TOKEN_VALID(token);
        if (obj.status) {
          const { manager, admin } = obj.data;
          if (admin !== true && manager !== true) {
            history.push("/user");
          } else {
            LOGINFO(`${loginInfo.name} logged in.`, "AUTH");
            history.push("/admin");
          }
        }
      }
    }
    checkingToken();
  }, [history, loginInfo.name, loginInfo.username]);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    setWarn(false);
    const block = await LOGIN({
      username: iState.username,
      password: iState.password,
    });
    dispatch(block);
    if (block.data.username === null || block.data.username === "") {
      setWarn(true);
      setErrMsg("Login Failed");
    } else {
      setWarn(false);
      setErrMsg("");
    }
    setBusy(false);
  };

  return (
    <div className="login">
      <div className="imgContainer">
        <img src={logo} alt="NCLOUD"></img>
      </div>
      <form method="POST" onSubmit={(e) => login(e)}>
        <h1>Sign in</h1>
        <input
          onChange={(e) => {
            setIState({ ...iState, username: e.target.value });
          }}
          type="text"
          name="username"
          placeholder="username"
          autoComplete="username"
          required
        />
        <div />
        <input
          onChange={(e) => {
            setIState({ ...iState, password: e.target.value });
          }}
          type="password"
          name="password"
          placeholder="password"
          autoComplete="current-password"
          required
        />
        {busy ? (
          <button
            style={{
              color: "var(--sub-text-color)",
              background: "var(--subBackgroundColor)",
            }}
          >
            Please wait
          </button>
        ) : (
          <button type="submit">LOGIN</button>
        )}
        <p>
          Don't have account?{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
        {warn ? <p className="warn">{errmsg}</p> : null}
      </form>
    </div>
  );
}

export default Login;
