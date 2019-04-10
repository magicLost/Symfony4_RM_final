import React from 'react';
import classes from './ToolButtons.module.scss';
import icons from "./../../../../static/icons/ICONS.svg";
        
const toolButtons = ({ callMeButtonClickHandler, menuButtonClickHandler = null}) => {

    return (
        
        <div className={classes.ToolButtons}>

     {/*       <button
                className={classes.MenuButton}
                onClick={menuButtonClickHandler}
            >

                <svg
                    className={classes.MenuButtonSvg}
                    width="50"
                    height={"50"}
                    viewBox="0 0 1024.5 515.58"
                >
                    <use  xlinkHref={icons + '#hamburger'}/>
                </svg>



            </button>*/}

            <button
                className={classes.CallMe}
                onClick={callMeButtonClickHandler}
            >

                <svg
                    className={classes.CallMeButtonSvg}
                    width="50"
                    height={"50"}
                    viewBox="0 0 1024 1024"
                >
                    <use  xlinkHref={icons + '#callMe'}/>
                </svg>

            </button>

           {/* { (deviceType === "MOBILE") && <button className={classes.Tools}>Tools</button> }*/}

        </div>
            
    );
};

export default toolButtons;
        