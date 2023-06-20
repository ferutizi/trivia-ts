import { useEffect, useState } from 'react'
import { type Question } from './types'

function App (): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number>(0)
  const [points, setPoints] = useState<number>(0)

  useEffect(() => {
    void getQuizz()
    console.log(questions)
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

  const isCorrectAnswer = (question: Question, answerSelected: string): void => {
    setSelectedAnswer(selectedAnswer + 1)
    if (answerSelected === question.correctAnswer) {
      console.log(true)
      setPoints(points + 1)
    } else {
      console.log(false)
    }
    void getQuizz()
  }

  return (
    <>
      <h1>Trivia</h1>
      <p>{points}</p>
      <ul>
        {questions.map(item =>
          <div key={item.id}>
            <h3>{item.category}</h3>
            <p>{item.question}</p>
            {answers.map((i: string, index: any) =>
              <p key={index} onClick={() => { selectedAnswer === 0 && isCorrectAnswer(item, i) }}>{i}</p>
            )}
          </div>
        )}
      </ul>
    </>
  )
}

export default App
