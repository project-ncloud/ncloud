import React, { useState } from "react";

function ExplorerCustomization({
  listView,
  setListView,
  searchStr,
  setSearchStr,
  setAlphaSort,
  sort,
}) {
  const switchSort = () => {
    setAlphaSort(!sort);
  };
  return (
    <div className="fCustomization fPadding">
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
