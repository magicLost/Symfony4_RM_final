
//FormElements - render form elements from array of elements
//Form - render FormElements and submit and clear button
//FeedBackForm - request to server


class FormHelper {

    getFormElementsForState = (elements) => {

        const state = {
            formElements: {}
        };

        for(let element in elements){

            if(elements[element].elementType === 'file'){

                state.formElements[element] = { value: '', fileList: null, error: ''};

            }

            state.formElements[element] = { value: elements[element].value, error: ''};


        }

        return state;
    };

    //errors - { 'phone': 'Bad symbol' }
    getFormElementsErrors = (errors, prevState) => {

        const formElements = {};

        for(let elementName in errors){

            formElements[elementName] = {

                value: prevState[elementName].value,
                error: errors[elementName],

            }

        }

        return formElements;

    };



}

export default FormHelper;