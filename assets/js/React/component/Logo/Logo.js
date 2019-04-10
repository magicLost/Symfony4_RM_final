import React from 'react';
import classes from './Logo.module.scss';
import icons from "../../../../static/icons/ICONS.svg";
        
const logo = ({isHomepage, homePagePath}) => {

    console.log("logo render");

    if(!isHomepage){

        return (
            <div className={classes.Logo}>

                <svg
                    className={classes.Svg}
                    width="5"
                    height={"5"}
                    viewBox={"0 0 836 859.07"}
                >
                    <use  xlinkHref={ icons + "#logo" }/>
                </svg>

            </div>
        );

    }else{

        return (
            <a
                className={classes.Logo}
                href={homePagePath}
            >

                <svg
                    className={classes.Svg}
                    width="5"
                    height={"5"}
                >
                    <use  xlinkHref={ icons + "#logo" }/>
                </svg>

            </a>
        );

    }

};

export default logo;
        