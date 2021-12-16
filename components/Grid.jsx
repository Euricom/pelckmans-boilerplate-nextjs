import React from 'react';

const Grid = ({children, style}) => {
  return (
   <div className="row row-cols-2 row-cols-md-3 g-4" style={style}>
     {React.Children.map(children, child => {
       return <div className="col">{child}</div>
     })}
   </div>
  );
};

export default Grid;
