import React, {ChangeEventHandler, FormEventHandler} from 'react'
import {Pronoun} from '../hooks/useVerbQuestion'

type AnswerProps = {
  previous: string
  guess: string
  pronoun: Pronoun
  onAnswerSubmit: FormEventHandler
  handleAnswerChange: ChangeEventHandler
}

const Answer = (props: AnswerProps): JSX.Element => {
  return (
    <div>
      <form onSubmit={props.onAnswerSubmit}>
        <span className="pronoun">
          <p>{props.pronoun.pronoun}</p>
        </span>
        <span className="answerInput">
          <input
            onChange={props.handleAnswerChange}
            name="guess"
            type="text"
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            value={props.guess}
            autoFocus
          />
        </span>
      </form>

      {props.previous && (
        <p className="previousGuess">
          <span>Correct!</span> {props.previous}
        </p>
      )}
    </div>
  )
}

export default Answer
