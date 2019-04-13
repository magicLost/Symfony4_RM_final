import React from 'react';
import classes from './ListSvg.module.scss';
import iconsHref from "../../../../../static/icons/ICONS.svg";

export const svgType = {
    SOCIAL: "SOCIAL",
    CLIENTS: "CLIENTS"
};

const listSvg = ({ title, items, typeSvg }) => {

    let svgClass = '';

    switch(typeSvg){
        case svgType.SOCIAL: svgClass = classes["Svg--Social"];break;
        case svgType.CLIENTS: svgClass = classes["Svg--Clients"];break;
        default: console.error("Unknown svg type == " + typeSvg);
    }

    const icons = items.map((value, index) => {

        if(value.href){

            return (
                <li key={classes.Item + index}>
                    <a href={value.href} className={classes.Item} >
                        <svg className={svgClass} width={"10"} height={"10"} >
                            <use xlinkHref={iconsHref + value.xlinkHref} />
                        </svg>
                    </a>
                </li>
            );

        }else{

            return (
                <li key={classes.Item + index}>
                    <div className={classes.Item} >
                        <svg className={svgClass} width={"10"} height={"10"} >
                            <use xlinkHref={iconsHref + value.xlinkHref} />
                        </svg>
                    </div>
                </li>
            );

        }



    });

    return (

        <div className={classes.ListSvg}>

            <h3 className={classes.Title}>{ title }</h3>

            <ul className={classes.List}>

                { icons }

            </ul>

        </div>
            
    );
};

export default listSvg;
        