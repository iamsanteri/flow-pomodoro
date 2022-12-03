import React from 'react';

function PeriodCounter(props) {
    return (
        <div>
            <h2>Periods:</h2>
            <h3>{ props.periods }</h3>
        </div>
    );
}

export default PeriodCounter;