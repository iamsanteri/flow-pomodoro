import React from 'react';
import useSound from 'use-sound';
import './css/ControlPad.css';
import resetSfx from './assets/sounds/reset.mp3';

function ControlPad(props) {

    const [resetSound] = useSound(resetSfx);

    function handleResetAllFlows() {
        resetSound();
        if (window.confirm("Are you sure you want to reset all flows and sessions?")) {
            props.restartPeriod("fromResetAllFlows");
            props.resetAllFlows();
        } else {
            return;
        };
    }

    const beforeStartTemplate = (
        <div>
             <button onClick={props.timerStart} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Start flow</button>
        </div>
    );
    const runningTemplate = (
        <div>
            <button onClick={props.timerPause} className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Pause</button>
        </div>
    );
    const pausedTemplate = (
        <div>
            { !props.restingStateActive ? 
            <button onClick={props.timerContinue} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Continue flow</button> :
            <div>
                <button onClick={props.timerContinue} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Continue rest</button>
                <button onClick={props.handleTimerSkip} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Skip the break</button>
            </div> }
            <button onClick={props.restartPeriod} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Restart current timer</button>
        </div>
    );
    const interflowTemplate = (
        <div>
            { !props.restingStateActive ?
                <button onClick={props.timerStart} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Start flow</button> :
            <div> 
                <button onClick={props.timerStart} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Start rest</button> 
                <button onClick={props.handleTimerSkip} className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Skip the break</button> 
            </div> }
            <button onClick={handleResetAllFlows} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Reset all flows and sessions</button>
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
        <div className="text-center">
            { displayStateTemplate() }
        </div>
    );
}

export default ControlPad;