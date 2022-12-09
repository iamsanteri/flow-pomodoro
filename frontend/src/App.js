import React, { useState, useEffect } from 'react';
import { FlowTimer, RestTimer } from './Timers';
import Settings from './Settings';
import { flowDurationsMap, restDurationsMap } from './config/durationsConfig';
import TotalFlowCounter from './TotalFlowCounter';

import './css/App.css';

function App() {
  const [desiredFlowMinutes, setDesiredFlowMinutes] = useState(flowDurationsMap.flowOption1);
  const [desiredRestMinutes, setDesiredRestMinutes] = useState(restDurationsMap.restOption1);
  const [restingStateActive, setRestingStateActive] = useState(false);
  const [completedFlows, setCompletedFlows] = useState(0);
  const [stateMachine, setStateMachine] = useState("beforeStart");

  useEffect(() => {
    const retrievedFlows = JSON.parse(localStorage.getItem('completedFlows'));
    if (retrievedFlows) {
      setCompletedFlows(retrievedFlows);
      if (retrievedFlows > 0) {
        setStateMachine("interflow");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedFlows', JSON.stringify(completedFlows));
  }, [completedFlows]);

  useEffect(() => {
    const parsedFlowMinutes = JSON.parse(sessionStorage.getItem('desiredFlowMinutes'));
    const parsedRestMinutes = JSON.parse(sessionStorage.getItem('desiredRestMinutes'));
    if (parsedFlowMinutes && parsedRestMinutes) {
      setDesiredFlowMinutes(parsedFlowMinutes);
      setDesiredRestMinutes(parsedRestMinutes);
    } else {
      sessionStorage.setItem('desiredFlowMinutes', JSON.stringify(desiredFlowMinutes));
      sessionStorage.setItem('desiredRestMinutes', JSON.stringify(desiredRestMinutes));
    }
}, [desiredFlowMinutes, desiredRestMinutes]);

  function updateDurations(flowDuration, restDuration) {
    sessionStorage.setItem('desiredFlowMinutes', JSON.stringify(flowDuration));
    sessionStorage.setItem('desiredRestMinutes', JSON.stringify(restDuration));
    setDesiredFlowMinutes(flowDuration);
    setDesiredRestMinutes(restDuration);
  }

  function changeStateMachine(payload) {
    setStateMachine(payload);
  }

  function resetAllFlows() {
    setCompletedFlows(0);
  }

  function periodCompleted() {
    if (!restingStateActive) {
      setCompletedFlows(completedFlows + 1);
      setRestingStateActive(true);
    } else {
      setRestingStateActive(false);
    }
  }

  return (
    <div className="App">
      <h1>Santeri's Pomodoro App</h1>
      { !restingStateActive ?
      <FlowTimer
        stateMachine={stateMachine}
        desiredFlowMinutes={desiredFlowMinutes}
        changeStateMachine={changeStateMachine}
        restingStateActive={restingStateActive}
        resetAllFlows={resetAllFlows}
        periodCompleted={periodCompleted}
        completedFlows={completedFlows} /> :
      <RestTimer
        stateMachine={stateMachine}
        desiredRestMinutes={desiredRestMinutes} 
        changeStateMachine={changeStateMachine} 
        restingStateActive={restingStateActive}
        resetAllFlows={resetAllFlows}
        periodCompleted={periodCompleted}
        completedFlows={completedFlows} /> }
      <TotalFlowCounter 
        completedFlows={completedFlows} />
      <Settings
        desiredFlowMinutes={desiredFlowMinutes}
        desiredRestMinutes={desiredRestMinutes}
        updateDurations={updateDurations} />
    </div>
  );
}

export default App;
