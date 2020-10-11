import {useState} from 'react'
import {Question, useVerbQuestion} from './useVerbQuestion'

export type VerbQuestionHistoryItem = {
  question: Question
  guess: string
  isCorrect: boolean
}

export type DrillState = {
  question: Question
  totalAnswered: number
  totalCorrect: number
  streak: number
  history: VerbQuestionHistoryItem[]
  previousCorrect: boolean | undefined
  previous: string | undefined
}

export type UseVerbDrillHook = [DrillState, (guess: string) => boolean]

export const useVerbDrill = (): UseVerbDrillHook => {
  const [question, nextQuestion] = useVerbQuestion()
  const [history, setHistory] = useState<VerbQuestionHistoryItem[]>([])
  const [totalAnswered, setTotalAnswered] = useState<number>(0)
  const [totalCorrect, setTotalCorrect] = useState<number>(0)
  const [streak, setStreak] = useState<number>(0)
  const [previousCorrect, setpreviousCorrect] = useState<boolean>()
  const [previous, setPrevious] = useState<string>()

  const logCorrectAnswer = () => {
    setTotalCorrect(totalCorrect + 1)
    setStreak(streak + 1)
    setpreviousCorrect(true)
    setPrevious(`${question.pronoun.pronoun} ${question.pronoun.answer}`)
    nextQuestion()
  }

  const logIncorrectAnswer = () => {
    setStreak(0)
    setpreviousCorrect(false)
    setPrevious('')
  }

  const logAnswer = (guess: string) => {
    const answer = question.pronoun.answer.toLowerCase()
    const isCorrect = answer === guess.toLowerCase().trim()

    setHistory([{question, guess, isCorrect}, ...history])
    setTotalAnswered(totalAnswered + 1)

    if (isCorrect) {
      logCorrectAnswer()
    } else {
      logIncorrectAnswer()
    }

    return isCorrect
  }

  const drillState = {
    question,
    history,
    totalAnswered,
    totalCorrect,
    streak,
    previousCorrect,
    previous,
  }

  return [drillState, logAnswer]
}
