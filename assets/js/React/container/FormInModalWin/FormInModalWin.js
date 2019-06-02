import React from 'react';
import classes from './FormInModalWin.module.scss';
import PropTypes from 'prop-types';
import Modal from "../../component/UI/Modal/Modal";
import ZForm from "../ZForm/ZForm";
        
class FormInModalWin extends React.PureComponent
{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        
            <div className={classes.FormInModalWin}>

                <Modal
                    show={this.props.isShowForm}
                    backdropClickHandler={this.props.closeButtonClickHandler}
                >

                    <ZForm

                        elements={this.props.elements}
                        url={this.props.url}
                        submitButtonValue={this.props.submitButtonValue}
                        isCloseButton={true}
                        validateOnSubmit={this.props.validateOnSubmit}
                        createToken={this.props.createToken}
                        successMessage={this.props.successMessage}
                        onSubmitSuccess={this.props.onSubmitSuccess}
                        closeButtonClickHandler={this.props.closeButtonClickHandler}
                        hiddenFields={this.props.hiddenFields}

                    />


                </Modal>

            </div>
            
        );
    }
}

FormInModalWin.propTypes = {

    isShowForm: PropTypes.bool.isRequired,

    elements: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    submitButtonValue: PropTypes.string.isRequired,

    closeButtonClickHandler: PropTypes.func.isRequired,

    validateOnSubmit: PropTypes.func.isRequired,
    createToken: PropTypes.func.isRequired,

    successMessage: PropTypes.string.isRequired,
    onSubmitSuccess: PropTypes.func,

    hiddenFields: PropTypes.array
};

export default FormInModalWin;
        