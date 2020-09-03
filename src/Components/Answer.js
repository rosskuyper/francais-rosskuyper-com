import React, { Component } from "react";

class Answer extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.checkAnswer}>
          <span className="pronoun">
            <p>{this.props.pronoun.pronoun}</p>
          </span>
          <span className="answerInput">
            <input
              name="guess"
              type="text"
              autoCorrect="off"
              autoComplete="off"
              autoCapitalize="off"
              onTouchEnd={this.props.onTouchEnd}
              autoFocus
            />
          </span>
        </form>

        {this.props.previous && (
          <p className="previousGuess">
            <span>Correct!</span> {this.props.previous}
          </p>
        )}
      </div>
    );
  }
}

Answer.defaultProps = {
  question: "",
  pronoun: {},
};

export default Answer;
