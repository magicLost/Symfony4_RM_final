import React from 'react';
import classes from './FormElements.module.scss';
import Input from "../../../component/UI/Form/Input/Input";
import Textarea from "../../../component/UI/Form/Textarea/Textarea";
import FileInput from "../../../component/UI/Form/FileInput/FileInput";
        
const formElements = ({formElements, formElementsState, inputChangeHandler}) => {

    const elements = [];

    for(let element in formElements){

        let config = formElements[element];

        switch(config.elementType){

            case 'input':
                elements.push(<Input
                    key={classes.FormElements + element}
                    elementAttrs={config.elementAttrs}
                    labelValue={config.labelValue}
                    value={formElementsState[element].value}
                    changeHandler={inputChangeHandler}
                    error={formElementsState[element].error}
                />); break;

            case 'textarea':
                elements.push(<Textarea
                    key={classes.FormElements + element}
                    resize={config.resize}
                    elementAttrs={config.elementAttrs}
                    labelValue={config.labelValue}
                    value={formElementsState[element].value}
                    changeHandler={inputChangeHandler}
                    error={formElementsState[element].error}
                />); break;
            case 'file': elements.push(<FileInput
                key={classes.FormElements + element}
                elementAttrs={config.elementAttrs}
                labelValue={config.labelValue}
                changeHandler={inputChangeHandler}
                error={formElementsState[element].error}
            />); break;
            case 'select': console.log('select'); break;
            case 'checkbox': console.log('checkbox'); break;

            default: console.error("No implementation for element == " + element);

        }

    }
    
    return (
        
        <div className={classes.FormElements}>
            
            { elements }
            
        </div>
            
    );
};

export default formElements;
        