import React from 'react';
import PropTypes from 'prop-types';

import classes from './Form.module.scss';

import SubmitButton from "../../component/UI/Form/SubmitButton/SubmitButton";
//import FormBuilder from "./Helper/FormBuilder";
import ValidatorChain from "../../../helper/Validation/ValidatorChain";
import FormElements from "./FormElements/FormElements";
//import FormValidator from "./Helper/FormValidator";

        
class Form extends React.PureComponent
{

    validatorChain = null;
    //builder = null;


    state = {

        name: {
            value: '',
            error: ''
        },

        phone: {
            value: '',
            error: ''
        },

        //formError: ''

    };

    constructor(props){

        super(props);

        //console.log('constructor Form');

        //this.validation = new Validation();
        //this.builder = new FormBuilder();
        //this.validator = new FormValidator(this.props.elements);
        this.validatorChain = new ValidatorChain();

        this.state = this.getStartState();

    }


    inputChangeHandler = (name, value) => {

        //console.log("inputChangeHandler == " + name + ' | ' + value);

        const newState = { formError: '' };
        let error = '';

        if(this.props.elements[name].validators !== undefined){

            error = this.validatorChain.validate(value, this.props.elements[name].validators);

        }

        newState[name] = {

            value: value,
            error: error

        };

        this.props.onInputChange();

        this.setState(newState);

    };

    submitFormHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //const values = this.getValues();

        const errors = this.validateAll();

        //console.log(errors);

        const hasErrors = this.hasErrors(errors);

        if(!hasErrors){

            const data = this.getValues();

            this.props.submitButtonClickHandler(data);

        }else{

            this._setErrorsToState(errors);

        }
    };

    clearButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.clearState();

    };

    validateAll = () => {

        let elementsErrors = {};

        for(let elementName in this.props.elements){

            let error = '';

            //console.log(elementName);
            //console.log(this.props.elements[elementName]);

            if(this.props.elements[elementName].validators !== undefined){

                error = this.validatorChain.validate(this.state[elementName].value, this.props.elements[elementName].validators);

            }

            if(error){

                elementsErrors[elementName] = error;

            }

        }

        return elementsErrors;

    };

    clearState = () => {

        this.setState({

            ...this.getStartState()

        });

    };

    render(){

        //console.log('render Form');

        const submitButton = <SubmitButton name={this.props.submitButtonValue} color={"#d4ffcf"} />;
        const clearButton = <SubmitButton name={"Очистить"} color={"#ffbec4"} onClick={this.clearButtonClickHandler} />;
        //const elements = this.builder.renderElements(this.props.elements, this.state, this.inputChangeHandler);

        return (

            <>

                <form action={"#"} className={classes.Form} onSubmit={this.submitFormHandler}>

                    <FormElements
                        elements={this.props.elements}
                        inputChangeHandler={this.inputChangeHandler}
                        state={this.state}
                    />

                    { this.props.formError && <div className={classes.FormError}>
                        <p>{ this.props.formError }</p>
                    </div> }

                    { clearButton }

                    { submitButton }

                </form>

            </>

        );

    }

  /*  getHiddenFields = () => {

        if(this.props.hiddenFields !== undefined){

            return this.props.hiddenFields.map((value, index) => (

                <input key={classes.Form + index} type={"hidden"} name={value.name} value={value.name} />

            ));

        }

        return null;

    };*/

    getStartState = () => {

        const state = {};

        for(let element in this.props.elements){

            state[element] = { value: '', error: ''};

        }

        return state;
    };

    getValues = () => {

        let values = {};

        for(let element in this.props.elements){

            if(this.state.hasOwnProperty(element)){

                values[element] = this.state[element].value;

            }else{

                console.error('Bad element name == ' + element);

            }

        }

        if(this.props.hiddenFields !== undefined){

            for(let field of this.props.hiddenFields){

                values[field.name] = field.value;

            }

        }

        return values;

    };

    hasErrors = (errors) => {

        if(typeof errors !== 'object' || Array.isArray(errors)){
            console.error("We need object");
            return false;
        }

        return Object.getOwnPropertyNames(errors).length > 0;

    };

    _setErrorsToState = (errors) => {

        this.setState((prevState) => {

            const newState = {};

            for(let elementName in errors){

                newState[elementName] = {

                    value: prevState[elementName].value,
                    error: errors[elementName],

                }

            }

            return newState;

        });

    };

}

Form.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
    elements: PropTypes.object.isRequired,
    submitButtonValue: PropTypes.string.isRequired,
    submitButtonClickHandler: PropTypes.func.isRequired,
    //validateOnSubmit: PropTypes.func.isRequired,

    hiddenFields: PropTypes.array,

    formError: PropTypes.string,

    onInputChange: PropTypes.func
 
};

export default Form;
        