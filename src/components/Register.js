import { React, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER, IS_TOKEN_VALID } from "../actions/auth";

import "../styles/auth/authBase.scss";
import "../styles/auth/register.scss";
import logo from "../styles/res/img/fullLogo.png";

function Register() {
  const loginInfo = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [iState, setIState] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [warn, setWarn] = useState(false);
  const [msg, setMsg] = useState("");
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
            dispatch({
              type: "ADD_SUCC_LOG",
              data: `${loginInfo.name} logged in.`,
            });
            history.push("/admin");
          }
        }
      }
    }
    checkingToken();
  }, [dispatch, history, loginInfo.name, loginInfo.username]);

  const register = async (e) => {
    e.preventDefault();
    setBusy(true);
    setWarn(false);
    setMsg("");
    const block = await REGISTER({
      name: iState.name,
      username: iState.username,
      password: iState.password,
    });
    setWarn(block.error);
    setMsg(block.msg);
    setBusy(false);
  };

  return (
    <div className="login">
      <div className="imgContainer">
        <img src={logo} alt="NCLOUD"></img>
      </div>
      <form method="POST" onSubmit={(e) => register(e)}>
        <h1>Sign Up</h1>
        <input
          onChange={(e) => {
            setIState({ ...iState, name: e.target.value });
          }}
          type="text"
          name="name"
          placeholder="name"
          required
        />
        <div />
        <input
          onChange={(e) => {
            setIState({ ...iState, username: e.target.value });
          }}
          type="text"
          name="username"
          placeholder="username"
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
          current-password={true}
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
          <button type="submit">REGISTER</button>
        )}
        <p>
          Don't have account?{" "}
          <Link className="link" to="/">
            Login
          </Link>
        </p>
        <p className="warn" style={!warn ? { color: "var(--cyan)" } : null}>
          {msg.toLowerCase() !== "user added" ? msg : "Registration Successful"}
        </p>
      </form>
    </div>
  );
}

export default Register;
