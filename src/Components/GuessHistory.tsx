import React from 'react'
//@ts-ignore
import {Table, Thead, Tbody, Tr, Td, Th} from 'react-super-responsive-table'
import {stringify} from 'query-string'
import {Question} from '../hooks/useVerbQuestion'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const wordReferenceUrl = (infinitive: any) => {
  const query = stringify({
    v: infinitive,
  })

  return `https://www.wordreference.com/conj/FrVerbs.aspx?${query}`
}

export type VerbQuestionHistoryItem = {
  question: Question
  guess: string
  isCorrect: boolean
}

export type GuessHistoryProps = {
  history: VerbQuestionHistoryItem[]
}

const GuessHistory = ({history = []}: GuessHistoryProps): JSX.Element => {
  return (
    <div id="revision-view">
      <Table className="table table-striped">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Verbe</Th>
            <Th>Mode/Temps</Th>
            <Th>Pronom</Th>
            <Th>Solution</Th>
            <Th>Réponse</Th>
            <Th>Correct?</Th>
          </Tr>
        </Thead>
        <Tbody>
          {history.map(({question, guess, isCorrect}, index) => {
            return (
              <Tr key={index} className={isCorrect ? 'guess-correct' : 'guess-incorrect'}>
                <Td>{history.length - index}</Td>
                <Td>
                  <a href={wordReferenceUrl(question.infinitive)} target="_blank" rel="noopener noreferrer">
                    <span role="img" aria-label="external link">
                      🔗
                    </span>{' '}
                    {question.infinitive}
                  </a>
                </Td>
                <Td>{question.tense}</Td>
                <Td>{question.pronoun.pronoun}</Td>
                <Td>{question.pronoun.answer}</Td>
                <Td>{guess}</Td>
                <Td>{isCorrect ? 'Yes' : 'No'}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </div>
  )
}

export default GuessHistory
