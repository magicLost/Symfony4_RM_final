import React from 'react';
import classes from './BackDrop.module.scss';

const backDrop = ({show, backdropClickHandler}) => (

    show ? <div className={classes.BackDrop} onClick={backdropClickHandler}></div> : null

);

export default backDrop;
        