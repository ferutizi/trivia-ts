import './Questions.css'
import { useEffect, useState } from 'react'
import { type Question } from '../types'

const Questions = (): JSX.Element => {
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
    <div className='question'>
      <p className='question__points'>{points}</p>
      {questions.map(item =>
        <div key={item.id} className='question__container'>
          <h3 className='question__category'>{item.category}</h3>
          <p className='question__question'>{item.question}</p>
          <ul className='question__answers answers'>
            {answers.map((i: string, index: any) =>
              <div key={index} onClick={() => { selectedAnswer === 0 && isCorrectAnswer(item, i) }} className='answers__container'>
                <p className='answers__answer'>{i}</p>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Questions
