import React, { useState } from "react";
import { dirData } from "../../actions/explorer";
import { TIMEOUT } from "../../actions/helper";

function ExplorerCustomization({
  listView,
  setListView,
  searchStr,
  setSearchStr,
  setAlphaSort,
  sort,
}) {
  const [loading, setLoading] = useState(false);
  const switchSort = () => {
    setAlphaSort(!sort);
  };

  const reloadDir = async () => {
    setLoading(true);
    await TIMEOUT(1000);
    await dirData();
    await TIMEOUT(1000);
    setLoading(false);
  };
  return (
    <div className="fCustomization fPadding">
      <i
        className={`ri-refresh-line ${
          loading ? "active reload-loading" : null
        }`}
        onClick={() => reloadDir()}
      ></i>
      {listView ? (
        <>
          <i
            className="ri-function-line"
            onClick={() => setListView(false)}
          ></i>
          <i className="ri-menu-2-line active"></i>
        </>
      ) : (
        <>
          <i className="ri-function-fill active"></i>
          <i className="ri-menu-2-line" onClick={() => setListView(true)}></i>
        </>
      )}
      <i
        className={`ri-filter-3-fill ${sort && "active-btn"}`}
        onClick={() => switchSort()}
      ></i>
      <input
        className="fCustomization-search"
        type="text"
        placeholder="search"
        onChange={(e) => setSearchStr(e.target.value)}
        value={searchStr}
      ></input>
    </div>
  );
}

export default ExplorerCustomization;
