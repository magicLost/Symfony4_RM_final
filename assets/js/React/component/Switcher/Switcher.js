import React from 'react';
import classes from './Switcher.module.scss';
        
const switcher = ({title, increaseFunc, decreaseFunc}) => {
    return (

        <div className={classes.Switcher}>

            <button className={classes.Button} onClick={decreaseFunc}>Prev</button>
            <h4 className={classes.Title}>{ title }</h4>
            <button className={classes.Button} onClick={increaseFunc}>Next</button>

        </div>
            
    );
};

export default switcher;
        