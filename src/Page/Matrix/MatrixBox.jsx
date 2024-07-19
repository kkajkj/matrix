import React, { useState } from "react";
import "./MatrixBox.css"
const MatrixBox = () => {
  const initialMatrix = Array.from({ length: 3 }, () => Array(3).fill(null));
  console.log(initialMatrix)
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    if (matrix[row][col] !== null) return;

    const newMatrix = matrix.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return "green";
        }
        return cell;
      })
    );
    const newClickOrder = [...clickOrder, { row, col }];
    setMatrix(newMatrix);
    setClickOrder(newClickOrder);
    if (newClickOrder.length === 9) {
      setTimeout(() => {
        changeAllToOrange(newClickOrder);
      }, 100);
    }
  };

  const changeAllToOrange = (order) => {
    order.forEach(({ row, col }, index) => {
      setTimeout(() => {
        setMatrix((prevMatrix) => {
          const newMatrix = prevMatrix.map((r, rowIndex) =>
              r.map((cell, colIndex) => {
              if (rowIndex === row && colIndex === col) {
                return "orange";
              }
              return cell;
            })
        );
          return newMatrix;
        });
      }, index * 500);  //500 ms interval for each box
    });
  };
  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell}`}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              &nbsp;
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixBox;
