import React from 'react'
//@ts-ignore
import {Table, Thead, Tbody, Tr, Th} from 'react-super-responsive-table'
import RevisionRow from './RevisionRow'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

type RevisionProps = {
  data: any
}

const Revision = ({data}: RevisionProps): JSX.Element => {
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
          {data.tenses[0].pronouns.map((_pronoun: any, id: number) => {
            return <RevisionRow key={id} data={data} pronounIndex={id} />
          })}
        </Tbody>
      </Table>
    </div>
  )
}

export default Revision
