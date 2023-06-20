export interface Question {
  category: string
  id: string
  tags: [
    string,
    string,
    string,
    string
  ]
  difficulty: string
  regions: [
    string
  ]
  isNiche: boolean
  question: string
  correctAnswer: string
  incorrectAnswers: [
    string,
    string,
    string
  ]
  type: string
}

export interface Answers {
  answers: string[]
}
