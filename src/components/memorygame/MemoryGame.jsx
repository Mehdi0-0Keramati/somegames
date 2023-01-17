import "./index.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { shuffle } from "lodash";

const WordHunt = () => {
    const images = ['😂', '😈', '😜', '😅', '😘', '🚦', '🚕', '🚁', '😛', '😡', '😞', '😰', '😹', '🚈', '🚥', '🛀', '🖤', '🙉']
    const [cards, setCards] = useState(shuffle([...images, ...images]))
    const [ActiveCards, setActiveCards] = useState([])
    const [FoundPears, setFoundPears] = useState([])
    const [Clicks, setClicks] = useState(0)
    const [Won, setWon] = useState(false)
    const [FadeItem, setFadeItem] = useState("card")
    const [Shake, setShake] = useState(false)

    let [Sec, setSec] = useState(59)
    let [Min, setMin] = useState(4)
    let [Time, setTime] = useState("05:00")

    useEffect(() => {
        setFadeItem('card fade')
        setTimeout(() => {
            setFadeItem("card")

        }, 2000);
    }, []);

    useEffect(() => {

        var interval = setInterval(() => {
            setSec(Sec = Sec - 1)

            if (Sec < 10) {
                setSec(Sec = "0" + Sec)
            }

            if (Min == 4 || Min == 3 || Min == 2 || Min == 1) {
                if (Sec == 0) {
                    setSec(59)
                    setMin(Min = Min - 1)
                }
            }

        }, 1000);


        setTime("0" + Min + ":" + Sec)

        if (Min < 1) {
            if (Sec < 1) {
                Swal.fire({
                    title: 'Time Done',
                    text: `Time is done Try it again!! `,
                    icon: "info"
                })
                sameCode()
            }
        }
        if (Won) {
            sameCode()
            setWon(false)
            alertWon()
        }

        function sameCode() {
            clearInterval(interval)
            setMin(4)
            setSec(59)
            setCards(shuffle([...images, ...images]))
            setActiveCards([])
            setFoundPears([])
            setClicks(0)

            setFadeItem('card fade')

            setTimeout(() => {
                setFadeItem("card")
            }, 2000);


        }

        return () => {
            clearInterval(interval)
        }
    }, [Sec, Time])



    function flippedCard(index) {
        if (ActiveCards.length === 0) {
            setActiveCards([index])
        }
        if (ActiveCards.length === 1) {
            const first = ActiveCards[0]
            const second = index

            if (cards[first] === cards[second]) {
                if (FoundPears.length + 2 === cards.length) {
                    setWon(true)
                }
                setFoundPears([...FoundPears, first, second])

            }
            else {

                setTimeout(() => {
                    setActiveCards([])
                    navigator.vibrate(300)
                    setShake(true)
                }, 600);
            }
            setShake(false)
            setActiveCards([...ActiveCards, index])

        }
        if (ActiveCards.length === 2) {
            setActiveCards([index])
        }

        setClicks(Clicks + 1)
    }


    function alertWon() {
        Swal.fire({
            text: `you won the game with ${Clicks} clicks`,
            title: 'Won the game',
            icon: "success"
        })
    }

    return (
        <section className="memoryGameContainer">
            <div className="memoryGameBoard">

                <div className="header">

                    <h4>Clicks : <span style={{ color: "#76b1ed" }}>{Clicks}</span></h4>
                    <h4>TileLeft : <span style={{ color: "#76b1ed" }}>{Time}</span></h4>
                    <h4>FoundPears : <span style={{ color: "#76b1ed" }}>{FoundPears.length / 2}</span></h4>

                </div>
                {
                    cards.map((i, index) => {
                        {/* const flippedToRotate = ActiveCards.indexOf(index) !== -1 || FoundPears.indexOf(index) !== -1 */ }
                        return (
                            <div
                                key={index}
                                // className={flippedToRotate ? "flipped card-outer" : "card-outer"}
                                className={classNet(index)}
                                onClick={() => flippedCard(index)}
                            >

                                <div className={FadeItem}>

                                    <>
                                        <div className="front">
                                        </div>

                                        <div className="back">
                                            {i}
                                        </div>
                                    </>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );

    function classNet(index) {
        const flippedToRotate = ActiveCards.indexOf(index) !== -1 || FoundPears.indexOf(index) !== -1
        if (flippedToRotate) {
            return "card-outer flipped disable "
        }
        else if (Shake === true) {
            return "card-outer shake"
        }
        else {
            return "card-outer"
        }

    }
}

export default WordHunt;