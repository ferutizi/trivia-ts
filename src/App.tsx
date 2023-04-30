import { useEffect, useState } from 'react'
import { type Question } from './types'

function App (): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([])
  /*   const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0]) */

  useEffect(() => {
    void getQuizz()
    console.log(questions)
  }, [])

  const getQuizz = async (): Promise<void> => {
    const res = await fetch('https://the-trivia-api.com/api/questions?limit=1')
    const data = await res.json()
    setQuestions(data)
    console.log(data)
  }

  return (
    <>
      <h1>Trivia</h1>
      <ul>
        {questions.map(item =>
          <p key={item.id}>{item.category}</p>
        )}
      </ul>
    </>
  )
}

export default App
