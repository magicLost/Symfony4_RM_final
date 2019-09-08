import React from 'react';
import classes from './Form.module.scss';
import PropTypes from 'prop-types';
import FormElements from "./FormElements/FormElements";

        
class Form extends React.PureComponent
{
    constructor(props){
        super(props);
    }

    validateAll = () => {

        let elementsErrors = {};

        for(let elementName in this.props.elements){

            let error = '';

            //console.log(elementName);
            //console.log(this.props.elements[elementName]);

            if(this.props.elements[elementName].validators !== undefined){

                error = this.validatorChain.validate(this.formElementsState[elementName].value, this.props.elements[elementName].validators);

            }

            if(error){

                elementsErrors[elementName] = error;

            }

        }

        return elementsErrors;

    };


    render(){
        return (
        
            <div className={classes.Form}>

                <FormElements
                    formElements={}
                    formElementsState={}
                    inputChangeHandler={}
                />

            </div>
            
        );
    }
}

Form.propTypes = {

    elements: PropTypes.object.isRequired,
    submitButtonValue: PropTypes.string.isRequired,
    submitButtonClickHandler: PropTypes.func.isRequired,

    formElementsState: PropTypes.object.isRequired,

    //setFormElementsToState: PropTypes.func.isRequired,
    formError: PropTypes.string,
    //formElements: PropTypes.object,

    onInputChange: PropTypes.func,
    onClearState: PropTypes.func,

    hiddenFields: PropTypes.array
};

export default Form;
        