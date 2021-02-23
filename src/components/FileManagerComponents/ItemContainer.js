import { React } from "react";
import { useSelector } from "react-redux";
import ItemCard from "./ItemCard";

function ItemContainer({ upFunc, downFunc, path, back, setVideoPlayerState }) {
  const itemData = useSelector((state) => state.explorerReducer.data);
  return (
    <div className="fItemContainer fPadding cardContainer">
      <ItemCard
        name="Go Back"
        path={path}
        up={true}
        upFunc={upFunc}
        back={back}
      />
      {itemData
        .filter((item) => {
          return item.is_dir === true;
        })
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
            />
          );
        })}
      {itemData
        .filter((item) => {
          return item.is_dir === false;
        })
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
            />
          );
        })}
    </div>
  );
}

export default ItemContainer;
