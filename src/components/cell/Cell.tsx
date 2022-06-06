import clsx from "clsx";
import React from "react";
import { CellType } from "../../type/type";
import style from "../../pages/MineSweeper.module.scss";

type CellProp = {
  cell: CellType;
  clickCells: (x: number, y: number) => void;
  revealCells: (x: number, y: number) => void;
};

const Cell = ({ cell, clickCells, revealCells }: CellProp) => {
  // unrevealed -> false revealed -> true
  const [color, setColor] = React.useState<string>("black");

  React.useEffect(() => {
    switch (cell.value) {
      case 1:
        setColor("blue");
        break;
      case 2:
        setColor("yellow");
        break;
      case 3:
        setColor("red");
        break;
      default:
        setColor("black");
    }
  }, [color, cell]);

  const handleClick = () => {
    // already revealed or flagged  , then nothing
    if (cell.status === true || cell.flagged === true) {
      return;
    }
    clickCells(cell.x, cell.y);
  };
  const handleFlagged = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    // if already revealed then cannot be flagged
    if (cell.status === true) {
      return;
    }
    revealCells(cell.x, cell.y);
  };
  return (
    <>
      <div
        className={clsx({
          [style.cell]: true,
          [style.cell_reveal]: cell.status,
        })}
        onClick={() => handleClick()}
        onContextMenu={(e) => handleFlagged(e)}
      >
        {cell.status ? (
          <span style={{ color: color }}>{cell.value} </span>
        ) : cell.flagged ? (
          "🚩"
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Cell;
