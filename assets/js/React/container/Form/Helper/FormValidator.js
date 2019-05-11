import Validation from "../../../helper/Validation/Validation";

class FormValidator
{

    validation = null;
    validationsOnChange = {};
    validationsOnSubmit = {};

    constructor(elements){

        this.validation = new Validation();

        this.setValidations(elements);

    }

    validate = (value, validators) => {

        return this.validation.validate(value, validators);

    };

    getValues = (state, elements) => {

        let values = {};

        for(let element in elements){

            if(state.hasOwnProperty(element)){

                values[element] = state[element].value;

            }else{

                console.error('Bad element name == ' + element);

            }

        }

        return values;

    };

    getErrors = (state) => {

        let elementsErrors = {};


        for(let elementName in this.validationsOnSubmit){

            if(!state.hasOwnProperty(elementName)){
                console.error("Bad form element name - " + elementName);
                return;
            }

            let value = state[elementName].value;

            let errors = this.validation.validate(value, this.validationsOnSubmit[elementName]);

            /* console.log(elementName);
             console.log(errors);*/


            if(errors.length > 0){

                elementsErrors[elementName] = errors;

            }

        }

        return elementsErrors;

    };

    hasErrors = (errors) => {

        if(typeof errors !== 'object' || Array.isArray(errors)){
            console.error("We need object");
            return false;
        }



        return Object.getOwnPropertyNames(errors).length > 0;

       /* let count  = 0;

        for(let prop in errors){

            count++;

        }

        return count > 0;*/

    };

    setValidations = (elements) => {

        for(let element in elements){

            if(elements[element].validation){

                if(elements[element].validation.onChange){

                    this.validationsOnChange[element] = elements[element].validation.onChange;

                }

                if(elements[element].validation.onSubmit){

                    this.validationsOnSubmit[element] = elements[element].validation.onSubmit;

                }

            }

        }

    };

}

export default FormValidator;