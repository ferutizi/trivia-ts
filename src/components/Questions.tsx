import './Questions.css'
import { type Question } from '../types'

interface QuestionProps {
  questions: Question[]
  answers: string[]
  points: number
  selectedAnswer: number
  isCorrectAnswer: (question: Question, answerSelected: string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  currentQuestion: number
  challenge: boolean
  mute: boolean
  setMute: React.Dispatch<React.SetStateAction<boolean>>
  returnToMenu: () => void
}

const Questions = (props: QuestionProps): JSX.Element => {
  return (
    <div className='question'>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: `${props.challenge ? 'space-between' : 'right'}` }}>
        {props.challenge && <p className='question__game'>Question {props.currentQuestion}/10</p>}
        <p className='question__game'>{props.points}⭐️</p>
      </div>
      {props.questions.map(item =>
        <div key={item.id} className='question__container'>
          <h3 className='question__category'>{item.category}</h3>
          <p className='question__question'>{item.question}</p>
          <ul className='question__answers answers'>
            {props.answers.map((i: string, index: any) =>
              <div key={index} onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => { props.selectedAnswer === 0 && props.isCorrectAnswer(item, i, e) }} className='answers__container'>
                {i}
              </div>
            )}
          </ul>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <img
          style={{ width: '60px', cursor: 'pointer' }}
          onClick={() => { props.setMute(!props.mute) }}
          src={require(`../images/${props.mute ? 'mute' : 'unmute'}.png`)}
        />
        <img
          style={{ width: '60px', cursor: 'pointer' }}
          onClick={() => { props.returnToMenu() }}
          src={require('../images/home.png')}
        />
      </div>
    </div>
  )
}

export default Questions
