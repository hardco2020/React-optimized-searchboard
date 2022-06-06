import { CellType } from "../type/type";

export const legitPos = (x: number, y: number, arr_size: number): boolean => {
  if (0 <= x && x < arr_size && 0 <= y && y < arr_size) {
    return true;
  }
  return false;
};
export const near_direct = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

export const generateCells = (size: number, mine: number) => {
  //initialize the array
  function makeArray(size: number) {
    let arr: CellType[] = [];
    for (let i = 0; i < size; i++) {
      const new_cell: CellType = {
        id: i,
        x: Math.floor(i / 10),
        y: i % 10,
        value: 0,
        status: false,
        flagged: false,
      };
      arr.push(new_cell);
    }
    return arr;
  }

  function detectCells(x: number, y: number, cells: CellType[]) {
    //check 8 directions of the cell
    let nearby_mine = 0;
    near_direct.forEach((dir) => {
      // legit number in array
      const new_x = x + dir[0];
      const new_y = y + dir[1];
      const new_id = new_x * 10 + new_y;

      if (legitPos(new_x, new_y, 10) && cells[new_id].value === -1) {
        nearby_mine += 1;
      }
    });
    return nearby_mine;
  }
  let cells = makeArray(size);
  let mine_left = mine;
  //generate 10 mines
  while (mine_left > 0) {
    // generate between 0 - 9
    const id = Math.floor(Math.random() * 100);
    // check if the mine generate at the same spot
    if (cells[id].value !== -1) {
      cells[id].value = -1;
      mine_left -= 1;
    }
  }

  // calculate every cells near the mine
  for (let i = 0; i < size / 10; i++) {
    for (let j = 0; j < size / 10; j++) {
      const new_id = i * 10 + j;
      if (cells[new_id].value !== -1) {
        cells[new_id].value = detectCells(i, j, cells);
      }
    }
  }

  return cells;
};

export const stepNearCells = (
  x: number,
  y: number,
  cells: CellType[]
): CellType[] => {
  // do a deep copy of array
  let newCells = cells.slice(0);
  console.log(newCells);
  // calculate the id
  const id = x * 10 + y;

  // step the current mine
  newCells[id].status = true;

  // check if current cell is bomb or is other value then we stopped or is not already revealed
  if (newCells[id].value !== 0) {
    // if it's a bomb !!!
    // if it's other value

    return newCells;
  }

  // start check for adjacent cells
  near_direct.forEach((dir) => {
    const new_x = dir[0] + x;
    const new_y = dir[1] + y;
    const new_id = new_x * 10 + new_y;

    // if new_id is legit in the array, then we do another search and it's not yet revealed
    if (
      legitPos(new_x, new_y, 10) &&
      cells[new_id].status === false &&
      cells[new_id].flagged !== true
    ) {
      stepNearCells(new_x, new_y, newCells);
    }
  });
  return newCells;
};

export const checkWin = (cells: CellType[], win_mine: number): boolean => {
  // if flagged part's value is -1  and ( value != -1 and status === true )
  let win_status = true;
  cells.forEach((cell) => {
    if (cell.flagged === true && cell.value === -1) {
      win_mine -= 1;
    }
    // if the area is not mine and also not revealed,then still no win
    if (cell.flagged === false && cell.status === false) {
      win_status = false;
    }
  });
  return win_mine === 0 && win_status === true;
};
