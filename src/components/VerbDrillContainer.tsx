import React, {ChangeEvent, FormEvent, useState} from 'react'
import Question from './Question'
import Answer from './Answer'
import Stats from './Stats'
import Revision from './Revision'
import GuessHistory from './GuessHistory'
import {useVerbQuestion} from '../hooks/useVerbQuestion'

const VerbDrillContainer = (): JSX.Element => {
  const [question, nextQuestion] = useVerbQuestion()

  const [history, setHistory] = useState<any[]>([])
  const [totalAnswered, setTotalAnswered] = useState<number>(0)
  const [totalCorrect, setTotalCorrect] = useState<number>(0)
  const [streak, setStreak] = useState<number>(0)
  const [showRevision, setShowRevision] = useState<boolean>(false)
  const [previous, setPrevious] = useState<any | null>(null)
  const [guess, setGuess] = useState<string>('')

  const handleGuessChange = (event: ChangeEvent<HTMLInputElement>) => setGuess(event.target.value)

  /*
   * Check submitted answer against data, disregarding accents.
   */
  const checkAnswer = (event: FormEvent) => {
    event.preventDefault()

    const answer = question.pronoun.answer.toLowerCase()
    const isCorrect = answer === guess.toLowerCase().trim()

    setHistory([{question, guess, isCorrect}, ...history])
    setTotalAnswered(totalAnswered + 1)

    if (isCorrect) {
      setTotalCorrect(totalCorrect + 1)
      setStreak(streak + 1)
      setShowRevision(false)
      setPrevious(`${question.pronoun.pronoun} ${question.pronoun.answer}`)
      setGuess('')
      nextQuestion()
    } else {
      setStreak(0)
      setShowRevision(true)
      setPrevious(null)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div id="question-card" className="col-xs-11 col-centered">
          <div>
            <Question question={question} pronoun={question.pronoun} />
            <Answer
              previous={previous}
              pronoun={question.pronoun}
              checkAnswer={checkAnswer}
              handleAnswerChange={handleGuessChange}
              guess={guess}
            />
            <Stats totalAnswered={totalAnswered} totalCorrect={totalCorrect} streak={streak} />
          </div>
        </div>
        <div id="revision-card" className="col-xs-11 col-centered">
          {showRevision && <Revision data={question.revisionData} />}
        </div>

        <div id="history-card" className="col-xs-11 col-centered">
          <GuessHistory history={history} />
        </div>
      </div>
    </div>
  )
}

export default VerbDrillContainer
