import React from 'react';
import './css/ControlPad.css';

function ControlPad(props) {

    function handleResetAllFlows() {
        if (window.confirm("Are you sure you want to reset all flows and sessions?")) {
            props.restartPeriod("fromResetAllFlows");
            props.resetAllFlows();
        } else {
            return;
        };
    }

    const beforeStartTemplate = (
        <div>
             <button onClick={props.timerStart}>Start flow</button>
        </div>
    );
    const runningTemplate = (
        <div>
            <button onClick={props.timerPause}>Pause</button>
        </div>
    );
    const pausedTemplate = (
        <div>
            { !props.restingStateActive ? 
            <button onClick={props.timerContinue}>Continue flow</button> :
            <div>
                <button onClick={props.timerContinue}>Continue rest</button>
                <button onClick={props.handleTimerSkip}>Skip the break</button>
            </div> }
            <button onClick={props.restartPeriod}>Restart current timer</button>
        </div>
    );
    const interflowTemplate = (
        <div>
            { !props.restingStateActive ?
                <button onClick={props.timerStart}>Start flow</button> :
            <div> 
                <button onClick={props.timerStart}>Start rest</button> 
                <button onClick={props.handleTimerSkip}>Skip the break</button> 
            </div> }
            <button onClick={handleResetAllFlows}>Reset all flows and sessions</button>
        </div>
        
    );

    const displayStateTemplate = function() {
        switch (props.stateMachine) {
            case "running":
                return runningTemplate;
            case "paused":
                return pausedTemplate;
            case "interflow": 
                return interflowTemplate;
            default:
                return beforeStartTemplate;
        }   
    }

    return (
        <div>
            { displayStateTemplate() }
        </div>
    );
}

export default ControlPad;