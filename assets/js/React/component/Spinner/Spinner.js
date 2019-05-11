import React from 'react';
import classes from './Spinner.module.scss';

const spinner = () => {

    return (

        <div className={classes.Spinner}>
            <div className={classes.Loader}>
                Loading...
            </div>
        </div>

    );

};

export default spinner;