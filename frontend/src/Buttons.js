import React from 'react';

function Buttons(props) {
    if (!props.disabled && !props.startNotPossible) {
        var button_one = <button onClick={ props.timerStart } disabled={ props.disabled }>Start flow</button>;
    }

    if (!props.disabled && props.startNotPossible) {
        var button_two = <button onClick={ props.timerContinue } disabled={ props.disabled }>Continue flow</button>;
    }

    if (props.disabled && !props.startNotPossible) {
        var button_three =  <button onClick={ props.pauseTimer } disabled={ !props.disabled }>Pause</button>;
    }

    if (!props.disabled && props.startNotPossible) {
        var button_four = <button onClick={ props.resetTimeTicker } disabled={ !props.startNotPossible }>Reset</button>;
    }

    if (props.resetAllVisible) {
        var button_five = <button onClick={ props.resetWholeTimer } disabled={ !props.resetAllVisible }>Start Over</button>;
    }
    
    return (
        <div>
            { button_one }
            { button_two }
            { button_three }
            { button_four }
            { button_five }
        </div>
    );
}

export default Buttons;