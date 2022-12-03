import './css/App.css';
import React, { useState } from 'react';
import PeriodCounter from './PeriodCounter.js';
import Buttons from './Buttons.js';

function App() {
  var desiredMinutes = 0.05;
  
  const [timeNow, setTimeNow] = useState(Math.round(new Date().getTime() / 1000));
  const [timeThen, setTimeThen] = useState(Math.round(new Date().getTime() / 1000 + (60 * desiredMinutes)));
  const [timeLeft, setTimeLeft] = useState(timeThen - timeNow);
  const [disabled, setDisabled] = useState(false);
  const [startNotPossible, setStartNotPossible] = useState(false);
  const [resetAllVisible, setResetAllVisible] = useState(false);
  const [periods, setPeriods] = useState(0);

  function timerStart() {
    var temptimeNow = Math.round(new Date().getTime() / 1000)
    var temptimeThen = Math.round(new Date().getTime() / 1000 + (60 * desiredMinutes))
    var temptimeLeft = temptimeThen - temptimeNow;
    setResetAllVisible(false);
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

  function resetWholeTimer() {
    setPeriods(0);
    resetTimeTicker();
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
    }, 250)
  }

  if (timeLeft === 0) {
    clearInterval(window.ticker);
    setTimeLeft("00");
    setPeriods(periods + 1);
    setDisabled(false);
    setStartNotPossible(true);
    setResetAllVisible(true);
    resetTimeTicker();
  }

  return (
    <div className="App">
      <h1>Santeri's Pomodoro App</h1>
      <h3>{ Math.floor(timeLeft / 60).toString().padStart(2, "0") }:{ (timeLeft % 60).toString().padStart(2, "0") }</h3>
      <br />
      <PeriodCounter periods={periods} />
      <br />
      <Buttons 
        disabled={disabled}
        startNotPossible={startNotPossible}
        resetAllVisible={resetAllVisible}
        timerStart={timerStart}
        resetTimeTicker={resetTimeTicker} 
        resetWholeTimer={resetWholeTimer}
        pauseTimer={pauseTimer} 
        timerContinue={timerContinue} />
      <br />
    </div>
  );
}

export default App;
