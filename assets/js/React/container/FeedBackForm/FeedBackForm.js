import React from 'react';
import classes from './FeedBackForm.module.scss';
import PropTypes from 'prop-types';

import axios from "axios";

import Spinner from "../../component/Spinner/Spinner";
import ZForm from "../ZForm/ZForm";
import Button from "../../component/UI/Button/Button";


class FeedBackForm extends React.PureComponent
{

    source = null;

    state = {
        formError: '',

        isRequestLoading: false,
        isRequestSuccess: false,
        isRequestError: false,

    };

    constructor(props){
        super(props);

        this.source = axios.CancelToken.source();
    }

    componentWillUnmount(){

        this.source.cancel('Operation canceled by the user.');

    }

    submitButtonClickHandler = (data) => {

        const formError = this.props.validateOnSubmit(data);

        //console.log("formError " + formError);

        if(formError === ''){

            data['token'] = this.props.createToken(data);

            //TODO
            const formData = this.getFormData(data);

            //TODO init request
            this.sendRequest(formData);
            //this.props.submitButtonClickHandler(formData);
            //this.props.onSubmit(this.props.url, formData)


        }else{

            this.setState({
                formError: formError
            });

        }

        //this.props.onSubmit();

    };

    successOKButtonClickHandler = (event) => {

        event.stopPropagation();
        event.preventDefault();

        this.setState({

            formError: '',

            isRequestLoading: false,
            isRequestSuccess: false,
            isRequestError: false,

        });

        this.props.successOKButtonClickHandler();

    };

    render(){

        const element = this.getElementToRender();

        return (

            <div className={classes.FeedBackForm}>

                { element }

            </div>

        );

    }

    sendRequest = (formData) => {

        //console.log("send request");

        this.setState({
            isRequestLoading: true,
            isRequestSuccess: false,
            isRequestError: false
            //requestError: "Сервер не хочет отвечать."
        });

        axios({

            method: "post",
            url: this.props.url,
            data: formData ,
            headers: {'Content-Type': 'multipart/form-data'},
            cancelToken: this.source.token

        }).then((response) => {

            //console.log(response.data);

            //this.props.onSubmitSuccess(response.data);

            if(response.data.result && response.data.result === 'success'){

                this.setState({
                    isRequestLoading: false,
                    isRequestSuccess: true,
                    isRequestError: false
                    //requestError: "Сервер не хочет отвечать."
                });

            }else{

                //set formError
                this.setState({
                    isRequestLoading: false,
                    isRequestSuccess: false,
                    isRequestError: false,
                    formError: response.data.error
                    //requestError: "Сервер не хочет отвечать."
                });
            }

        })
            .catch((error) => {

                if(error instanceof axios.Cancel){



                }else{

                    this.setState({
                        isRequestLoading: false,
                        isRequestSuccess: false,
                        isRequestError: true
                        //requestError: "Сервер не хочет отвечать."
                    });

                }

                console.log(error.toString());

            });

    };


    getElementToRender = () => {

        if(this.props.isRequestLoading){

            return (
                <div className={classes.Spinner}>
                    <Spinner/>
                </div>
            );

        }else if(this.props.isRequestSuccess){

            return (
                <div className={classes.Success}>
                    <p>Ваша заявка принята. Мы свяжемся с вами в течение 15 минут.</p>
                    <Button title={"OK"} onClick={this.successOKButtonClickHandler}/>
                </div>
            );

        }else if(this.props.isRequestError){

            return (
                <div className={classes.Error}>
                    <p>Какая-то ошибочка...</p>
                    <Button title={"Попробовать снова."} onClick={this.submitButtonClickHandler}/>
                </div>
            );

        }

        return (
            <ZForm
                elements={this.props.elements}
                submitButtonValue={this.props.submitButtonValue}
                submitButtonClickHandler={this.submitButtonClickHandler}

                formError={this.state.formError}

                hiddenFields={this.props.hiddenFields}
            />
        );

    };

    getFormData = (data) => {

        const formData = new FormData();

        for(let element in data){

            formData.append(element, data[element]);

        }

        return formData;

    };

}

FeedBackForm.propTypes = {

    url: PropTypes.string.isRequired,
    elements: PropTypes.object.isRequired,
    submitButtonValue: PropTypes.string.isRequired,

    validateOnSubmit: PropTypes.func.isRequired,
    createToken: PropTypes.func.isRequired,

    successOKButtonClickHandler: PropTypes.func.isRequired,

    hiddenFields: PropTypes.array

};

export default FeedBackForm;
        