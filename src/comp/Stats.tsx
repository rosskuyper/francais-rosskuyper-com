import React from 'react'

type StatsProps = {
  totalAnswered: number
  totalCorrect: number
  streak: number
}

const Stats = (props: StatsProps): JSX.Element => {
  let percentage
  if (props.totalAnswered === 0) {
    percentage = 0
  } else {
    percentage = Math.round((props.totalCorrect / props.totalAnswered) * 100)
  }
  return (
    <div id="stats-view">
      <p className="stats">
        {props.totalCorrect} / {props.totalAnswered} ({percentage}%)
      </p>
      <p className="streak">Streak: {props.streak}</p>
    </div>
  )
}

export default Stats
