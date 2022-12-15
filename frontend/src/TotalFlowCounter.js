import React, { useState, useEffect } from 'react';
import './css/TotalFlowCounter.css';

function TotalFlowCounter(props) {

    let circleOne; 
    let circleTwo;
    let circleThree; 
    let circleFour;

    const [vizTracker, setVizTracker] = useState(0);

    useEffect(() => {
        switch (props.completedFlows) {
            case 1:
                setVizTracker(2);
                break;
            case 2:
                setVizTracker(4);
                break; 
            case 3: 
                setVizTracker(6);
                break; 
            case 4: 
                setVizTracker(8);
                break;
            default: 
                setVizTracker(0);
        }
    }, [props.completedFlows]);

    useEffect(() => {
        if (props.completedFlows === 0 && props.stateMachine !== "running") {
            setVizTracker(0);
        }
        if (props.stateMachine === "running" && !props.restingStateActive) {
            setVizTracker((vizTracker) => vizTracker + 1);
        }
    }, [props.stateMachine, props.completedFlows, props.restingStateActive]);

    switch(vizTracker) {
        case 1: 
            circleOne = "half-state";
            break;
        case 2: 
            circleOne = "full-state";
            break; 
        case 3: 
            circleOne = "full-state";
            circleTwo = "half-state";
            break;
        case 4: 
            circleOne = "full-state";
            circleTwo = "full-state";
            break; 
        case 5: 
            circleOne = "full-state";
            circleTwo = "full-state";
            circleThree = "half-state";
            break;
        case 6: 
            circleOne = "full-state";
            circleTwo = "full-state";
            circleThree = "full-state";
            break; 
        case 7: 
            circleOne = "full-state";
            circleTwo = "full-state";
            circleThree = "full-state";
            circleFour = "half-state";
            break;
        case 8: 
            circleOne = "full-state";
            circleTwo = "full-state";
            circleThree = "full-state";
            circleFour = "full-state";
            break; 
        default:
            break; 
    }

    return (
        <div className="text-center mt-3">
            <div className="mb-2">
                <div className="circle-container">
                    <div className="circle"><div className={circleOne}></div></div>
                    <div className="circle"><div className={circleTwo}></div></div>
                    <div className="circle"><div className={circleThree}></div></div>
                    <div className="circle"><div className={circleFour}></div></div>
                </div>
            </div>
            <h3 className='font-semibold mt-3 mb-1'>{ props.completedFlows } / 4</h3>
            <span className="large-sessions-modifier"> (Large sessions: { props.completedLargeSessions } )</span>
        </div>
    );
}

export default TotalFlowCounter;