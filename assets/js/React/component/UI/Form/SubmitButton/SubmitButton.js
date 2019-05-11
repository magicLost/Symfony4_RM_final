import React from 'react';
import classes from './SubmitButton.module.scss';
        
const submitButton = ({name, color, onClick = null}) => {

    return (

        <button
            className={classes.SubmitButton}
            style={{backgroundColor: color}}
            onClick={onClick}
        >{name}</button>
            
    );

};

export default submitButton;
        