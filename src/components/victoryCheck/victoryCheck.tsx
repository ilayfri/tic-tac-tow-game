export const victoryCheck = (board: any[][]) => {
    console.log(board)
  const allEqual = (arr: any[]) => arr.every((v) => v === arr[0] && v !="");
  const horizontal = [0, 1, 2].map((i) => {
    return [board[i][0], board[i][1], board[i][2]];
  });
  const vertical = [0, 1, 2].map((i) => {
    return [board[0][i], board[1][i], board[2][i]];
  });

  const diagonal = [
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  const horizontalCheck = horizontal
    .map((horizontalLine) => allEqual(horizontalLine))
    .reduce((a, b) => a || b);
  const verticalCheck = vertical
    .map((verticalLine) => allEqual(verticalLine))
    .reduce((a, b) => a || b);

  const diagonalCheck = diagonal
    .map((diagonalLine) => allEqual(diagonalLine))
        .reduce((a, b) => a || b);
    
    console.log(horizontalCheck || verticalCheck || diagonalCheck);
    return horizontalCheck || verticalCheck || diagonalCheck;
};
