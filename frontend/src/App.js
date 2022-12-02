import './css/App.css';
import React, { useState } from 'react';

function App() {
  var desiredMinutes = 30;
  
  const [timeNow, setTimeNow] = useState(Math.round(new Date().getTime() / 1000));
  const [timeThen, setTimeThen] = useState(Math.round(new Date().getTime() / 1000 + (60 * desiredMinutes)));
  const [timeLeft, setTimeLeft] = useState(timeThen - timeNow);
  const [disabled, setDisabled] = useState(false);

  function timerStart() {
    var temptimeNow = Math.round(new Date().getTime() / 1000)
    var temptimeThen = Math.round(new Date().getTime() / 1000 + (60 * desiredMinutes))
    var temptimeLeft = temptimeThen - temptimeNow;
    setDisabled(true);
    setUpTimeTicker(temptimeNow, temptimeThen, temptimeLeft);
  }

  function resetTimeTicker() {
    setTimeNow(Math.round(new Date().getTime() / 1000));
    setTimeThen(Math.round(new Date().getTime() / 1000 + (60 * desiredMinutes)));
    setTimeLeft(timeThen - timeNow);
    setDisabled(false);
    clearInterval(window.ticker);
  }

  function setUpTimeTicker(now, then, left) {
    setTimeNow(now);
    setTimeThen(then);
    setTimeLeft(left);

    window.ticker = setInterval(function() {
      let checkTick = then - Math.round(new Date().getTime() / 1000)
      setTimeLeft(checkTick);
      if (left <= 0) {
        clearInterval(window.ticker);
      }
    }, 250)
  }

  return (
    <div className="App">
      <h1>Santeri's Pomodoro App</h1>
      <h3>{ Math.floor(timeLeft / 60) }:{ (timeLeft % 60).toString().padStart(2, "0") }</h3>
      <br />
      <br />
      <button onClick={ timerStart } disabled={disabled}>Start</button>
      <button onClick={ resetTimeTicker }>Stop</button>
    </div>
  );
}

export default App;
