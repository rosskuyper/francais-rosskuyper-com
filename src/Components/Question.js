import React, { Component } from "react";

class Question extends Component {
  render() {
    return (
      <div id="question-view">
        <h1>
          {this.props.question.infinitive} - {this.props.question.tense} -{" "}
          {this.props.pronoun.pronoun}
        </h1>
        <p>{this.props.pronoun.english}</p>
      </div>
    );
  }
}

Question.defaultProps = {
  question: "",
  pronoun: {},
};

export default Question;
