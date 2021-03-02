import React from "react";
import logo from "../../styles/res/img/fullLogo.png";
import redux from "../../styles/res/img/redux.png";
import mongodb from "../../styles/res/img/mongodb.png";
import flask from "../../styles/res/img/flask.png";
import react from "../../styles/res/img/react.png";
import samba from "../../styles/res/img/samba.png";
import scss from "../../styles/res/img/scss.png";
import jwt from "../../styles/res/img/jwt.png";
import remixicon from "../../styles/res/img/remixicon.png";
import "../../styles/modal/modalBase.scss";
import "../../styles/modal/about.scss";

function InfoModal({ showMe, func, specClass, width = "600px" }) {
  const knowMore = (no) => {
    const links = [
      "https://github.com/DNI9",
      "https://github.com/epicX67",
      "",
      "",
    ];
    const link = document.createElement("a");
    link.href = links[no];
    link.target = "blank";
    link.click();
  };

  return (
    <div className={`overlayContainer ${showMe ? null : "hide"}`}>
      <div className="overlayWrapper" onClick={func}></div>
      <div className="ocontainer oAddServerContainer" style={{ width: width }}>
        <div className="topBar">
          <i className="ri-close-fill" onClick={func}></i>
        </div>

        <div
          className={`modalContainer scrollable ${
            specClass ? specClass : null
          }`}
        >
          <img alt="N Cloud" src={logo} className="about-main-Logo"></img>

          <div className="row aboutRow about-info-ncloud">
            N cloud is a software solution of mini network attached storage
            system including various advance features.
          </div>
          <div className="row aboutRow"></div>

          <div className="row aboutRow about-sub-head">Contact</div>
          <div className="tech-flex">
            <a href="https://project-ncloud.github.io/" target="blank">
              <i className="ri-hard-drive-line"></i> Visit
            </a>
            <a href="https://github.com/project-ncloud" target="blank">
              <i className="ri-github-line"></i> Source code
            </a>
          </div>

          <div className="row aboutRow"></div>
          <div className="row aboutRow"></div>

          <div className="row aboutRow about-sub-head">Powered by</div>
          <div className="tech-flex">
            <a href="https://reactjs.org/" target="blank">
              <img alt="React" src={react}></img>
            </a>
            <a href="https://redux.js.org/" target="blank">
              <img alt="Redux" src={redux}></img>
            </a>
            <a href="https://sass-lang.com/" target="blank">
              <img alt="Scss" src={scss}></img>
            </a>
            <a href="https://remixicon.com/" target="blank">
              <img alt="Remix Icons" src={remixicon}></img>
            </a>
            <a href="https://jwt.io/" target="blank">
              <img alt="JWT" src={jwt}></img>
            </a>
            <a
              href="https://flask.palletsprojects.com/en/1.1.x/"
              target="blank"
            >
              <img alt="Flask" src={flask}></img>
            </a>
            <a href="https://www.mongodb.com/" target="blank">
              <img alt="Mongodb" src={mongodb}></img>
            </a>
            <a href="https://www.samba.org/" target="blank">
              <img alt="Samba" src={samba}></img>
            </a>
          </div>
          <div className="row aboutRow"></div>
          <div className="row aboutRow"></div>

          <div className="row aboutRow about-sub-head">Under guidance</div>
          <div className="row checkboxRow">
            <label>
              <div className="labelInfo">
                <i className="ri-user-6-fill"></i>
                Surajit Goon
              </div>
            </label>
          </div>
          <div className="row aboutRow"></div>

          <div className="row aboutRow about-sub-head">Faculties</div>
          <div className="row checkboxRow">
            <label>
              <div className="labelInfo">
                <i className="ri-user-line"></i>
                Prianka Kundu
              </div>
            </label>
          </div>
          <div className="row checkboxRow">
            <label>
              <div className="labelInfo">
                <i className="ri-user-line"></i>
                Chandrima Sinha Roy
              </div>
            </label>
          </div>
          <div className="row checkboxRow">
            <label>
              <div className="labelInfo">
                <i className="ri-user-line"></i>
                Debabrata Barik
              </div>
            </label>
          </div>
          <div className="row checkboxRow">
            <label>
              <div className="labelInfo">
                <i className="ri-user-line"></i>
                Indrani Dalui
              </div>
            </label>
          </div>

          <div className="row aboutRow"></div>

          <div className="row aboutRow about-sub-head">Our team</div>
          <div className="row checkboxRow">
            <label onClick={() => knowMore(0)}>
              <div className="labelInfo">
                <i className="ri-user-5-fill"></i>
                Indrajit Sarkar
              </div>
            </label>
          </div>
          <div className="row checkboxRow">
            <label onClick={() => knowMore(1)}>
              <div className="labelInfo">
                <i className="ri-user-smile-fill"></i>
                Sourav Gain
              </div>
            </label>
          </div>
          <div className="row checkboxRow">
            <label>
              <div className="labelInfo">
                <i className="ri-user-heart-fill"></i>
                Sujoy Saha
              </div>
            </label>
          </div>
          <div className="row checkboxRow">
            <label>
              <div className="labelInfo">
                <i className="ri-user-star-fill"></i>
                Suvrojit Saha
              </div>
            </label>
          </div>

          <div className="row aboutRow"></div>
          <div className="row aboutRow"></div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
