import { useState, useEffect, useRef } from "react"
import Swal from "sweetalert2"
import "./index.css"

const FlappyBird = () => {
    let [GameStart, setGameStart] = useState(false)
    let [StartButton, setStartButton] = useState("startButton")
    let [BirdPosition, setBirdPosition] = useState(140)
    let [HeightWall, setHeightWall] = useState(170)
    let [Score, setScore] = useState(0)
    let [wallClass, setwallClass] = useState('')
    const wallBottomRef = useRef()

    useEffect(() => {

        if (GameStart) {
            setStartButton('disable')
            if (parseInt(window.getComputedStyle(wallBottomRef.current).getPropertyValue('left')) < 16) {
                if (
                    BirdPosition >= parseInt(window.getComputedStyle(wallBottomRef.current).getPropertyValue('top'))
                    ||
                    HeightWall > BirdPosition
                ) {
                    setBirdPosition(470)
                }

            }

            if (BirdPosition < 470) {
                setwallClass('move')
                var interval = setInterval(() => {
                    setBirdPosition(prev => prev + 1)
                }, 12);
            } else {
                setBirdPosition(170)
                setScore(0)
                setGameStart(false)
                setwallClass('')
                setStartButton('startButton')
                Swal.fire({
                    title: 'u loze',
                    text: `you're score is ${Score}`,
                    icon: 'info'
                })
            }

            if (Score > 100) {
                Swal.fire({
                    title: 'congrag you won the game',
                    text: `you can get all the score`,
                    icon: 'info'
                })
                setBirdPosition(170)
                setScore(0)
                setGameStart(false)
                setwallClass('')
                setStartButton('startButton')
            }

            return () => {
                clearInterval(interval)
            }
        }

    }, [BirdPosition])


    function jump() {
        setBirdPosition(BirdPosition = BirdPosition - 30)
    }


    function anima() {
        let min = 190;
        let max = 210;
        let randomly = Math.floor(Math.random() * (max - min + 1) + min)
        setHeightWall(randomly)
        setScore(Score = Score + 1)
    }


    return (
        <>
            <section onClick={jump} className="game_box">
                <button onClick={() => setGameStart(true)} className={StartButton}>Start</button>
                <span className="score">
                    {Score / 2}
                </span>
                <span style={{ top: BirdPosition + 'px' }} className="bird"> </span>
                <span onAnimationIteration={anima} style={{ height: HeightWall + "px" }} className={`wallTop ${wallClass}`}></span>
                <span onAnimationIteration={anima} ref={wallBottomRef} style={{ height: HeightWall + "px" }} className={`wallBottom ${wallClass}`} ></span>
            </section>
        </>
    );

}
export default FlappyBird;
