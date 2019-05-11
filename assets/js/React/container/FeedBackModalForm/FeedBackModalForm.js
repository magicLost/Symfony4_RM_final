import React from 'react';
import classes from './FeedBackModalForm.module.scss';
import PropTypes from 'prop-types';

import CloseButton from "../../component/UI/CloseButton/CloseButton";
import Form from "../Form/Form";
import SendPostRequest from "../SendPostRequest/SendPostRequest";


class FeedBackModalForm extends React.PureComponent
{
    postRequestData = {};

    state = {

        isSuccessRequest: false,
        isRequestSend: false,

        createdSendPost: false,

        formError: ''

    };

    submitButtonClickHandler = (data) => {

        //console.log(data);

        const formError = this.validateOnSubmit(data);

        //console.log("formError " + formError);

        if(!formError){

            data.token = this.createToken(data);

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
    };

    onInputChange = () => {

        this.setState((prevState) => {

            if(prevState.formError !== ''){
                return { formError: '' };
            }

            return null;

        });

    };

    onSubmitSuccess = (data) => {

        console.log("Submit success");
        console.log(data);

        switch(data.result){

            case "success":

                this.setState({
                    isSuccessRequest: true,
                    isRequestSend: false,
                    formError: ''
                });break;
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

        this.setState({

            isSuccessRequest: false,
            isRequestSend: false,

            createdSendPost: false,

            formError: ''

        });

        this.props.closeButtonClickHandler();

    };

    render(){

        const formStyle = (this.state.isRequestSend || this.state.isSuccessRequest) ? { display: "none" } : null;
        const sendRequestStyle = (this.state.isRequestSend && !this.state.isSuccessRequest) ? null : { display: "none" };

        return (

            <div className={classes.BackDrop}>
                <div className={classes.FeedBackModalForm}>

                    <CloseButton
                        color={"#ffbec4"}
                        clickHandler={this.closeButtonClickHandler}
                    />

                    <div className={classes.Form} style={formStyle}>
                        <Form
                            elements={this.props.formElements}
                            submitButtonValue={this.props.submitButtonValue}
                            submitButtonClickHandler={this.submitButtonClickHandler}
                            hiddenFields={this.props.hiddenFields}
                            formError={this.state.formError}
                            onInputChange={this.onInputChange}
                        />
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
                                <p>Ваша заявка принята. Мы свяжемся с вами в течение 15 минут.</p>
                                <button onClick={this.closeButtonClickHandler}>OK</button>
                            </div>
                    }


                </div>
            </div>

        );

    }

    createToken = (data) => {

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

    };


}

FeedBackModalForm.propTypes = {

    formElements: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    submitButtonValue: PropTypes.string.isRequired,
    closeButtonClickHandler: PropTypes.func.isRequired,
    hiddenFields: PropTypes.array

};

export default FeedBackModalForm;