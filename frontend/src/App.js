import React, { useState, useEffect } from 'react';
import { FlowTimer, RestTimer } from './Timers';
import Settings from './Settings';
import { flowDurationsMap, restDurationsMap } from './config/durationsConfig';
import TotalFlowCounter from './TotalFlowCounter';
import CompleteComp from './CompleteComp';
import './css/App.css';

function App() {
  const [desiredFlowMinutes, setDesiredFlowMinutes] = useState(flowDurationsMap.flowOption1);
  const [desiredRestMinutes, setDesiredRestMinutes] = useState(restDurationsMap.restOption1);
  const [restingStateActive, setRestingStateActive] = useState(false);
  const [completedFlows, setCompletedFlows] = useState(0);
  const [completedLargeSessions, setCompletedLargeSessions] = useState(0);
  const [showComplete, setShowComplete] = useState(false);
  const [stateMachine, setStateMachine] = useState("beforeStart");

  useEffect(() => {
    const retrievedFlows = JSON.parse(localStorage.getItem('completedFlows'));
    const retrievedLargeSessions = JSON.parse(localStorage.getItem('retrievedLargeSessions'));
    if (retrievedFlows) {
      setCompletedFlows(retrievedFlows);
      if (retrievedFlows > 0) {
        setStateMachine("interflow");
      }
    }
    if (retrievedLargeSessions) {
      setCompletedLargeSessions(retrievedLargeSessions);
    }
    const retrievedStatus = JSON.parse(sessionStorage.getItem('restingStateActive'));
    if (retrievedStatus) {
      setRestingStateActive(retrievedFlows);
    }

    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notifications");
    } else {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedFlows', JSON.stringify(completedFlows));
    localStorage.setItem('retrievedLargeSessions', JSON.stringify(completedLargeSessions));
    if (completedFlows === 4) {
      setShowComplete(true);
    }
  }, [completedFlows, completedLargeSessions]);

  useEffect(() => {
    sessionStorage.setItem('restingStateActive', JSON.stringify(restingStateActive));
  }, [restingStateActive]);

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
    setShowComplete(false);
    setRestingStateActive(false);
    setStateMachine("beforeStart");
  }

  function changeStateMachine(payload) {
    setStateMachine(payload);
  }

  function resetAllFlows() {
    setCompletedFlows(0);
    setCompletedLargeSessions(0);
    setRestingStateActive(false);
  }

  function periodCompleted() {
    if (!restingStateActive) {
      setCompletedFlows(completedFlows + 1);
      setRestingStateActive(true);
    } else {
      setRestingStateActive(false);
    }
  }

  function continueToNextSet() {
    setCompletedLargeSessions((completedLargeSessions) => completedLargeSessions + 1);
    periodCompleted(); 
    setCompletedFlows(0);
    setShowComplete(false);
    setRestingStateActive(false);
  }

  return (
    <div className="App">
      <h1>Santeri's Pomodoro App</h1>
      { showComplete ?
      <CompleteComp continueToNextSet={continueToNextSet} /> :
      <div>
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
      </div> }
        <TotalFlowCounter
          stateMachine={stateMachine}
          completedFlows={completedFlows}
          restingStateActive={restingStateActive}
          completedLargeSessions={completedLargeSessions} />
        <Settings
          desiredFlowMinutes={desiredFlowMinutes}
          desiredRestMinutes={desiredRestMinutes}
          updateDurations={updateDurations} />
    </div>
  );
}

export default App;
