import React, { Component } from "react";

class Question extends Component {
  render() {
    return (
      <div id="question-view">
        <h1>
          {`${this.props.question.tense} - ${this.props.pronoun.pronoun} - ${this.props.question.infinitive}`}
        </h1>
      </div>
    );
  }
}

Question.defaultProps = {
  question: "",
  pronoun: {},
};

export default Question;
