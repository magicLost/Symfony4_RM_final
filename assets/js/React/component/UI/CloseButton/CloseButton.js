import React from 'react';
import classes from './CloseButton.module.scss';

import icons from "./../../../../../static/icons/ICONS.svg";
        
const closeButton = ({clickHandler}) => {
    return (

        <button
            className={classes.CloseButton}
            onClick={clickHandler}
        >
            <svg
                className={classes.Svg}
                width={"5"}
                height={"5"}
                viewBox="0 0 1024 1024"
            >
                <use xlinkHref={icons + "#close"}/>
            </svg>
        </button>
            
    );
};

export default closeButton;
        