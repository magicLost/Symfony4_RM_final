import React from 'react';
import { useState } from 'react';

import classes from './Example.module.scss';


const example = () => {

    const [ inputValue, setInputValue ] = useState('');

    const inputChangeHandler = (event) => {

        setInputValue(event.target.value);

    };

    return (

        <div className={classes.Example}>

            <input
                type="text"
                placeholder="ToDo"
                onChange={inputChangeHandler}
                value={inputValue}
            />

            <button>Add</button>

            <ul />

        </div>

    );
};

export default example;
