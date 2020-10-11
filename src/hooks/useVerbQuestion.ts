import {useState} from 'react'
import verbData from '../data/verbs.json'
import {getRandomIndex} from '../utils/utils'
import createPersistedState from 'use-persisted-state'

// Save and share settings across tabs / reloads
export const useVerbDrillPersistedState = createPersistedState('verbDrillsDisabledTenses')

/**
 * All the question / verb types
 */
export type Pronoun = {
  pronoun: string
  answer: string
}

export type VerbTense = {
  name: string
  pronouns: Pronoun[]
}

export type Verb = {
  infinitive: string
  tenses: VerbTense[]
}

export type Question = {
  infinitive: string
  tense: string
  pronoun: Pronoun
  revisionData: Verb
}

// enum with string literals as the tenses are defined in the data
export enum Tense {
  PRESENT = 'présent',
  IMPARFAIT = 'imparfait',
  PASSE_COMPOSE = 'passé composé',
  PLUS_QUE_PARFAIT = 'plus-que-parfait',
  FUTUR = 'futur',
  FUTUR_ANTÉRIEUR = 'futur antérieur',
  SUBJONCTIF_PRESENT = 'subjonctif présent',
  SUBJONCTIF_PASSE = 'subjonctif passé',
  CONDITIONNEL_PRESENT = 'conditionnel présent',
  CONDITIONNEL_PASSE = 'conditionnel passé',
}

/**
 * The existing "Question" structure is a bit odd.
 * This function wraps its construction which a lot of existing code already depends on.
 */
const getRandomQuestion = (disabledTenses: string[]): Question => {
  // Get a random verb
  const verbIndex = getRandomIndex(0, verbData.verbs.length - 1)

  // Now we need a random tense - but we need to remove tenses not allowed
  const allowedTenseIndices = verbData.verbs[verbIndex].tenses.reduce<number[]>((acc, val, idx) => {
    if (!disabledTenses.includes(val.name)) {
      acc.push(idx)
    }

    return acc
  }, [])

  const tenseIndex = allowedTenseIndices[getRandomIndex(0, allowedTenseIndices.length - 1)]
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
  const [disabledTenses] = useVerbDrillPersistedState<string[]>([])
  const [question, setState] = useState<Question>(getRandomQuestion(disabledTenses))

  const nextQuestion = () => {
    return setState(getRandomQuestion(disabledTenses))
  }

  if (disabledTenses.includes(question.tense)) {
    nextQuestion()
  }

  return [question, nextQuestion]
}
