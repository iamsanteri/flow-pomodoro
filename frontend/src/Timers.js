import React, { useState, useEffect } from 'react';
import ControlPad from './ControlPad';
import useSound from 'use-sound';
import ringSfx from './assets/sounds/ring.mp3';
import startSfx from './assets/sounds/start.mp3';
import switchSfx from './assets/sounds/switch.mp3';
import './css/Timers.css';

const timeUtils = {
    timeNow: function() {
        return Math.round(new Date().getTime() / 1000);
    },
    timeThen: function(desiredFlowMinutes, desiredRestMinutes) {
        return ({
            calculatedFlowMinutes: Math.round(new Date().getTime() / 1000 + (60 * desiredFlowMinutes)),
            calculatedRestMinutes: Math.round(new Date().getTime() / 1000 + (60 * desiredRestMinutes))
        });
    }
}

function FlowTimer(props) {

    const [timeContainer, setTimeContainer] = useState({
        timeNow: timeUtils.timeNow(),
        timeThen: timeUtils.timeThen(props.desiredFlowMinutes).calculatedFlowMinutes
    });

    const [timeLeft, setTimeLeft] = useState(timeContainer.timeThen - timeContainer.timeNow);

    const [ringSound] = useSound(ringSfx);
    const [startSound] = useSound(startSfx);
    const [switchSound] = useSound(switchSfx);

    useEffect(() => {
        if (timeLeft <= 0) {
            ringSound(); 
            restartPeriod("fromNoTimeLeft");
            props.periodCompleted();
        }
        window.onbeforeunload = function() {
            if (props.stateMachine === "running") { 
                timerPause();
                return "The timer is still running, are you sure you want to leave?"; 
            }
        }
    });

    useEffect(() => {
        (() => {
            let tempTimeNow = timeUtils.timeNow();
            let tempTimeThen = timeUtils.timeThen(props.desiredFlowMinutes).calculatedFlowMinutes;
            let tempTimeLeft = tempTimeThen - tempTimeNow;
            setTimeLeft("00");
            setTimeContainer({timeNow: tempTimeNow, timeThen: tempTimeThen});
            setTimeLeft(tempTimeLeft);
            clearInterval(window.ticker);
        })();
    }, [props.desiredFlowMinutes]);
    
    function timerStart() {
        startSound();
        let temptimeNow = timeUtils.timeNow();
        let temptimeThen = timeUtils.timeThen(props.desiredFlowMinutes).calculatedFlowMinutes;
        let temptimeLeft = temptimeThen - temptimeNow;
        props.changeStateMachine("running");
        setUpTimeTicker(temptimeNow, temptimeThen, temptimeLeft);
    }

    function setUpTimeTicker(tempTimeNow, tempTimeThen, tempTimeLeft) {
        setTimeContainer({timeNow: tempTimeNow, timeThen: tempTimeThen});
        setTimeLeft(tempTimeLeft);
        window.ticker = setInterval(function() {
        let checkTick = tempTimeThen - timeUtils.timeNow();
        setTimeLeft(checkTick);
        }, 1000)
    }

    function timerPause() {
        switchSound();
        clearInterval(window.ticker);
        props.changeStateMachine("paused");
    }

    function timerContinue() {
        startSound();
        let temptimeNow = timeUtils.timeNow();
        let temptimeThen = (temptimeNow + timeLeft);
        setUpTimeTicker(temptimeNow, temptimeThen, timeLeft);
        props.changeStateMachine("running");
    }

    function restartPeriod(commandOrigin) {
        let tempTimeNow = timeUtils.timeNow();
        let tempTimeThen = timeUtils.timeThen(props.desiredFlowMinutes).calculatedFlowMinutes;
        let tempTimeLeft = tempTimeThen - tempTimeNow;
        setTimeLeft("00");
        setTimeContainer({timeNow: tempTimeNow, timeThen: tempTimeThen});
        setTimeLeft(tempTimeLeft);
        clearInterval(window.ticker);
        if (commandOrigin === "fromResetAllFlows") {
          props.changeStateMachine("beforeStart");
        } else if (commandOrigin === "fromNoTimeLeft") {
          props.changeStateMachine("interflow");
        } else if (props.completedFlows === 0) {
          props.changeStateMachine("beforeStart");
        } else {
          props.changeStateMachine("interflow");
        }
    }

    return (
        <div className="timer flow-timer">
            <h2>Flow Timer</h2>
            <h3>{ Math.floor(timeLeft / 60).toString().padStart(2, "0") }:{ (timeLeft % 60).toString().padStart(2, "0") }</h3>
            <br />
            <ControlPad
                stateMachine={props.stateMachine}
                timerStart={timerStart}
                timerPause={timerPause} 
                timerContinue={timerContinue}
                restartPeriod={restartPeriod}
                resetAllFlows={props.resetAllFlows}
                restingStateActive={props.restingStateActive} />
        </div>
    );
}

function RestTimer(props) {

    const [timeContainer, setTimeContainer] = useState({
        timeNow: timeUtils.timeNow(),
        timeThen: timeUtils.timeThen(null, props.desiredRestMinutes).calculatedRestMinutes
    });

    const [timeLeft, setTimeLeft] = useState(timeContainer.timeThen - timeContainer.timeNow);

    useEffect(() => {
        if (timeLeft <= 0) {
            restartPeriod("fromNoTimeLeft");
            props.periodCompleted();
        }
        window.onbeforeunload = function() {
            if (props.stateMachine === "running") { 
                timerPause();
                return "The timer is still running, are you sure you want to leave?"; 
            }
        }
    });

    useEffect(() => {
        (() => {
            let tempTimeNow = timeUtils.timeNow();
            let tempTimeThen = timeUtils.timeThen(null ,props.desiredRestMinutes).calculatedRestMinutes;
            let tempTimeLeft = tempTimeThen - tempTimeNow;
            setTimeLeft("00");
            setTimeContainer({timeNow: tempTimeNow, timeThen: tempTimeThen});
            setTimeLeft(tempTimeLeft);
            clearInterval(window.ticker);
        })();
    }, [props.desiredRestMinutes]);
    
    function timerStart() {
        let temptimeNow = timeUtils.timeNow();
        let temptimeThen = timeUtils.timeThen(null, props.desiredRestMinutes).calculatedRestMinutes;
        let temptimeLeft = temptimeThen - temptimeNow;
        props.changeStateMachine("running");
        setUpTimeTicker(temptimeNow, temptimeThen, temptimeLeft);
    }

    function setUpTimeTicker(tempTimeNow, tempTimeThen, tempTimeLeft) {
        setTimeContainer({timeNow: tempTimeNow, timeThen: tempTimeThen});
        setTimeLeft(tempTimeLeft);
        window.ticker = setInterval(function() {
        let checkTick = tempTimeThen - timeUtils.timeNow();
        setTimeLeft(checkTick);
        }, 1000)
    }

    function timerPause() {
        clearInterval(window.ticker);
        props.changeStateMachine("paused");
    }

    function timerContinue() {
        let temptimeNow = timeUtils.timeNow();
        let temptimeThen = (temptimeNow + timeLeft);
        setUpTimeTicker(temptimeNow, temptimeThen, timeLeft);
        props.changeStateMachine("running");
    }

    function handleTimerSkip() {
        restartPeriod("fromNoTimeLeft");
        props.periodCompleted();
    }

    function restartPeriod(commandOrigin) {
        let tempTimeNow = timeUtils.timeNow();
        let tempTimeThen = timeUtils.timeThen(null ,props.desiredRestMinutes).calculatedRestMinutes;
        let tempTimeLeft = tempTimeThen - tempTimeNow;
        setTimeLeft("00");
        setTimeContainer({timeNow: tempTimeNow, timeThen: tempTimeThen});
        setTimeLeft(tempTimeLeft);
        clearInterval(window.ticker);
        if (commandOrigin === "fromResetAllFlows") {
          props.changeStateMachine("beforeStart");
        } else if (commandOrigin === "fromNoTimeLeft") {
          props.changeStateMachine("interflow");
        } else if (props.completedFlows === 0) {
          props.changeStateMachine("beforeStart");
        } else {
          props.changeStateMachine("interflow");
        }
    }

    return (
        <div className="timer rest-timer" >
            <h2>Rest Timer</h2>
            <h3>{ Math.floor(timeLeft / 60).toString().padStart(2, "0") }:{ (timeLeft % 60).toString().padStart(2, "0") }</h3>
            <br />
            <ControlPad
                stateMachine={props.stateMachine}
                timerStart={timerStart}
                timerPause={timerPause} 
                timerContinue={timerContinue}
                restartPeriod={restartPeriod}
                handleTimerSkip={handleTimerSkip}
                resetAllFlows={props.resetAllFlows}
                restingStateActive={props.restingStateActive} />
        </div>
    );
}

export { timeUtils, FlowTimer, RestTimer };