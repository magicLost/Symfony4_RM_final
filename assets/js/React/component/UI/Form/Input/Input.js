import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.scss';

/*
*
* elementAttrs: {
*   type: 'text',
*   placeholder: 'Something...'
* }
*/

class Input extends React.PureComponent
{

    changeHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.props.changeHandler(this.props.elementAttrs.name, event.target.value);

    };

    render(){

        let inputClass = classes.Input;
        let error = null;

        if(this.props.error){

            inputClass += ' ' + classes["Input--Error"];
            error = (
                <div
                    className={classes.Error}
                >
                    <p>{this.props.error}</p>
                </div>
            );

        }


        return (

            <div className={classes.InputWrapper}>

                <label htmlFor={this.props.elementAttrs.id} className={classes.Label}>{this.props.labelValue}</label>

                <input className={inputClass} {...this.props.elementAttrs} value={this.props.value} onChange={this.changeHandler} />

                {error}

            </div>

        );

    }

}

Input.propTypes = {

    elementAttrs: PropTypes.object,
    value: PropTypes.string,
    labelValue: PropTypes.string,
    changeHandler: PropTypes.func,
    error: PropTypes.string

};

export default Input;
        