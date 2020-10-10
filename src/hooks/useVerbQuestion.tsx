import {useState} from 'react'
import verbData from '../data/verbs.json'
import {getRandomIndex} from '../utils/utils'

/**
 * All the question / verb types
 */
type Pronoun = {
  pronoun: string
  answer: string
}

type Tense = {
  name: string
  pronouns: Pronoun[]
}

type Verb = {
  infinitive: string
  tenses: Tense[]
}

type Question = {
  infinitive: string
  tense: string
  pronoun: Pronoun
  revisionData: Verb
}

/**
 * The existing "Question" structure is a bit odd.
 * This function wraps its construction which a lot of existing code already depends on.
 */
const getRandomQuestion = (): Question => {
  const verbIndex = getRandomIndex(0, verbData.verbs.length - 1)
  const tenseIndex = getRandomIndex(0, verbData.verbs[verbIndex].tenses.length - 1)
  const pronounIndex = getRandomIndex(0, verbData.verbs[verbIndex].tenses[tenseIndex].pronouns.length - 1)

  const questionData = {
    infinitive: verbData.verbs[verbIndex].infinitive,
    tense: verbData.verbs[verbIndex].tenses[tenseIndex].name,
    pronoun: verbData.verbs[verbIndex].tenses[tenseIndex].pronouns[pronounIndex],
    revisionData: verbData.verbs[verbIndex],
  }

  return questionData
}

export const useVerbQuestion = (): [Question, () => void] => {
  const [question, setState] = useState<Question>(getRandomQuestion())

  const nextQuestion = () => {
    return setState(getRandomQuestion())
  }

  return [question, nextQuestion]
}
