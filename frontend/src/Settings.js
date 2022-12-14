import React, { useState, useEffect } from 'react';
import { flowDurationsMap, restDurationsMap } from './config/durationsConfig';

function Settings({ desiredFlowMinutes, desiredRestMinutes, updateDurations }) {
    const [selectedFlowMinutes, setSelectedFlowMinutes] = useState(Object.keys(flowDurationsMap)[0]);
    const [selectedRestMinutes, setSelectedRestMinutes] = useState(Object.keys(restDurationsMap)[0]);

    useEffect(() => {
        if (desiredFlowMinutes === flowDurationsMap.flowOption1) {
            setSelectedFlowMinutes(Object.keys(flowDurationsMap)[0]);
        } else if (desiredFlowMinutes === flowDurationsMap.flowOption2) {
            setSelectedFlowMinutes(Object.keys(flowDurationsMap)[1]);
        } else {
            setSelectedFlowMinutes(Object.keys(flowDurationsMap)[2]);
        }

        if (desiredRestMinutes === restDurationsMap.restOption1) {
            setSelectedRestMinutes(Object.keys(restDurationsMap)[0]);
        } else if (desiredRestMinutes === restDurationsMap.restOption2) {
            setSelectedRestMinutes(Object.keys(restDurationsMap)[1]);
        } else {
            setSelectedRestMinutes(Object.keys(restDurationsMap)[2]);
        }
    }, [desiredFlowMinutes, desiredRestMinutes]);

    function saveNewSettings(event) {
        event.preventDefault();
        
        let flowValue
        let restValue

        if (selectedFlowMinutes === Object.keys(flowDurationsMap)[0]) {
            flowValue = flowDurationsMap.flowOption1;
        } else if (selectedFlowMinutes === Object.keys(flowDurationsMap)[1]) {
            flowValue = flowDurationsMap.flowOption2; 
        } else {
            flowValue = flowDurationsMap.flowOption3;
        }

        if (selectedRestMinutes === Object.keys(restDurationsMap)[0]) {
            restValue = restDurationsMap.restOption1;
        } else if (selectedRestMinutes === Object.keys(restDurationsMap)[1]) {
            restValue = restDurationsMap.restOption2;
        } else {
            restValue = restDurationsMap.restOption3; 
        }
        updateDurations(flowValue, restValue);
    }

    function handleFlowOptionChange(changeEvent) {
        setSelectedFlowMinutes(changeEvent.target.value);
    }

    function handleRestOptionChange(changeEvent) {
        setSelectedRestMinutes(changeEvent.target.value);
    }

    return (
        <div>
            <h2>Settings</h2>
            <form>
                <h4>Desired flow minutes: </h4>
                <label>
                    <input 
                        type="radio" 
                        value="flowOption1"
                        checked={selectedFlowMinutes === "flowOption1"}
                        onChange={handleFlowOptionChange} />
                    Test
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        value="flowOption2" 
                        checked={selectedFlowMinutes === "flowOption2"} 
                        onChange={handleFlowOptionChange} />
                    30
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        value="flowOption3" 
                        checked={selectedFlowMinutes === "flowOption3"} 
                        onChange={handleFlowOptionChange} />
                    60
                </label>
                <br />
                <br />
                <h4>Desired rest minutes: </h4>
                <label>
                    <input 
                        type="radio" 
                        value="restOption1"
                        checked={selectedRestMinutes === "restOption1"}
                        onChange={handleRestOptionChange} />
                    Test
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        value="restOption2" 
                        checked={selectedRestMinutes === "restOption2"} 
                        onChange={handleRestOptionChange} />
                    5
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        value="restOption3" 
                        checked={selectedRestMinutes === "restOption3"} 
                        onChange={handleRestOptionChange} />
                    10
                </label>
                <br />
                <br />
                <button type="submit" onClick={saveNewSettings}>Update duration settings</button>
            </form>
        </div>
    ); 

}

export default Settings;