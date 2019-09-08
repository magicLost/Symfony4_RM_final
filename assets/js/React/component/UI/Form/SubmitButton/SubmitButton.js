import React from 'react';
import classes from './SubmitButton.module.scss';
        
const submitButton = ({title, color, onClick = null}) => {

    return (

        <button
            className={classes.SubmitButton}
            style={{backgroundColor: color}}
            onClick={onClick}
        >{title}</button>
            
    );

};

export default submitButton;
        