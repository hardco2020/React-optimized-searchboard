import React from "react";
import style from "./MineSweeper.module.scss";
import {
  checkWin,
  generateCells,
  stepNearCells,
} from "../util/MinSweeperHelper";
import { CellType } from "../type/type";
import Cell from "../components/cell/Cell";

const MineSweeper = () => {
  // have mine -> -1 don't have mine will show the mine near it
  const [mineLeft, setMineLeft] = React.useState<number>(10);
  const [cells, setCells] = React.useState<CellType[]>(generateCells(100, 10));
  const [win, setWin] = React.useState<boolean>(false);
  const [lose, setLose] = React.useState<boolean>(false);

  console.log("rerender", cells);
  const clickCells = (x: number, y: number) => {
    // if click on wrong cells immediately rerun
    if (cells[x * 10 + y].value === -1) {
      console.log("You lose");
      setLose(true);
    }
    const new_cells: CellType[] = stepNearCells(x, y, cells);
    if (checkWin(new_cells, 10)) {
      setWin(true);
    }
    setCells(new_cells);
  };
  const revealCells = (x: number, y: number) => {
    // if mineleft =  0 then we are not click to add unless you want to unflag
    if (mineLeft === 0 && cells[x * 10 + y].flagged !== true) {
      return;
    }
    if (cells[x * 10 + y].flagged === false && mineLeft > 0) {
      setMineLeft((prev) => prev - 1);
    } else {
      setMineLeft((prev) => prev + 1);
    }
    setCells((prev_cells) =>
      prev_cells.map((cell) => {
        if (cell.x === x && cell.y === y) {
          cell.flagged = !cell.flagged;
        }
        return cell;
      })
    );
  };
  return (
    <div className={style.wrapper}>
      <h1>MineSweeper</h1>
      {lose && <h2>You lose !!!</h2>}
      {win && <h2>You win !!!</h2>}
      <div className={style.leaderboard}>{mineLeft} / 10</div>
      <div className={style.board}>
        {cells.map((cell) => {
          return (
            <Cell
              key={cell.id}
              cell={cell}
              clickCells={clickCells}
              revealCells={revealCells}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MineSweeper;
