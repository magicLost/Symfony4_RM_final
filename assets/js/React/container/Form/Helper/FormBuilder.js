import Input from "../../../component/UI/Form/Input/Input";
import classes from "../Form.module.scss";
import Textarea from "../../../component/UI/Form/Textarea/Textarea";
import React from "react";

class FormBuilder
{

    renderElements = (elementsToRender, state, inputChangeHandler) => {

        const elements = [];

        for(let element in elementsToRender){

            let config = elementsToRender[element];

            switch(config.elementType){

                case 'input':
                    elements.push(<Input
                        key={classes.Form + element}
                        elementAttrs={config.elementAttrs}
                        labelValue={config.labelValue}
                        value={state[element].value}
                        changeHandler={inputChangeHandler}
                        errors={state[element].errors}
                    />); break;

                case 'textarea':
                    elements.push(<Textarea
                        key={classes.Form + element}
                        resize={config.resize}
                        elementAttrs={config.elementAttrs}
                        labelValue={config.labelValue}
                        value={state[element].value}
                        changeHandler={inputChangeHandler}
                        errors={state[element].errors}
                    />); break;
                case 'select': console.log('select'); break;
                case 'checkbox': console.log('checkbox'); break;

                default: console.error("No implementation for element == " + element);

            }

        }

        return elements;

    };

    getStartState = (elements) => {

        const state = {};

        for(let element in elements){

            state[element] = { value: elements[element].value, errors: []};

        }

        return state;
    };



}

export default FormBuilder;