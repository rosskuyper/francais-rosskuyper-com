import React from 'react'
//@ts-ignore
import {Tr, Td} from 'react-super-responsive-table'

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

type RevisionRowProps = {
  data: any
  pronounIndex: number
}

const RevisionRow = ({data, pronounIndex}: RevisionRowProps): JSX.Element => {
  return (
    <Tr>
      <Td>{data.tenses[0].pronouns[pronounIndex].pronoun}</Td>

      {data.tenses.map((tense: any, index: number) => {
        return <Td key={index}>{tense.pronouns[pronounIndex].answer}</Td>
      })}
    </Tr>
  )
}

export default RevisionRow
