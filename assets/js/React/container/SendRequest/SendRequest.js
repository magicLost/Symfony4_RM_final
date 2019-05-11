import React from 'react';
import classes from './SendRequest.module.scss';
import PropTypes from 'prop-types';

import axios from "axios";

import Spinner from "../../component/Spinner/Spinner";
import ErrorRequest from "../../component/ErrorRequest/ErrorRequest";
        
class SendRequest extends React.Component
{
    data = null;

    state = {

        loading: true,
        requestError: '',
        requestSuccess: false,

    };

   /* constructor(props){
        super(props);
    }*/

    componentDidMount(){

        this.sendRequest();

    };


    render(){
        return (
        
            <div className={classes.SendRequest}>

                { this.state.loading && <div className={classes.Wrapper}><Spinner/></div> }

                { this.state.requestError && <div className={classes.Wrapper}>
                    <ErrorRequest
                        errorMessage={this.state.requestError}
                        onClickHandler={this.tryAgainRequestHandler}
                        textStyle={{color: "white"}}
                    />
                </div> }

                { this.state.requestSuccess && this.props.getChildren(this.data)}

            </div>
            
        );
    }


    tryAgainRequestHandler = () => {

        this.setState({
            loading: true,
            requestError: '',
        });

        this.sendRequest();

    };

    sendRequest = () => {

        axios.get(this.props.url)

            .then((response) => {

                //console.log(response.data);

                const data = response.data;

                //console.log(response);

                if(this.props.isValidData(data)){

                    this.data = data;

                    this.setState({
                        loading: false,
                        requestError: '',
                        requestSuccess: true
                    });

                }else{

                    //TODO make outputs by error type

                    this.setState({
                        loading: false,
                        requestError: 'Опс... Какая-то ошибочка...',
                        requestSuccess: false
                    });

                }

            })
            .catch((error) => {

                this.setState({
                    loading: false,
                    requestError: "Сервер не хочет отвечать."
                });

                console.log(error.toString());

            });

    };

}

SendRequest.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    getChildren: PropTypes.func.isRequired,
    //min-height
    style: PropTypes.object.isRequired,
    isValidData: PropTypes.func.isRequired
 
};

export default SendRequest;
        