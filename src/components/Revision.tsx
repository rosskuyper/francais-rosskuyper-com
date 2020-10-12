import React from 'react'
//@ts-ignore
import {Table, Thead, Tbody, Tr, Td, Th} from 'react-super-responsive-table'
import {Verb} from '../hooks/useVerbQuestion'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

type RevisionProps = {
  verb: Verb
}

const Revision = ({verb}: RevisionProps): JSX.Element => {
  return (
    <div id="revision-view">
      <Table className="table table-striped">
        <Thead>
          <Tr>
            {/* Tense order matters and is set within the data */}
            <Th>Pronom</Th>
            <Th>Présent</Th>
            <Th>Imparfait</Th>
            <Th>Futur</Th>
            <Th>P. Composé</Th>
            <Th>Plus-que-parfait</Th>
            <Th>F. Antérieur</Th>
            <Th>Subj. Pres.</Th>
            <Th>Subj. Passé</Th>
            <Th>Cond. Pres.</Th>
            <Th>Cond. Passé</Th>
          </Tr>
        </Thead>
        <Tbody>
          {verb.tenses[0].pronouns.map((pronoun, tenseIndex) => {
            return (
              <Tr id={tenseIndex}>
                <Td>{pronoun.pronoun}</Td>

                {verb.tenses.map((tense, index) => {
                  return <Td key={index}>{tense.pronouns[tenseIndex].answer}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </div>
  )
}

export default Revision
