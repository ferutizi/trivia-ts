import Modal from './components/Modal'
import Questions from './components/Questions'
import { type Question } from './types'
import { useState, useEffect } from 'react'

function App (): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0)
  const [points, setPoints] = useState<number>(0)
  const [modalState, setModalState] = useState<boolean>(true)
  const [challenge, setChallenge] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(1)

  useEffect(() => {
    void getQuizz()
  }, [])

  const getQuizz = async (): Promise<void> => {
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
    setModalState(false)
    isChallenge ? setChallenge(true) : setChallenge(false)
  }

  const isCorrectAnswer = (question: Question, answerSelected: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    setSelectedAnswer(selectedAnswer + 1)
    if (answerSelected === question.correctAnswer) {
      (e.target as HTMLDivElement).classList.add('correct')
      setPoints(points + 1)
    } else {
      (e.target as HTMLDivElement).classList.add('incorrect')
    }
    setTimeout(() => {
      void getQuizz()
    }, 1000)
  }

  return (
    <>
      <h1 style={{ marginBottom: '0' }}>Quiz</h1>
      <Modal modalState={modalState}>
        <div className='modal__container'>
          <h2 className='modal__title'>Quiz Game</h2>
          <div className='modal__options'>
            <button className='modal__button' onClick={() => { play(false) }}>Free Play</button>
            <button className='modal__button' onClick={() => { play(true) }}>Challenge 10⭐️</button>
          </div>
        </div>
      </Modal>
      <Questions questions={questions} answers={answers} points={points} selectedAnswer={selectedAnswer} isCorrectAnswer={isCorrectAnswer} currentQuestion={currentQuestion} challenge={challenge} />
    </>
  )
}

export default App
