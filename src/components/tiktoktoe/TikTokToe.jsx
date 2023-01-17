import { useState, useEffect, useRef } from "react";

import "./index.css";
import Square from "./Square";

const TikTokToe = () => {
    const [patterns] = useState([
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]);
    const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
    const [player, setPlayer] = useState("O");
    const [result, setResult] = useState({ winner: "none", state: "none" });
    const [xCount, setXCount] = useState(0);
    const [oCount, setOCount] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [NamePlayerOne, setNamePlayerOne] = useState("");
    const [NamePlayerTwo, setNamePlayerTwo] = useState("");
    const squareRef1 = useRef();
    const squareRef2 = useRef();
    const squareRef3 = useRef();
    const squareRef4 = useRef();
    const squareRef5 = useRef();
    const squareRef6 = useRef();
    const squareRef7 = useRef();
    const squareRef8 = useRef();
    const squareRef9 = useRef();

    //?call checkWin and check draw function and  change Player

    useEffect(() => {
        checkWin();
        checkDraw();
        if (player == "X") {
            setPlayer("O");
        } else {
            setPlayer("X");
        }
    }, [board]);

    //?call checkWin and check draw function and change Player

    //! add Winner Count

    useEffect(() => {
        if (result.state != "none") {
            if (result.winner == "X") {
                setXCount(xCount + 1);
            } else if (result.winner == "O") {
                setOCount(oCount + 1);
            }
        }
    }, [result]);

    //! add Winner Count

    // todo onclick function board

    function chooseSquare(square) {
        setBoard(
            board.map((val, idx) => {
                if (idx == square && val == "") {
                    const allSquare = document.querySelectorAll(".cell");
                    allSquare[idx].classList.add("x");
                    allSquare[idx].classList.add("o");
                    allSquare[idx].classList.add("disable");
                    return player;
                }
                return val;
            })
        );
    }

    // todo onclick function board

    //! check how in winner

    function checkWin() {
        patterns.forEach((currPattern) => {
            let firstPlayer = board[currPattern[0]];

            if (firstPlayer == "") return;
            let foundWinningPattern = true;

            currPattern.forEach((idx) => {
                if (board[idx] != firstPlayer) {
                    foundWinningPattern = false;
                }
            });
            if (foundWinningPattern) {
                setResult({ winner: player, state: "won" });
            }
        });
    }

    //! check how in winner

    //* check how in winner

    function checkDraw() {
        let filled = true;
        board.forEach((square) => {
            if (square == "") {
                filled = false;
            }
        });
        if (filled) {
            setResult({ winner: "no one", state: "draw" });
        }
    }

    //* check how in winner

    // todo handel restart function

    function restart() {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setPlayer("O");
        setResult({ winner: "none", state: "none" });
        squareRef1.current.classList.remove("o");
        squareRef1.current.classList.remove("x");
        squareRef1.current.classList.remove("disable");
        squareRef2.current.classList.remove("o");
        squareRef2.current.classList.remove("x");
        squareRef2.current.classList.remove("disable");
        squareRef3.current.classList.remove("o");
        squareRef3.current.classList.remove("x");
        squareRef3.current.classList.remove("disable");
        squareRef4.current.classList.remove("o");
        squareRef4.current.classList.remove("x");
        squareRef4.current.classList.remove("disable");
        squareRef5.current.classList.remove("o");
        squareRef5.current.classList.remove("x");
        squareRef5.current.classList.remove("disable");
        squareRef6.current.classList.remove("o");
        squareRef6.current.classList.remove("x");
        squareRef6.current.classList.remove("disable");
        squareRef7.current.classList.remove("o");
        squareRef7.current.classList.remove("x");
        squareRef7.current.classList.remove("disable");
        squareRef8.current.classList.remove("o");
        squareRef8.current.classList.remove("x");
        squareRef8.current.classList.remove("disable");
        squareRef9.current.classList.remove("o");
        squareRef9.current.classList.remove("x");
        squareRef9.current.classList.remove("disable");
    }

    // todo handel restart function

    //? winnerCounter handel className

    function addClassWinnerCounter() {
        if (result.winner == "X") {
            return "winner_counter xClass";
        } else if (result.winner == "O") {
            return "winner_counter oClass";
        }
        return "winner_counter";
    }

    //? winnerCounter handel className

    //! board pointerEvents handler
    function boardDisable() {
        if (result.state != "none" || !playing) {
            return { pointerEvents: "none" };
        } else {
            return { pointerEvents: "auto" };
        }
    }
    //! board pointerEvents handler
    // todo set name Players
    useEffect(() => {
        if (playing) {
            if (NamePlayerOne == "") {
                while (!promptPlayerOne) {
                    var promptPlayerOne = prompt("نام بازیکن اول را وارد کنید!!", "X");
                }
                setNamePlayerOne(promptPlayerOne);
            }
            if (NamePlayerTwo == "") {
                while (!promptPlayerTwo) {
                    var promptPlayerTwo = prompt("نام بازیکن دوم را وارد کنید!!", "O");
                }

                setNamePlayerTwo(promptPlayerTwo);
            }
        }
    }, [playing]);

    function changePlayerName() {
        while (!changePlayerNameOne) {
            var changePlayerNameOne = prompt("نام بازیکن اول را وارد کنید!!", "X");
        }
        setNamePlayerOne(changePlayerNameOne);

        while (!changePlayerNameTwo) {
            var changePlayerNameTwo = prompt("نام بازیکن دوم را وارد کنید!!", "O");
        }
        setNamePlayerTwo(changePlayerNameTwo);
    }

    // todo set name Players

    return (
        <section className="tiktoktoeContainer">
            <div className="boardContainer">
                {/* startGame Button*/}
                <button
                    className={playing ? "disableStartGame" : "startGame"}
                    onClick={() => setPlaying(true)}
                >
                    شروع بازی
                </button>
                {/* startGame Button*/}

                {/*topBoard display */}

                {playing ? (
                    <>
                        <div className="topBoard">
                            <h4>یعنی کی میبره؟</h4>

                            {/* change name player */}
                            <div
                                className="changePlayerName"
                                onClick={() => changePlayerName()}
                            >
                                تغییر نام کاربران
                            </div>
                            {/* change name player */}

                            {/* winner Counter */}
                            <div className={addClassWinnerCounter()}>
                                <div className="border_winner"></div>
                                <div>
                                    <span>{NamePlayerOne} </span> (X) : {xCount}
                                </div>
                                <div>
                                    <span>{NamePlayerTwo} </span> (O) : {oCount}
                                </div>
                            </div>
                            <div className="buttonbox">
                                <button
                                    className="resetScore"
                                    onClick={() => setXCount(0) || setOCount(0)}
                                >
                                    صفر کردن امتیاز ها
                                </button>
                                {/* winner Counter */}

                                <button className="restart" onClick={restart}>
                                    شروع دوباره
                                </button>
                            </div>

                        </div>

                        {/* show how is Winner */}
                        {result.state != "none" ? (
                            <>
                                <div className="textWinner">
                                    <bdo dir="rtl">
                                        {result.state != "draw" && result.state != "none"
                                            ? `بازیکن ${result.winner == "X" ? NamePlayerOne : NamePlayerTwo
                                            }  برد!!`
                                            : ""}
                                    </bdo>
                                    <bdo dir="rtl">
                                        {result.state != "won" && result.state != "none"
                                            ? `مساوی شد`
                                            : ""}
                                    </bdo>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                        {/* show how is Winner */}
                    </>
                ) : (
                    ""
                )}

                {/*topBoard display */}

                {/* Board display */}
                <div
                    className={player == "X" ? "board x" : "board o"}
                    style={boardDisable()}
                >
                    <div ref={squareRef1} className="cell">
                        <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
                    </div>
                    <div ref={squareRef2} className="cell">
                        <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
                    </div>
                    <div ref={squareRef3} className="cell">
                        <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
                    </div>
                    <div ref={squareRef4} className="cell">
                        <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
                    </div>
                    <div ref={squareRef5} className="cell">
                        <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
                    </div>
                    <div ref={squareRef6} className="cell">
                        <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
                    </div>
                    <div ref={squareRef7} className="cell">
                        <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
                    </div>
                    <div ref={squareRef8} className="cell">
                        <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
                    </div>
                    <div ref={squareRef9} className="cell">
                        <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
                    </div>
                </div>
                {/* Board display */}
            </div>
        </section>
    );
};

export default TikTokToe;