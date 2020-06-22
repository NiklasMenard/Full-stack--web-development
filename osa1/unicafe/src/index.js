import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const add = (a, b) =>
a + b

const StatisticLine = (props) => {
  const {text, value} = props

  if (text === 'positive'){
    return <p> {text} {value} % </p>
  }
  return (
  <p>
  {text} {value}
  </p>
  )
}

const Statistics = (props) => {

  console.log(props)

  const good = props.stats[0]
  const neutral = props.stats[1]
  const bad = props.stats[2]

  const sum = props.stats.reduce(add)
  const average = (good - bad) / sum
  const positive = (good / sum) * 100

  if(sum === 0){
    return (
      <p>
      No feedback given
      </p>
      )
  }

  return(

  <div>
    <h1>Statistics</h1>
    <table>
      <thead>
        <tr>
          <td> <StatisticLine text="good" value ={good} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="neutral" value ={neutral} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="bad" value ={bad} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="sum" value ={sum} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="average" value ={average} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="positive" value ={positive} /> </td>
        </tr>
      </thead>
    </table>
  </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
    {props.text}
    </button>
    )
}

const App = (props) => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  const stats = [good, neutral, bad]

  return (
    <div>

    <h1>Give feedback</h1>

    <Button
    handleClick={increaseGoodByOne}
    text='Good'
    />
    <Button
    handleClick={increaseNeutralByOne}
    text='Neutral'
    />     
    <Button
    handleClick={increaseBadByOne}
    text='Bad'
    /> 

    <Statistics stats = {stats}/>

    </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
  )

