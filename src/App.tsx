import { useEffect, useState } from 'react'
import { type Question } from './types'

function App (): JSX.Element {
  const [questions, setQuestions] = useState<Question[]>([])

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
          <div key={item.id}>
            <p>{item.category}</p>
            <p>{item.question}</p>
            <p>{item.correctAnswer}</p>
            {item.incorrectAnswers.map((i, index) =>
              <p key={index}>{i}</p>
            )}
          </div>
        )}
      </ul>
    </>
  )
}

export default App
