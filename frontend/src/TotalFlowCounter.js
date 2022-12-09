import React from 'react';

function TotalFlowCounter(props) {
    
    return (
        <div>
            <h2>Completed flows:</h2>
            <h3>{ props.completedFlows }</h3>
        </div>
    );
}

export default TotalFlowCounter;