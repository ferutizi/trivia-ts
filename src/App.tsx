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

  useEffect(() => {
    void getQuizz()
  }, [])

  const getQuizz = async (): Promise<void> => {
    const res = await fetch('https://the-trivia-api.com/api/questions?limit=1')
    const data = await res.json()
    setQuestions(data)
    disorderAnswers(data[0].incorrectAnswers, data[0].correctAnswer)
    setSelectedAnswer(0)
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

  const play = (): void => {
    setModalState(false)
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
        <div>
          <button onClick={() => { play() }}>Play</button>
        </div>
      </Modal>
      <Questions questions={questions} answers={answers} points={points} selectedAnswer={selectedAnswer} isCorrectAnswer={isCorrectAnswer} />
    </>
  )
}

export default App
