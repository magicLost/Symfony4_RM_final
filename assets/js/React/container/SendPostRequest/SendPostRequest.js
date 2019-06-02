import React from 'react';
import classes from './SendPostRequest.module.scss';
import PropTypes from 'prop-types';

import axios from "axios";

import Spinner from "../../component/Spinner/Spinner";
import ErrorRequest from "../../component/ErrorRequest/ErrorRequest";

class SendPostRequest extends React.PureComponent
{

    source = null;

    state = {

        loading: true,
        requestError: ''

    };

    constructor(props){

        super(props);

        this.source = axios.CancelToken.source();

        console.log('constructor SendPostRequest');
    }

    componentDidMount(){

        this.sendRequest();

    };

    componentWillUnmount(){

        console.log("componentWillUnmount SendPostRequest");
        this.source.cancel('Operation canceled by the user.');

    }

    tryAgainRequestHandler = () => {

        this.setState({
            loading: true,
            requestError: '',
        });

        this.sendRequest();

    };

    sendRequest = () => {

        console.log("send request");
        console.log(this.props.data);

        let contentTypeHeader = {'Content-Type': 'multipart/form-data'};
        const data = this.prepareDataForRequest(this.props.data);

        console.log(data.values());

        axios({

            method: "post",
            url: this.props.url,
            data: data ,
            headers: contentTypeHeader,
            cancelToken: this.source.token

        }).then((response) => {

                //console.log(response.data);

                this.props.onSubmitSuccess(response.data);

            })
            .catch((error) => {

                if(error instanceof axios.Cancel){



                }else{

                    this.setState({
                        loading: false,
                        requestError: "Сервер не хочет отвечать."
                    });

                }

                console.log(error.toString());

            });

    };
    
    render(){

        console.log('render SendPostRequest');

        return (
        
            <div className={classes.SendPostRequest}>

                { this.state.loading && <Spinner/> }

                { this.state.requestError && <ErrorRequest
                                                    errorMessage={this.state.requestError}
                                                    onClickHandler={this.tryAgainRequestHandler}
                                                    textStyle={{color: "black"}}
                                                />
                }



            </div>
            
        );
    }

    prepareDataForRequest = () => {

        const formData = new FormData();

        for(let key in this.props.data){

            if(this.props.data[key] instanceof FileList){

                console.log("append file - " + key);
                console.log(this.props.data[key][0]);

                formData.append(key, this.props.data[key][0]);

            }else{

                console.log("append something " + key);
                console.log(this.props.data[key]);

                formData.append(key, this.props.data[key]);

            }

        }

        return formData;

    }

}

SendPostRequest.propTypes = {

    url: PropTypes.string.isRequired,
    data: PropTypes.object,
    onSubmitSuccess: PropTypes.func
    //min-height
    //style: PropTypes.object.isRequired
 
};

export default SendPostRequest;
        