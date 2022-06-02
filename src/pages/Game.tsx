import React, { useEffect, useState } from "react";
import style from "./Game.module.scss";
import clsx from "clsx";

const winnerCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type Prop = {
  winner: number;
  restart: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  draw: boolean;
};
const WinMessage = ({ winner, restart, draw }: Prop) => {
  return (
    <div className={style.win_message}>
      <div className={style.text}>
        {winner !== 0
          ? `Winner is ${winner === 1 ? "X" : "O"}`
          : draw
          ? "Draw!"
          : ""}
      </div>
      <button className={style.restart} onClick={(e) => restart(e)}>
        Restart
      </button>
    </div>
  );
};

type CellProp = {
  index: number;
  cell: number;
  handleClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => void;
};
const Cell = ({ index, cell, handleClick }: CellProp) => {
  return (
    <div
      key={index}
      className={clsx({
        [style.cell]: true,
        [style.cell_cross]: cell === 1,
        [style.cell_circle]: cell === 2,
      })}
      onClick={cell === 0 ? (e) => handleClick(e, index) : undefined}
    ></div>
  );
};

export const Game = () => {
  const [cells, setCells] = useState<number[]>(Array(9).fill(0));
  const [turn, setTurn] = useState<number>(1);
  const [draw, setDraw] = useState<boolean>(false);
  const [winner, setWinner] = useState<number>(0);

  const isDraw = React.useCallback(() => {
    if (
      cells.every((condition) => {
        return condition !== 0;
      }) &&
      draw !== true
    ) {
      setDraw(true);
    }
  }, [cells, draw]);

  const determineWinner = React.useCallback(() => {
    isDraw();
    const result = winnerCondition.some((condition) => {
      return condition.every((index) => {
        if (turn === 1) {
          return cells[index] === 2;
        } else {
          return cells[index] === 1;
        }
      });
    });

    if (result === true) {
      if (turn === 1) {
        setWinner(2);
      } else {
        setWinner(1);
      }
    }
  }, [cells, turn, isDraw]);

  useEffect(() => {
    determineWinner();
  }, [cells, determineWinner]);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    if (winner !== 0) {
      return;
    }
    setCells((prev) =>
      prev.map((cell, i) => {
        if (i === index) {
          cell = turn;
        }
        return cell;
      })
    );
    swapTurn();
    // swap turn
  };

  const swapTurn = () => {
    if (turn === 1) {
      setTurn(2);
    } else {
      setTurn(1);
    }
  };

  const restart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCells(Array(9).fill(0));
    setDraw(false);
    setWinner(0);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.user}>Turn {turn === 1 ? "X" : "O"}</div>
      <div className={style.board}>
        {cells.map((cell, index) => (
          <Cell
            key={index}
            cell={cell}
            index={index}
            handleClick={handleClick}
          />
        ))}
      </div>
      {(winner !== 0 || draw) && (
        <WinMessage winner={winner} restart={restart} draw={draw} />
      )}
    </div>
  );
};
