import React, { Component } from "react";
import { Table, Thead, Tbody, Tr, Th } from "react-super-responsive-table";
import RevisionRow from "./RevisionRow";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

class Revision extends Component {
  render() {
    let rows = [];
    this.props.data.tenses[0].pronouns.forEach((pronoun, id) => {
      rows.push(
        <RevisionRow key={id} data={this.props.data} pronounIndex={id} />
      );
    });

    return (
      <div id="revision-view">
        <Table className="table table-striped">
          <Thead>
            <Tr>
              {/* Tense order matters and is set within the data */}
              <Th>Pronoun</Th>
              <Th>Present</Th>
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
          <Tbody>{rows}</Tbody>
        </Table>
      </div>
    );
  }
}

Revision.defaultProps = {
  data: [],
  showRevisionTable: false,
};

export default Revision;
