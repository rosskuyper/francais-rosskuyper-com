import React, { Component } from "react";
import { Tr, Td } from "react-super-responsive-table";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

class RevisionRow extends Component {
  render() {
    return (
      <Tr>
        <Td>
          {this.props.data.tenses[0].pronouns[this.props.pronounIndex].pronoun}
        </Td>

        {this.props.data.tenses.map((tense, index) => {
          return (
            <Td key={index}>
              {tense.pronouns[this.props.pronounIndex].answer}
            </Td>
          );
        })}
      </Tr>
    );
  }
}

RevisionRow.defaultProps = {
  data: [],
  pronounIndex: 0,
};

export default RevisionRow;
