import React from "react";
import "./style/Grid.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const GridComponent = () => {
  const navigate = useNavigate();
  const rows = 10;
  const columns = 6;
  const planets = useSelector((state) => state.planets.planets);



  const renderCell = (rowIndex, colIndex) => {
    const index = rowIndex * columns + colIndex;
    const cellData = planets[index];
    


    if (cellData) {
      return (
        <div
          onClick={() => {
            navigate(`/about-planet/${cellData.id}`);
          }}
          style={
            cellData.image
              ? { backgroundImage: `url('${cellData?.image}')` }
              : { backgroundColor: "white" }
          }
          key={index}
          className="grid-cell"
        >
          <div className="name-of-planet">

          {cellData.name}
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderRow = (rowIndex) => {
    const cells = Array.from({ length: columns }, (_, colIndex) =>
      renderCell(rowIndex, colIndex)

    );

    return (
      <div key={rowIndex} className="grid-row">
        {cells}
      </div>
    );
  };

  const gridRows = Array.from({ length: rows }, (_, rowIndex) =>
    renderRow(rowIndex)
  );

  return  <div className="grid-container">{gridRows}</div>;
};

export default GridComponent;
