import React from 'react';
import classes from './MainMenuButton.module.scss';
        
const mainMenuButton = ({title, clickHandler}) => {

    return (
        
        <button
            className={classes.MainMenuButton}
            onClick={clickHandler}
        >

            {title}

        </button>
            
    );

};

export default mainMenuButton;
        