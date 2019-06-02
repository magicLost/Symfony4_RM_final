import React from 'react';
import classes from './FileInput.module.scss';
import PropTypes from "prop-types";


//accept=".jpg, .jpeg, .png"
class FileInput extends React.PureComponent {

    changeHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //this.props.changeHandler(this.props.elementAttrs.name, event.target.value);
        this.props.changeHandler(event.target);

    };


    render(){

        return (

            <div className={classes.FileInput}>

                <label className={classes.Label} htmlFor={name}>{ this.props.labelValue }</label>
                <input className={classes.Input} type="file" {...this.props.elementAttrs} onChange={this.changeHandler} />

                { this.props.error && <div
                    className={classes.Error}
                >
                    <p>{this.props.error}</p>
                </div> }

            </div>

        );

    };

}

//({labelTitle, elementAttrs, error, onChange}) =>

FileInput.propTypes = {

    elementAttrs: PropTypes.object,
    labelValue: PropTypes.string,
    changeHandler: PropTypes.func,
    error: PropTypes.string

};

export default FileInput;
        