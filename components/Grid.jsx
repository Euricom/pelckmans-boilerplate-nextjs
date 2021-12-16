import React from "react";

const Grid = ({ children, style }) => {
  const childCount = React.Children.count(children);
  const columns = childCount > 3 ? "3" : childCount;
  return (
    <div className={`row row-cols-${columns}`} style={style}>
      {React.Children.map(children, (child) => {
        return <div className="col">{child}</div>;
      })}
    </div>
  );
};

export default Grid;
