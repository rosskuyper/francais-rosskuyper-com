import React, {ChangeEvent, FormEvent, useState} from 'react'
import QuestionBlock from './Question'
import Answer from './Answer'
import Stats from './Stats'
import Revision from './Revision'
import GuessHistory from './GuessHistory'
import {useVerbDrill} from '../hooks/useVerbDrill'

const VerbDrillContainer = (): JSX.Element => {
  const [{question, history, totalAnswered, totalCorrect, streak, showRevision, previous}, logAnswer] = useVerbDrill()
  const [guess, setGuess] = useState<string>('')

  const handleGuessChange = (event: ChangeEvent<HTMLInputElement>) => setGuess(event.target.value)

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
            <QuestionBlock question={question} />
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
          {showRevision && <Revision verb={question.revisionData} />}
        </div>

        <div id="history-card" className="col-xs-11 col-centered">
          <GuessHistory history={history} />
        </div>
      </div>
    </div>
  )
}

export default VerbDrillContainer
