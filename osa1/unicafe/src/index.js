import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  //const [allFeedback, setAll] = useState([])

  const handleGood = (newValue) => {
    //setAll(allFeedback.concat("G"))
    setGood(newValue)
  };

  const handleNeutral = (newValue) => {
    //setAll(allFeedback.concat("N"))
    setNeutral(newValue)
  };

  const handleBad = (newValue) => {
    //setAll(allFeedback.concat("B"))
    setBad(newValue)
  };

  return (
      <div>
        <h1>Give feeback</h1>
        <Button handleClick={() => handleGood(good+1)} text='Good'/>
        <Button handleClick={() => handleNeutral(neutral+1)} text='Neutral'/>
        <Button handleClick={() => handleBad(bad+1)} text='Bad'/>
        <div>
          <Statistics good = {good} neutral={neutral} bad={bad}/>
        </div>
      </div>
  )
};

const Statistics = ({bad, neutral, good}) => {
  const hasFeedback = () => bad > 0 || neutral > 0 || good > 0;
  const feedbackAmount = () => good+neutral+bad;

  if(!hasFeedback()) {
    return (
        <>
          <p>No feedback given</p>
        </>
    )
  }
  const calcAverage = () => {
    const goodValue = good;
    const neutralValue = 0;
    const badValue = -1 * bad;

    return (goodValue+neutralValue+badValue)/feedbackAmount()
  };

  const calcPositive = () => good/(feedbackAmount()) *100 + " %";

  return (
      <table>
        <thead><tr><th>Statistics</th></tr></thead>
        <tbody>
        <Statistic text="Good" value={good}/>
        <Statistic text="Neutral" value={neutral}/>
        <Statistic text="Bad" value={bad} />
        <Statistic text="All" value={feedbackAmount()} />
        <Statistic text="Average" value={calcAverage()}/>
        <Statistic text="Positive" value={calcPositive()} />
        </tbody>
      </table>
  )
};

const Statistic = (props) => (
    <tr>
      <td>{props.text} </td>
      <td>{props.value} </td>
    </tr>
);

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
);

ReactDOM.render(<App />,
    document.getElementById('root')
);