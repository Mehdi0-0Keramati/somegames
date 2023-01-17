import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Styles from "./index.module.css";
const WordHunt = () => {

    const [data, setData] = useState([
        {
            word: "addition",
            hint: "The process of adding numbers"
        },
        {
            word: "meeting",
            hint: "Event in which people come together"
        },
        {
            word: "number",
            hint: "Math symbol used for counting"
        },
        {
            word: "exchange",
            hint: "The act of trading"
        },
        {
            word: "canvas",
            hint: "Piece of fabric for oil painting"
        },
        {
            word: "garden",
            hint: "Space for planting flower and plant"
        },
        {
            word: "position",
            hint: "Location of someone or something"
        },
        {
            word: "feather",
            hint: "Hair like outer covering of bird"
        },
        {
            word: "comfort",
            hint: "A pleasant feeling of relaxation"
        },
        {
            word: "tongue",
            hint: "The muscular organ of mouth"
        },
        {
            word: "expansion",
            hint: "The process of increase or grow"
        },
        {
            word: "country",
            hint: "A politically identified region"
        },
        {
            word: "group",
            hint: "A number of objects or persons"
        },
        {
            word: "taste",
            hint: "Ability of tongue to detect flavour"
        },
        {
            word: "store",
            hint: "Large shop where goods are traded"
        },
        {
            word: "field",
            hint: "Area of land for farming activities"
        },
        {
            word: "friend",
            hint: "Person other than a family member"
        },
        {
            word: "pocket",
            hint: "A bag for carrying small items"
        },
        {
            word: "needle",
            hint: "A thin and sharp metal pin"
        },
        {
            word: "expert",
            hint: "Person with extensive knowledge"
        },
        {
            word: "statement",
            hint: "A declaration of something"
        },
        {
            word: "second",
            hint: "One-sixtieth of a minute"
        },
        {
            word: "library",
            hint: "Place containing collection of books"
        },
    ])

    const [answer, setAnswer] = useState()
    const [hint, setHint] = useState()
    const [wordSplit, setWordSplit] = useState()
    const [check, setCheck] = useState("")
    let [timeCount, setTimeCount] = useState(30)

    useEffect(() => {
        initGame()
    }, [])

    useEffect(() => {
        if (timeCount <= 0) {
            initGame()
        }
    })

    useEffect(() => {
        let interval = setInterval(() => {
            if (timeCount > 0) {
                setTimeCount(timeCount = timeCount - 1)
            }
            if (timeCount < 10) {
                setTimeCount(prev => "0" + prev)
            }
        }, 1000);
        if (timeCount <= 0) {
            setTimeCount(30)
            Swal.fire({
                title: 'Time Done',
                text: `Time Done correct answer is ${answer}`,
                icon: 'info',
            })
        }

        return () => {
            clearInterval(interval)
        }
    })

    function initGame() {
        let randomObj = data[Math.floor(Math.random() * data.length)]
        let word = randomObj.word
        let hint = randomObj.hint
        let wordSplit = word.split("")

        for (let i = wordSplit.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let temp = wordSplit[i];
            wordSplit[i] = wordSplit[j];
            wordSplit[j] = temp
        }
        setAnswer(word)
        setHint(hint)
        setWordSplit(wordSplit)
    }



    function refresh() {
        initGame()
        setTimeCount(30)
    }

    function checkWord() {

        if (check == '') {
            Swal.fire({
                title: 'Empty input!!',
                text: `try your luck`,
                icon: 'info',
            })

        } else {
            setTimeCount(30)
            if (answer.toLowerCase() == check.toLowerCase()) {
                Swal.fire({
                    title: 'congratulation',
                    text: `you're answer is correct`,
                    icon: 'success',
                })
                setCheck('')
                initGame()
            } else {
                Swal.fire({
                    title: 'incorrect answer',
                    text: `you're answer incorrect correct answer is ${answer}`,
                    icon: 'error',
                })
                setCheck('')
                initGame()
            }

        }
    }

    return (
        <>
            <section className={Styles.container_wordHunt}>
                <div className={Styles.inside}>

                    <div className={Styles.header_wordHunt}>
                        <h3>Word Scramble</h3>

                    </div>
                    <div className={Styles.box_wordHunt}>
                        <h1>{wordSplit}</h1>
                        <p className={Styles.hint}><h4 style={{ display: "inline", color: 'purple' }}> Hint: </h4>{hint}</p>
                        <div className={Styles.timeLeft}><h4 style={{ display: 'inline', color: 'purple' }}>TimeLeft: </h4>{timeCount}</div>
                        <input onKeyPress={(e) => e.key == "Enter" ? checkWord() : null} value={check} onChange={e => setCheck(e.target.value)} type='text' placeholder="Enter a valid word" />
                    </div>
                    <div className={Styles.buttons}>
                        <button onClick={refresh} className={Styles.refresh_word}>Refresh Word</button>
                        <button onClick={checkWord} className={Styles.check_word}>Check Word</button>
                    </div>

                </div>
            </section>
        </>
    );


}

export default WordHunt;