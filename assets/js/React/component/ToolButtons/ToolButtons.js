import React from 'react';
import classes from './ToolButtons.module.scss';
import icons from "./../../../../static/icons/ICONS.svg";
        
const toolButtons = ({ callMeButtonClickHandler, activeSectionIndex, sectionsLength, increaseSectionIndex, decreaseSectionIndex}) => {

    let prevButtonStyle = { left: "0", padding: "10px 13px 10px 8px" };
    let nextButtonStyle = { right: "0", padding: "10px 8px 10px 13px" };

    if(activeSectionIndex === 0){
        prevButtonStyle.display = "none";
    }

    if(activeSectionIndex === sectionsLength - 1){
        nextButtonStyle.display = "none";
    }

    return (
        
        <div className={classes.ToolButtons}>

            <button
                className={classes.CallMe}
                onClick={callMeButtonClickHandler}
            >

                <svg
                    className={classes.CallMeButtonSvg}
                    width="50"
                    height={"50"}
                >
                    <use  xlinkHref={icons + '#callMe'}/>
                </svg>

            </button>

            <button
                className={classes.ChangeSectionButton}
                style={prevButtonStyle}
                onClick={decreaseSectionIndex}
            >
                <svg
                    className={classes.Svg}
                    width="50"
                    height={"50"}
                    style={{transform: "rotate(180deg)"}}
                >
                    <use  xlinkHref={icons + '#arrow'}/>
                </svg>
            </button>

            <button
                className={classes.ChangeSectionButton}
                style={nextButtonStyle}
                onClick={increaseSectionIndex}
            >
                <svg
                    className={classes.Svg}
                    width="50"
                    height={"50"}
                >
                    <use  xlinkHref={icons + '#arrow'}/>
                </svg>
            </button>

        </div>
            
    );
};

export default toolButtons;
        