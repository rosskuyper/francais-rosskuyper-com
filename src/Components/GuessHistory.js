import React, { Component } from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "react-super-responsive-table";
import { stringify } from "query-string";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const wordReferenceUrl = (infinitive) => {
  const query = stringify({
    v: infinitive,
  });

  return `https://www.wordreference.com/conj/FrVerbs.aspx?${query}`;
};

class GuessHistory extends Component {
  render() {
    const { history } = this.props;

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
            {history.map(({ question, guess, isCorrect }, index) => {
              return (
                <Tr
                  key={index}
                  className={isCorrect ? "guess-correct" : "guess-incorrect"}
                >
                  <Td>{history.length - index}</Td>
                  <Td>
                    <a
                      href={wordReferenceUrl(question.infinitive)}
                      target="_blank"
                    >
                      🔗 {question.infinitive}
                    </a>
                  </Td>
                  <Td>{question.tense}</Td>
                  <Td>{question.pronoun.pronoun}</Td>
                  <Td>{question.pronoun.answer}</Td>
                  <Td>{guess}</Td>
                  <Td>{isCorrect ? "Yes" : "No"}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>
    );
  }
}

GuessHistory.defaultProps = {
  history: [],
};

export default GuessHistory;
