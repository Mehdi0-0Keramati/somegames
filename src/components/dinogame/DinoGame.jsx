import { useState, useEffect, useRef } from "react"
import Swal from "sweetalert2"
import "./index.css"

const Dino = () => {

    const refCactus = useRef()
    const refDino = useRef()
    const [boardClass, setBoardClass] = useState("dinoboard opacity")
    const [dinoClass, setDinoClass] = useState("dino hide")
    const [startButtonClass, setStartButtonClass] = useState("startButton")
    const [cactusClass, setCactusClass] = useState("cactus")
    const [cactusHeight, setCactusHeight] = useState('50')
    const [cactusWidth, setCactusWidth] = useState('16')
    const [start, setStart] = useState(false)
    let [score, setScore] = useState(0)

    useEffect(() => {
        if (start) {
            var scoreinterval = setInterval(() => {
                setScore(score = score + 1)
            }, 100);

            var interval = setInterval(() => {
                if (
                    parseInt(window.getComputedStyle(refCactus.current).getPropertyValue("Left")) > 0 &&
                    parseInt(window.getComputedStyle(refCactus.current).getPropertyValue("Left")) < 20 &&
                    parseInt(window.getComputedStyle(refDino.current).getPropertyValue("Bottom")) < cactusHeight
                ) {
                    setStart(false)
                    setBoardClass('dinoboard opacity')
                    setStartButtonClass('startButton')
                    setDinoClass('hide')
                    setCactusClass('cactus')
                    setScore(0)
                    localStorage.setItem('PrevScore', score)
                    clearInterval(interval)
                    clearInterval(scoreinterval)
                    Swal.fire({
                        title: "you Lose!!!",
                        text: `you Lose you're score is ${score}`,
                        icon: "info"
                    })
                }

            }, 10);


            if (boardClass.includes("opacity")) {
                setDinoClass('hide')
            }
            setDinoClass('dino')
            setBoardClass('dinoboard')
            setStartButtonClass('hide')
            setCactusClass('cactus anime')

            document.body.addEventListener('click', jump)
            document.body.addEventListener('keypress', function (e) {
                if (e.keyCode == 32) {
                    jump()
                }
            })
            function jump() {
                setDinoClass("dino jump")

                setTimeout(() => {
                    setDinoClass("dino")
                }, 500);

                setTimeout(() => {
                    let minHeight = 25;
                    let maxHeight = 50;
                    let randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
                    setCactusHeight(randomHeight)

                    let minWidth = 16;
                    let maxWidth = 30;
                    let randomWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth)
                    setCactusWidth(randomWidth)

                }, 400);
            }
        }


        return () => {
            clearInterval(interval)
            clearInterval(scoreinterval)
        }
    }, [start])

    return (
        <section style={{ background: '#123' }} className={boardClass}>
            <button onClick={() => setStart(true)} className={startButtonClass}>Start Game</button>
            <div className="boxScores">
                <div>PrevScore:
                    <span style={{ color: 'crimson' }}>
                        {localStorage.getItem('PrevScore') ? localStorage.getItem('PrevScore') : 0}
                    </span>
                </div>
                <div>Score:<span style={{ color: "crimson" }}>{score}</span>
                </div>
            </div>

            <div style={{ height: cactusHeight + 'px', width: cactusWidth + 'px' }} ref={refCactus} className={cactusClass}></div>

            <div ref={refDino} className={dinoClass}>
                <div className="head"></div>
                <div className="rightfoot RightFootMove"></div>
                <div className="leftfoot LeftFootMove"></div>
                <div className="hand"></div>
            </div>
        </section>

    );
}

export default Dino;