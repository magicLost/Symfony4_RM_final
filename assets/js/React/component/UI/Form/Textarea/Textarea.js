import React from 'react';
import classes from './Textarea.module.scss';
import PropTypes from 'prop-types';
        
class Textarea extends React.Component
{

    state = {
        style: {}
    };

    changeHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.props.changeHandler(this.props.elementAttrs.name, event.target.value);

    };

    autoGrow = (event) => {

        //console.log(event.target);
        event.preventDefault();
        event.stopPropagation();

        const target = event.target;

        if (target.scrollHeight > target.clientHeight) {

            this.setState({style: { height: target.scrollHeight + 10 + "px"}});
           //target.style.height = target.scrollHeight + 10 + "px";

        }
    };
    
    render(){

        let textareaClass = classes.Textarea;
        let error = null;

        let style = null;
        let autoGrowHandler = null;

        if(this.props.resize){

            style = this.state.style;
            autoGrowHandler = this.autoGrow;

        }

        if(this.props.error){

            textareaClass += ' ' + classes["Textarea--Error"];
            error = (
                <div
                    className={classes.Error}
                >
                    <p>{this.props.error}</p>
                </div>
            );

        }

        return (
        
            <div className={classes.TextareaWrapper}>

                <label
                    htmlFor={this.props.elementAttrs.id}
                    className={classes.Label}>{this.props.labelValue}
                </label>

                <textarea
                    style={style}
                    onKeyUp={autoGrowHandler}
                    className={textareaClass}
                    {...this.props.elementAttrs}
                    value={this.props.value}
                    onChange={this.changeHandler}
                />

                {error}

            </div>
            
        );
    }
}

Textarea.propTypes = {

    elementAttrs: PropTypes.object,
    value: PropTypes.string,
    labelValue: PropTypes.string,
    changeHandler: PropTypes.func,
    error: PropTypes.string,
    resize: PropTypes.bool.isRequired
 
};

export default Textarea;
        