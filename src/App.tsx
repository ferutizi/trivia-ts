import Menu from './components/Menu'
import Questions from './components/Questions'
import { type Question } from './types'
import { useState, useEffect } from 'react'
import useSound from 'use-sound'
import wrong from './sounds/wrong.mp3'
import correct from './sounds/correct.mp3'
import Endgame from './components/Endgame'

function App (): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0)
  const [points, setPoints] = useState<number>(0)
  const [menuState, setMenuState] = useState<boolean>(true)
  const [challenge, setChallenge] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(1)
  const [mute, setMute] = useState<boolean>(false)
  const [playWrong] = useSound(wrong)
  const [playCorrect] = useSound(correct)
  const [end, setEnd] = useState<boolean>(false)

  useEffect(() => {
    if (currentQuestion > 10) {
      setEnd(true)
    }
  }, [currentQuestion])

  const getQuizz = async (): Promise<void> => {
    if (currentQuestion > 10) return
    const res = await fetch('https://the-trivia-api.com/api/questions?limit=1')
    const data = await res.json()
    setQuestions(data)
    disorderAnswers(data[0].incorrectAnswers, data[0].correctAnswer)
    setSelectedAnswer(0)
    challenge && setCurrentQuestion(currentQuestion + 1)
  }

  const disorderAnswers = (incorrectAnswers: string[], correctAnswer: string): void => {
    incorrectAnswers.push(correctAnswer)
    const newAnswers = incorrectAnswers.sort((a, b) => {
      if (a > b) {
        return -1
      }
      if (b > a) {
        return 1
      }
      return 0
    })
    console.log(correctAnswer)
    setAnswers(newAnswers)
  }

  const play = (isChallenge: boolean): void => {
    void getQuizz()
    isChallenge ? setChallenge(true) : setChallenge(false)
    setTimeout(() => {
      setMenuState(false)
    }, 300)
  }

  const isCorrectAnswer = (question: Question, answerSelected: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setSelectedAnswer(selectedAnswer + 1)
    if (answerSelected === question.correctAnswer) {
      (e.target as HTMLDivElement).classList.add('correct')
      setPoints(points + 1)
      !mute && playCorrect()
    } else {
      (e.target as HTMLDivElement).classList.add('incorrect')
      !mute && playWrong()
    }
    setTimeout(() => {
      void getQuizz()
    }, 1000)
  }

  const reset = (): void => {
    setEnd(false)
    setPoints(0)
    setCurrentQuestion(1)
    void getQuizz()
  }

  const returnToMenu = (): void => {
    setPoints(0)
    setCurrentQuestion(0)
    setEnd(false)
    setMenuState(true)
  }

  return (
    <>
      <h1 style={{ marginBottom: '0', fontSize: '3em' }}>Quiz Game</h1>
      <Menu menuState={menuState}>
        <div className='menu__container'>
          <h2 className='menu__title'>Quiz Game</h2>
          <div className='menu__options'>
            <button className='menu__button' onClick={() => { play(false) }}>Free Play</button>
            <button className='menu__button' onClick={() => { play(true) }}>Challenge 10⭐️</button>
            <img
              style={{ width: '60px', cursor: 'pointer' }}
              onClick={() => { setMute(!mute) }}
              src={require(`./images/${mute ? 'mute' : 'unmute'}.png`)}
            />
          </div>
        </div>
      </Menu>
      <Endgame end={end}>
        <div className='menu__container'>
          <h2 className='menu__title'>Quiz Game</h2>
          <div>
            <p
              className='menu__text'
              style={{ color: `${points > 7 ? '#FFC200' : points > 3 ? 'green' : 'red'}` }}
            >{points > 7 ? 'You are awesome!' : points > 3 ? 'Well done' : 'You can improve it'}
            </p>
            <p className='menu__text'>{points}⭐️</p>
          </div>
          <div className='menu__options'>
            <button className='menu__button' onClick={() => { reset() }}>Reset challenge</button>
            <button className='menu__button' onClick={() => { returnToMenu() }}>Return to main menu</button>
            <img
              style={{ width: '60px' }}
              onClick={() => { setMute(!mute) }}
              src={require(`./images/${mute ? 'mute' : 'unmute'}.png`)}
            />
          </div>
        </div>
      </Endgame>
      <Questions
        questions={questions}
        answers={answers}
        points={points}
        selectedAnswer={selectedAnswer}
        isCorrectAnswer={isCorrectAnswer}
        currentQuestion={currentQuestion}
        challenge={challenge} mute={mute}
        setMute={setMute}
        returnToMenu={returnToMenu}
      />
    </>
  )
}

export default App
