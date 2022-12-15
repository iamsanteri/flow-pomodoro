import React, { useState, useEffect } from 'react';
import { flowDurationsMap, restDurationsMap } from './config/durationsConfig';
import useSound from 'use-sound';
import clickSfx from './assets/sounds/click.mp3';

function Settings({ desiredFlowMinutes, desiredRestMinutes, updateDurations }) {
    const [selectedFlowMinutes, setSelectedFlowMinutes] = useState(Object.keys(flowDurationsMap)[0]);
    const [selectedRestMinutes, setSelectedRestMinutes] = useState(Object.keys(restDurationsMap)[0]);

    const [clickSound] = useSound(clickSfx);

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
        clickSound();
        setSelectedFlowMinutes(changeEvent.target.value);
    }

    function handleRestOptionChange(changeEvent) {
        clickSound();
        setSelectedRestMinutes(changeEvent.target.value);
    }

    return (
        <div className="bg-slate-100 m-5 p-10 rounded">
            <h2 className="text-2xl mt-5 mb-5 font-extrabold">Settings</h2>
            <form className="">
                <h4 className="mb-2 font-semibold">Desired flow minutes: </h4>
                <label>
                    <input 
                        type="radio" 
                        value="flowOption1"
                        className="m-1"
                        checked={selectedFlowMinutes === "flowOption1"}
                        onChange={handleFlowOptionChange} />
                    Test
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        value="flowOption2"
                        className="m-1" 
                        checked={selectedFlowMinutes === "flowOption2"} 
                        onChange={handleFlowOptionChange} />
                    { flowDurationsMap.flowOption2 }
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        value="flowOption3" 
                        className="m-1"
                        checked={selectedFlowMinutes === "flowOption3"} 
                        onChange={handleFlowOptionChange} />
                    { flowDurationsMap.flowOption3 }
                </label>
                <br />
                <br />
                <h4 className="mb-2 font-semibold">Desired rest minutes: </h4>
                <label>
                    <input 
                        type="radio" 
                        value="restOption1"
                        checked={selectedRestMinutes === "restOption1"}
                        className="m-1"
                        onChange={handleRestOptionChange} />
                    Test
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        value="restOption2" 
                        checked={selectedRestMinutes === "restOption2"}
                        className="m-1"
                        onChange={handleRestOptionChange} />
                    { restDurationsMap.restOption2 }
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        value="restOption3" 
                        checked={selectedRestMinutes === "restOption3"}
                        className="m-1"
                        onChange={handleRestOptionChange} />
                    { restDurationsMap.restOption3 }
                </label>
                <br />
                <br />
                <button type="submit" onClick={saveNewSettings} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update duration settings</button>
            </form>
        </div>
    ); 

}

export default Settings;