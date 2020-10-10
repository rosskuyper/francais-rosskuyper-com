import React from 'react'
import {Question} from '../hooks/useVerbQuestion'

type QuestionProps = {
  question: Question
}

const QuestionBlock = ({question}: QuestionProps): JSX.Element => {
  return (
    <div id="question-view">
      <h1>{`${question.tense} - ${question.pronoun.pronoun} - ${question.infinitive}`}</h1>
    </div>
  )
}

export default QuestionBlock
