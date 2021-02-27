import { React } from "react";
import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";

function ItemContainer({
  upFunc,
  downFunc,
  path,
  back,
  setVideoPlayerState,
  setAudioPlayerState,
  listView,
  searchStr,
  sort,
}) {
  const itemData = useSelector((state) => state.explorerReducer.data);
  const compare = (a, b) => {
    if (sort) return a.name.localeCompare(b.name);

    const ret = a.name.localeCompare(b.name);
    return ret === -1 ? 1 : ret === 1 ? -1 : ret;
  };
  return (
    <div
      className={`fItemContainer fPadding cardContainer ${
        listView ? "cardContainer-list" : null
      }`}
    >
      <ItemCard
        name="Go Back"
        path={path}
        up={true}
        upFunc={upFunc}
        back={back}
        listView={listView}
      />
      {itemData
        .filter((item) => {
          return item.is_dir === true;
        })
        .sort(compare)
        .map((item) => {
          return (
            <ItemCard
              path={path}
              key={item.stat + item.name}
              name={item.name}
              isDir={item.is_dir}
              size={item.size}
              extension={item.extension}
              date="69th June, 6969"
              downFunc={downFunc}
              listView={listView}
              searchStr={searchStr}
            />
          );
        })}

      {itemData
        .filter((item) => {
          return item.is_dir === false;
        })
        .sort(compare)
        .map((item) => {
          return (
            <ItemCard
              path={path}
              key={item.stat + item.name}
              name={item.name}
              isDir={false}
              size={item.size}
              extension={item.extension}
              date="69th June, 6969"
              setVideoPlayerState={setVideoPlayerState}
              setAudioPlayerState={setAudioPlayerState}
              listView={listView}
              searchStr={searchStr}
            />
          );
        })}
    </div>
  );
}

export default ItemContainer;
