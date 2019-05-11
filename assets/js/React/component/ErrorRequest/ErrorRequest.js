import React from 'react';
import classes from './ErrorRequest.module.scss';
        
const errorRequest = ({errorMessage, onClickHandler, textStyle = {}}) => {
    return (
        
        <div className={classes.ErrorRequest}>

            <p style={textStyle} className={classes.ErrorText}>{ errorMessage }</p>
            <button className={classes.ErrorButton} onClick={onClickHandler}>Попробовать снова</button>

        </div>
            
    );
};

export default errorRequest;
        