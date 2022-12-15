import React, { useState, useEffect } from 'react';
import TotalFlowCounter from './TotalFlowCounter';
import ControlPad from './ControlPad';
import useSound from 'use-sound';
import ringSfx from './assets/sounds/ring.mp3';
import startSfx from './assets/sounds/start.mp3';
import switchSfx from './assets/sounds/switch.mp3';
import skipSfx from './assets/sounds/skip.mp3';
import restartSfx from './assets/sounds/restart.mp3';
import timeToRestIcon from './assets/images/timetorest.png';
import timeToWorkIcon from './assets/images/timetowork.png';
import './css/Timers.css';

var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var webkit = !!ua.match(/WebKit/i);
var android = !!ua.match(/Android|webOS|/i);
var iOSSafariAndroidChrome = iOS && android && webkit && !ua.match(/CriOS/i);

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
    const [restartSound] = useSound(restartSfx);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (!iOSSafariAndroidChrome) {
                let notification = new Notification("Flow completed!", {
                    body: 'That was a good session, perhaps some rest now?',
                    icon: timeToRestIcon,
                    image: timeToRestIcon,
                    vibrate: [200, 100, 200]
                });
                notification.onclick = () => {
                    window.focus();
                }
            }
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
          restartSound();
          props.changeStateMachine("beforeStart");
        } else {
          restartSound();
          props.changeStateMachine("interflow");
        }
    }

    return (
        <div className="rounded m-5 p-10 bg-gradient-to-r from-slate-100 to-pink-100 dark:from-red-800 dark:to-pink-900">
            <h2 className="text-2xl mt-5 mb-5 text-center dark:text-white font-extrabold">Flow Timer</h2>
            <h3 className="text-center dark:text-white font-semibold text-4xl">{ Math.floor(timeLeft / 60).toString().padStart(2, "0") }:{ (timeLeft % 60).toString().padStart(2, "0") }</h3>
            <TotalFlowCounter
                stateMachine={props.stateMachine}
                completedFlows={props.completedFlows}
                restingStateActive={props.restingStateActive}
                completedLargeSessions={props.completedLargeSessions} />
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

    const [ringSound] = useSound(ringSfx);
    const [startSound] = useSound(startSfx);
    const [switchSound] = useSound(switchSfx);
    const [skipSound] = useSound(skipSfx);
    const [restartSound] = useSound(restartSfx);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (!iOSSafariAndroidChrome) {
                let notification = new Notification("Flow completed!", {
                    body: 'That was a good session, perhaps some rest now?',
                    icon: timeToWorkIcon,
                    image: timeToWorkIcon,
                    vibrate: [200, 100, 200]
                });
                notification.onclick = () => {
                    window.focus();
                }
            }
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
            let tempTimeThen = timeUtils.timeThen(null ,props.desiredRestMinutes).calculatedRestMinutes;
            let tempTimeLeft = tempTimeThen - tempTimeNow;
            setTimeLeft("00");
            setTimeContainer({timeNow: tempTimeNow, timeThen: tempTimeThen});
            setTimeLeft(tempTimeLeft);
            clearInterval(window.ticker);
        })();
    }, [props.desiredRestMinutes]);
    
    function timerStart() {
        startSound();
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
        switchSound();
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
        skipSound();
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
          restartSound();
          props.changeStateMachine("beforeStart");
        } else {
          restartSound();
          props.changeStateMachine("interflow");
        }
    }

    return (
        <div className="rounded m-5 p-10 bg-gradient-to-r from-pink-100 to-slate-100 dark:from-pink-900 dark:to-red-800">
            <h2 className="text-2xl mt-5 mb-5 text-center dark:text-white font-extrabold">Rest Timer</h2>
            <h3 className="text-center dark:text-white font-semibold text-4xl">{ Math.floor(timeLeft / 60).toString().padStart(2, "0") }:{ (timeLeft % 60).toString().padStart(2, "0") }</h3>
            <TotalFlowCounter
                stateMachine={props.stateMachine}
                completedFlows={props.completedFlows}
                restingStateActive={props.restingStateActive}
                completedLargeSessions={props.completedLargeSessions} />
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