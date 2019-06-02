import React from 'react';
import classes from './Button.module.scss';
        
const button = ({ value, onClick }) => {

    return (
        
        <button
            className={classes.Button}
            onClick={onClick}
        >
            { value }
        </button>
            
    );

};

export default button;
        