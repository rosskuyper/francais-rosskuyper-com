import React, {ChangeEvent, Component, FormEvent} from 'react'
import Question from './Question'
import Answer from './Answer'
import Stats from './Stats'
import Revision from './Revision'
import GuessHistory from './GuessHistory'

import verbData from '../verbs.json'

type VerbDrillState = {
  data: any
  question: any
  history: any[]
  pronoun: any
  totalAnswered: number
  totalCorrect: number
  streak: number
  showRevision: boolean
  previous: any | null
  guess: string
}

class VerbDrillContainer extends Component {
  state: VerbDrillState

  constructor(props: any) {
    super(props)

    this.state = {
      data: verbData,
      question: this.getQuestion(verbData),
      history: [],
      pronoun: {},
      totalAnswered: 0,
      totalCorrect: 0,
      streak: 0,
      showRevision: false,
      previous: null,
      guess: '',
    }
  }

  /*
   * Display the question, answer and stats components
   */
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div id="question-card" className="col-xs-11 col-centered">
            <div>
              <Question question={this.state.question} pronoun={this.state.question.pronoun} />
              <Answer
                previous={this.state.previous}
                pronoun={this.state.question.pronoun}
                checkAnswer={this.checkAnswer}
                handleAnswerChange={this.handleAnswerChange}
                guess={this.state.guess}
              />
              <Stats
                totalAnswered={this.state.totalAnswered}
                totalCorrect={this.state.totalCorrect}
                streak={this.state.streak}
              />
            </div>
          </div>
          <div id="revision-card" className="col-xs-11 col-centered">
            {this.state.showRevision && <Revision data={this.state.question.revisionData} />}
          </div>

          <div id="history-card" className="col-xs-11 col-centered">
            <GuessHistory history={this.state.history} />
          </div>
        </div>
      </div>
    )
  }

  /*
   * Randomly select a new verb, tense and pronoun, and return a question object
   */
  getQuestion = (data: any) => {
    const verbIndex = this.getRandomIndex(0, data.verbs.length - 1)
    const tenseIndex = this.getRandomIndex(0, data.verbs[verbIndex].tenses.length - 1)
    const pronounIndex = this.getRandomIndex(0, data.verbs[verbIndex].tenses[tenseIndex].pronouns.length - 1)
    const questionData = {
      infinitive: data.verbs[verbIndex].infinitive,
      translation: data.verbs[verbIndex].translation,
      tense: data.verbs[verbIndex].tenses[tenseIndex].name,
      pronoun: data.verbs[verbIndex].tenses[tenseIndex].pronouns[pronounIndex],
      revisionData: data.verbs[verbIndex],
    }
    return questionData
  }

  /*
   * Return a random integer with max and min.  Used to select a question array index.
   */
  getRandomIndex = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      guess: event.target.value,
    })
  }

  /*
   * Check submitted answer against data, disregarding accents.
   */
  checkAnswer = (event: FormEvent) => {
    event.preventDefault()

    const {question} = this.state

    const answer = question.pronoun.answer.toLowerCase()
    const guess = this.state.guess.toLowerCase().trim()

    const isCorrect = guess === answer

    const history = [{question, guess, isCorrect}, ...this.state.history]

    if (isCorrect) {
      this.setState({
        totalAnswered: this.state.totalAnswered + 1,
        totalCorrect: this.state.totalCorrect + 1,
        streak: this.state.streak + 1,
        question: this.getQuestion(this.state.data),
        showRevision: false,
        previous: `${question.pronoun.pronoun} ${question.pronoun.answer}`,
        history,
        guess: '',
      })
    } else {
      this.setState({
        streak: 0,
        totalAnswered: this.state.totalAnswered + 1,
        showRevision: true,
        previous: null,
        history,
      })
    }
  }
}

export default VerbDrillContainer
