import { useEffect, useState } from "react";
import { postRequest } from "../API/ApiRequests";
import { victoryCheck } from "../victoryCheck/victoryCheck";
import "./Game.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
export default function Game(props: any) {
  const [board, setBoard] = useState([
    new Array(3).fill(""),
    new Array(3).fill(""),
    new Array(3).fill(""),
  ]);
  const [userTurn, setUserTurn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [endGameMessage, setEndGameMessageame] = useState("");
  const [endGameStatus, setEndGameStatus] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    if (userTurn == false) {
      if (emptyLeftCells() > 0) {
        ApiTurn();
      } else {
        setEndGameStatus(true);
        setEndGameMessageame("Draw!");
      }
    }
  }, [userTurn]);

  useEffect(() => {
    if (emptyLeftCells() != 9) {
      let winningStatus = victoryCheck(board);
      if (winningStatus) {
        setEndGameStatus(true);
        if (userTurn) {
          setEndGameMessageame("You Win!");
        } else {
          setEndGameMessageame("AI Wins!");
        }
      } else {
        if (userTurn) {
          setUserTurn(false);
        } else {
          setUserTurn(true);
        }
      }
    }
  }, [board]);

  async function clickHandle(item: any) {
    if (!endGameStatus) {
      const updatedBoard = board.map((row) => {
        return row.map((column) => {
          return column;
        });
      });
      updatedBoard[item.rowIndex][item.columnIndex] = "X";
      setBoard(updatedBoard);
    }
  }
  function restart() {
    setEndGameStatus(false);
    setEndGameMessageame("");
    setErrorMessage("");
    setUserTurn(true);
    setBoard([
      new Array(3).fill(""),
      new Array(3).fill(""),
      new Array(3).fill(""),
    ]);
  }

  function emptyLeftCells() {
    return board
      .map((line) => line.filter((elem) => elem == "").length)
      .reduce((a, b) => a + b);
  }

  async function ApiTurn() {
    try {
      setApiLoading(true);
      const data = await postRequest(
        "engine",
        JSON.stringify({ board: board })
      );
      if (data.success) {
        setBoard(data.board);
      } else {
        setErrorMessage("Some Error occurred!");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
    setApiLoading(false);
  }
  return (
    <>
      <h1>Tic-Tac-Toe:</h1>
      <div className="gameDiv">
              <div className="twoSpans">
        <span className="basicSpans">
          <div className="boardStyle">
            <div>
              {" "}
              {board.map((row, rowIndex) => {
                return (
                  <div
                    style={{
                      marginTop: "30px",
                      height: "100px",
                    }}
                  >
                    {row.map((column, columnIndex) => {
                      return (
                        <span
                          className="cell"
                          onClick={() => {
                            if (!apiLoading && column == "") {
                              clickHandle({
                                rowIndex: rowIndex,
                                columnIndex: columnIndex,
                              });
                            }
                          }}
                        >
                          {column}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </span>
        <span className="basicSpans">
          <div className="rightPanel">
            <div>
              next turn:<br></br>
              <br></br>
            </div>
            <div className="infoUpdate">
              <span>
                {userTurn ? (
                  "Your turn"
                ) : (
                  <>
                    {apiLoading && (
                      <>
                        <Loader
                          type="TailSpin"
                          color="#00BFFF"
                          height={50}
                          width={50}
                        />
                        <div> AI plays..</div>
                      </>
                    )}
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="rightPanel">
            <div>
              End game status:<br></br>
              <br></br>
            </div>
            <div className="infoUpdate">
              {" "}
              {endGameMessage ? (
                <>
                  <h4>{endGameMessage}</h4>
                </>
              ) : null}
            </div>
          </div>
              </span>
              </div>
      </div>
      <div style={{ paddingTop: "10px" }}>
        <button
          className="game-buttons"
          onClick={() => {
            sessionStorage.removeItem("token");
            window.location.assign("/");
          }}
        >
          Log out
        </button>

        {endGameMessage || errorMessage ? (
          <button onClick={restart} className="game-buttons">
            Play again!
          </button>
        ) : null}

        {errorMessage ? (
          <p style={{ color: "red" }}>
            Error: {errorMessage}. Please click on "Play again" or refresh this
            page
          </p>
        ) : null}
      </div>
    </>
  );
}
