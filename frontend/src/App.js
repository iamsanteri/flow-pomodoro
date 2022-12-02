import './css/App.css';
import React, { useState } from 'react';

function App() {
  var desiredMinutes = 30;
  
  const [timeNow, setTimeNow] = useState(Math.round(new Date().getTime() / 1000));
  const [timeThen, setTimeThen] = useState(Math.round(new Date().getTime() / 1000 + (60 * desiredMinutes)));
  const [timeLeft, setTimeLeft] = useState(timeThen - timeNow);
  const [disabled, setDisabled] = useState(false);
  const [startNotPossible, setStartNotPossible] = useState(false);

  function timerStart() {
    var temptimeNow = Math.round(new Date().getTime() / 1000)
    var temptimeThen = Math.round(new Date().getTime() / 1000 + (60 * desiredMinutes))
    var temptimeLeft = temptimeThen - temptimeNow;
    setDisabled(true);
    setUpTimeTicker(temptimeNow, temptimeThen, temptimeLeft);
  }

  function resetTimeTicker() {
    var temptimeNow = Math.round(new Date().getTime() / 1000)
    var temptimeThen = Math.round(new Date().getTime() / 1000 + (60 * desiredMinutes))
    var temptimeLeft = temptimeThen - temptimeNow;
    setTimeNow(temptimeNow);
    setTimeThen(temptimeThen);
    setTimeLeft(temptimeLeft);
    setDisabled(false);
    setStartNotPossible(false);
    clearInterval(window.ticker);
  }

  function pauseTimer() {
    clearInterval(window.ticker);
    setDisabled(false);
    setStartNotPossible(true);
  }

  function timerContinue() {
    var temptimeNow = Math.round(new Date().getTime() / 1000)
    var temptimeThen = (temptimeNow + timeLeft);
    setUpTimeTicker(temptimeNow, temptimeThen, timeLeft);
    setDisabled(true);
    setStartNotPossible(false);
  }

  function setUpTimeTicker(tempTimeNow, tempTimeThen, tempTimeLeft) {
    setTimeNow(tempTimeNow);
    setTimeThen(tempTimeThen);
    setTimeLeft(tempTimeLeft);

    window.ticker = setInterval(function() {
      let checkTick = tempTimeThen - Math.round(new Date().getTime() / 1000)
      setTimeLeft(checkTick);
      if (tempTimeLeft <= 0) {
        clearInterval(window.ticker);
      }
    }, 250)
  }

  if (!disabled && !startNotPossible) {
    var button_one = <button onClick={ timerStart } disabled={ disabled }>Start</button>;
  }

  if (!disabled && startNotPossible) {
    var button_two = <button onClick={ timerContinue } disabled={ disabled }>Continue</button>;
  }

  if (disabled && !startNotPossible) {
    var button_three =  <button onClick={ pauseTimer } disabled={ !disabled }>Pause</button>;
  }

  if (!disabled && startNotPossible) {
    var button_four = <button onClick={ resetTimeTicker } disabled={ !startNotPossible }>Reset</button>;
  }

  return (
    <div className="App">
      <h1>Santeri's Pomodoro App</h1>
      <h3>{ Math.floor(timeLeft / 60) }:{ (timeLeft % 60).toString().padStart(2, "0") }</h3>
      <br />
      { button_one }
      { button_two }
      { button_three }
      { button_four }
    </div>
  );
}

export default App;
