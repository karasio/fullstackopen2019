import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAll] = useState([])

  const handleGood = (newValue) => {
    setAll(allFeedback.concat("G"))
    setGood(newValue)
  }

  const handleNeutral = (newValue) => {
    setAll(allFeedback.concat("N"))
    setNeutral(newValue)
  }

  const handleBad = (newValue) => {
    setAll(allFeedback.concat("B"))
    setBad(newValue)
  }

  return (
      <div>
        <h1>Give feeback</h1>
        <Button handleClick={() => handleGood(good+1)} text='Good'/>
        <Button handleClick={() => handleNeutral(neutral+1)} text='Neutral'/>
        <Button handleClick={() => handleBad(bad+1)} text='Bad'/>
        <div>
          <Statistics allFeedback={allFeedback} good = {good} neutral={neutral} bad={bad}/>
        </div>
      </div>
  )
}

const Statistics = (props) => {
  if(props.allFeedback.length === 0) {
    return (
        <>
          <p>No feedback given</p>
        </>
    )
  }
  const calcAverage = () => {
    const goodValue = props.good
    const neutralValue = 0
    const badValue = -1 * props.bad
    const allValues = props.good+props.neutral+props.bad

    return (goodValue+neutralValue+badValue)/allValues
  }

  return (
      <div>
        <h1>Statistics</h1>
        <p>Good {props.good}</p>
        <p> Neutral {props.neutral} </p>
        <p>Bad {props.bad}</p>
        <p>Average {calcAverage()}</p>
        <p>Positive {props.good/(props.good+props.neutral+props.bad) *100}</p>
      </div>
  )
}


const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

ReactDOM.render(<App />,
    document.getElementById('root')
)