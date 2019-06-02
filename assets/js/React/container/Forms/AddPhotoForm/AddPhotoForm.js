import React from 'react';
import classes from './AddPhotoForm.module.scss';

import PropTypes from 'prop-types';
import FormInModalWin from "../../FormInModalWin/FormInModalWin";

import { element, other_elements } from "../../../../data/editPhoto_data";


class AddPhotoForm extends React.PureComponent
{

    formElements = {};

    constructor(props){

        super(props);

        let i = 1;

        for( let size of this.props.photoSizes ){

            let name = "photo_" + size;

            this.formElements[name] = {...element};
            this.formElements[name].labelValue = 'Размер фото - ' + size;
            this.formElements[name].elementAttrs = {...element.elementAttrs};
            this.formElements[name].validators = {...element.validators};
            this.formElements[name].validators.fileSize = {...element.validators.fileSize};

            this.formElements[name].elementAttrs.name = name;
            this.formElements[name].elementAttrs.id = name;

            this.formElements[name].validators.fileSize.maxSize = this.formElements[name].validators.fileSize.maxSize * i;

            i++;

        }

        this.formElements = { ...other_elements, ...this.formElements };

        console.log(this.formElements);

    }

    createToken = (data) => {

        let result = '';

        for(let value in data){

            if(data[value] instanceof FileList){

                result += data[value][0].name;

            }

        }

        result = encodeURI(result);
        result = btoa(result);

        result = (result.length > 64) ? result.substr(0, 64) : result;

        return result;

    };

    validateOnSubmit = (data) => {

        for(let value in this.formElements){

            if(this.formElements[value].elementType === "file"){

                if(data[value] === '' || data[value].length !== 1){
                    //console.log(data[value]);
                    return 'Пустое поле или неверный файл.';
                }

            }




        }

        //console.log(data);

        return '';

    };

    
    render(){
        return (
        
            <div className={classes.AddPhotoForm}>

                <FormInModalWin

                    isShowForm={this.props.isShowForm}
                    elements={this.formElements}
                    url={this.props.url}
                    submitButtonValue={this.props.submitButtonValue}
                    validateOnSubmit={this.validateOnSubmit}
                    createToken={this.createToken}
                    successMessage={this.props.successMessage}
                    hiddenFields={this.props.hiddenFields}

                    onSubmitSuccess={this.props.onSubmitSuccess}
                    closeButtonClickHandler={this.props.closeButtonClickHandler}

                />

            </div>
            
        );
    }
}

AddPhotoForm.propTypes = {

    photoSizes: PropTypes.array.isRequired,

    isShowForm: PropTypes.bool.isRequired,
    //formElements: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,

    submitButtonValue: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired,

    closeButtonClickHandler: PropTypes.func.isRequired,

    onSubmitSuccess: PropTypes.func,

    hiddenFields: PropTypes.array

};

export default AddPhotoForm;
        