import React from 'react'

type QuestionProps = {
  question: any
  pronoun: any
}

const Question = ({question, pronoun}: QuestionProps): JSX.Element => {
  return (
    <div id="question-view">
      <h1>{`${question.tense} - ${pronoun.pronoun} - ${question.infinitive}`}</h1>
    </div>
  )
}

export default Question
