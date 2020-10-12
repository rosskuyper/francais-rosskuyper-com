import React, {ChangeEvent, FormEvent, useState} from 'react'
import Answer from './Answer'
import Stats from './Stats'
import Revision from './Revision'
import GuessHistory from './GuessHistory'
import {useVerbDrill} from '../hooks/useVerbDrill'
import VerbDrillSettings from './VerbDrillSettings'

const VerbDrillContainer = (): JSX.Element => {
  // The verb drill hook handles getting a question and logging the previous guesses
  const [drillState, logAnswer] = useVerbDrill()
  const {question, history, totalAnswered, totalCorrect, streak, previousCorrect, previous} = drillState

  // Our UI component is responsible for what the user is actually typing
  const [guess, setGuess] = useState('')
  const handleGuessChange = (event: ChangeEvent<HTMLInputElement>) => setGuess(event.target.value)

  // Handle the form submission and pass through to drill hook
  const onAnswerSubmit = (event: FormEvent) => {
    event.preventDefault()

    const isCorrect = logAnswer(guess)

    if (isCorrect) {
      setGuess('')
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div id="question-card" className="col-xs-11 col-centered">
          <div>
            <div id="question-view">
              <div className="pull-right">
                <VerbDrillSettings />
              </div>
              <h1>{`${question.tense} - ${question.pronoun.pronoun} - ${question.infinitive}`}</h1>
            </div>

            <Answer
              previous={previous}
              pronoun={question.pronoun}
              onAnswerSubmit={onAnswerSubmit}
              handleAnswerChange={handleGuessChange}
              guess={guess}
            />
            <Stats totalAnswered={totalAnswered} totalCorrect={totalCorrect} streak={streak} />
          </div>
        </div>

        <div id="revision-card" className="col-xs-11 col-centered">
          {previousCorrect === false && <Revision verb={question.revisionData} />}
        </div>

        <div id="history-card" className="col-xs-11 col-centered">
          <GuessHistory history={history} />
        </div>
      </div>
    </div>
  )
}

export default VerbDrillContainer
