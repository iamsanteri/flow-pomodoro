import React from 'react';

function ControlPad(props) {

    function handleResetAllFlows() {
        props.restartPeriod("fromResetAllFlows");
        props.resetAllFlows();
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
            <button onClick={props.timerContinue}>Continue rest</button> }
            <button onClick={props.restartPeriod}>Restart current timer</button>
        </div>
    );
    const interflowTemplate = (
        <div>
            { !props.restingStateActive ? 
            <button onClick={props.timerStart}>Start flow</button> : 
            <button onClick={props.timerStart}>Start rest</button> }
            <button onClick={handleResetAllFlows}>Reset all flows</button>
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