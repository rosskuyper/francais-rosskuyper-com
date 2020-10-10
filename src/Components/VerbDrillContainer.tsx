import React, {ChangeEvent, FormEvent, useState} from 'react'
import QuestionBlock from './Question'
import Answer from './Answer'
import Stats from './Stats'
import Revision from './Revision'
import GuessHistory, {VerbQuestionHistoryItem} from './GuessHistory'
import {useVerbQuestion} from '../hooks/useVerbQuestion'

const VerbDrillContainer = (): JSX.Element => {
  const [question, nextQuestion] = useVerbQuestion()

  const [history, setHistory] = useState<VerbQuestionHistoryItem[]>([])
  const [totalAnswered, setTotalAnswered] = useState<number>(0)
  const [totalCorrect, setTotalCorrect] = useState<number>(0)
  const [streak, setStreak] = useState<number>(0)
  const [showRevision, setShowRevision] = useState<boolean>(false)
  const [previous, setPrevious] = useState<string>('')
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
      setPrevious('')
    }
  }

  console.log(question.revisionData)

  return (
    <div className="container-fluid">
      <div className="row">
        <div id="question-card" className="col-xs-11 col-centered">
          <div>
            <QuestionBlock question={question} />
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
