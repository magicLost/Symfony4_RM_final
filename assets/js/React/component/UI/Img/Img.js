import React from 'react';
import classes from './Img.module.scss';
        
const img = ({ isActive, src300, src600 }) => {

    let content = null;

    if(isActive === true){

        content = (

            <picture>

                <source media="(min-width: 700px)" srcSet={src600} />

                <img src={src300}  alt="Пример нашей работы" />

            </picture>

        );

    }

    return (

        <div className={classes.Img}>

            { content }

        </div>

    );

};

export default img;
        