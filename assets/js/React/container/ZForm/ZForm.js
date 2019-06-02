import React from 'react';
import classes from './ZForm.module.scss';
import PropTypes from 'prop-types';

import CloseButton from "../../component/UI/CloseButton/CloseButton";
import SendPostRequest from "../SendPostRequest/SendPostRequest";
import ZRenderFormElements from "./ZRenderFormElements/ZRenderFormElements";
import SubmitButton from "../../component/UI/Form/SubmitButton/SubmitButton";
import ValidatorChain from "../../../helper/Validation/ValidatorChain";
        
class ZForm extends React.PureComponent
{
    postRequestData = {};

    state = {

        isSuccessRequest: false,
        isRequestSend: false,

        createdSendPost: false,

        formError: '',

        elem1: {
            value: '',
            error: ''
        },

        elem2: {
            value: '',
            error: ''
        },

    };

    constructor(props){

        super(props);

        this.validatorChain = new ValidatorChain();

        this.state = this.getStartState();

    }

    submitFormHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //const values = this.getValues();

        const errors = this.validateAll();

        //console.log(errors);

        const hasErrors = this.hasErrors(errors);

        if(!hasErrors){

            const data = this.getValues();

            //console.log(data);

            const formError = this.props.validateOnSubmit(data);

            //console.log("formError " + formError);

            if(!formError){

                data.token = this.props.createToken(data);

                console.log(data);

                this.postRequestData = data;

                this.setState({
                    isRequestSend: true,
                    createdSendPost: true
                });

            }else{

                this.setState({
                    formError: formError
                });

            }

            //this.props.submitButtonClickHandler(data);

        }else{

            this._setErrorsToState(errors);

        }

    };

    onInputChange = (target) => {

        const name = target.name;
        const value = target.type === 'file' ? target.files : target.value;

        console.log(value);
        //console.log(value);

        const newState = { formError: '' };
        let error = '';

        if(this.props.elements[name].validators !== undefined){

            error = this.validatorChain.validate(value, this.props.elements[name].validators);

        }

        newState[name] = {

            value: value,
            error: error

        };

        //this.props.onInputChange();

        this.setState(newState);


    };

    onSubmitSuccess = (data) => {

        console.log("Submit success");
        console.log(data);

        if(data.result === undefined){
            console.error("Undefined result...");
            return;
        }

        switch(data.result){

            case "success":

                this.setState({
                    isSuccessRequest: true,
                    isRequestSend: false,
                    formError: ''
                });

                if(this.props.onSubmitSuccess !== undefined) this.props.onSubmitSuccess();break;

            case "error":

                this.setState({
                    isSuccessRequest: false,
                    isRequestSend: false,
                    formError: data.error
                });break;

            default: console.error("Unknown result == " + data.result);

        }

    };

    closeButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.clearState();

        /*this.setState({

            isSuccessRequest: false,
            isRequestSend: false,

            createdSendPost: false,

            formError: ''

        });*/

        if(this.props.closeButtonClickHandler)
            this.props.closeButtonClickHandler();

    };

    clearButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.clearState();

    };

    clearState = () => {

        this.setState({

            ...this.getStartState()

        });

    };

    render(){

        const submitButton = <SubmitButton title={this.props.submitButtonValue} color={"#d4ffcf"} />;
        const clearButton = <SubmitButton title={"Очистить"} color={"#ccc8c8"} onClick={this.clearButtonClickHandler} />;

        const formStyle = (this.state.isRequestSend || this.state.isSuccessRequest) ? { display: "none" } : null;
        const sendRequestStyle = (this.state.isRequestSend && !this.state.isSuccessRequest) ? null : { display: "none" };

        return (

            <div className={classes.ZForm}>

                { this.props.isCloseButton && <CloseButton
                    color={"#000000"}
                    clickHandler={this.closeButtonClickHandler}
                /> }

                <div className={classes.Form} style={formStyle}>


                    <form action={"#"} className={classes.ZFormElements} onSubmit={this.submitFormHandler}>

                        <ZRenderFormElements
                            elements={this.props.elements}
                            inputChangeHandler={this.onInputChange}
                            state={this.state}
                        />

                        { this.state.formError && <div className={classes.FormError}>
                            <p>{ this.state.formError }</p>
                        </div> }

                        { clearButton }

                        { submitButton }

                    </form>

                </div>

                <div className={classes.SendRequest} style={sendRequestStyle}>
                    { this.state.createdSendPost && <SendPostRequest
                        url={this.props.url}
                        data={{...this.postRequestData}}
                        onSubmitSuccess={this.onSubmitSuccess}
                    />}
                </div>

                { this.state.isSuccessRequest &&
                <div className={classes.Success}>
                    <p>{ this.props.successMessage }</p>
                    <button onClick={this.closeButtonClickHandler}>OK</button>
                </div>
                }


            </div>

        );

    }

    getStartState = () => {

        const state = {
            isSuccessRequest: false,
            isRequestSend: false,

            createdSendPost: false,

            formError: ''
        };

        for(let element in this.props.elements){

            state[element] = { value: '', error: ''};

        }

        return state;
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

    /* createToken = (data) => {

         let stringToHash = data.phone + data.email + "Super secret phrase...";

         if(stringToHash.length >  64){

             stringToHash = stringToHash.substr(0, 63);

         }

         return btoa(stringToHash);

     };

     validateOnSubmit = (data) => {

         if(data.name === ''){

             return 'Как вас называть?';

         }

         if(data.phone === '' && data.email === ''){

             return 'Укажите, пожалуйста, номер телефона или адрес электронной почты, иначе мы не сможем с вами связаться.';

         }

         return '';

     };*/

}

ZForm.propTypes = {

    elements: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    submitButtonValue: PropTypes.string.isRequired,

    isCloseButton: PropTypes.bool.isRequired,
    closeButtonClickHandler: PropTypes.func,

    validateOnSubmit: PropTypes.func.isRequired,
    createToken: PropTypes.func.isRequired,

    successMessage: PropTypes.string.isRequired,
    onSubmitSuccess: PropTypes.func,

    hiddenFields: PropTypes.array

};

export default ZForm;
        