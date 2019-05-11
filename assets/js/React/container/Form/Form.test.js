import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import Form from "./Form";
import Input from "../../component/UI/Form/Input/Input";
import SubmitButton from "../../component/UI/Form/SubmitButton/SubmitButton";
import FormValidator from "./Helper/FormValidator";
import FormBuilder from "./Helper/FormBuilder";


configure({adapter: new Adapter()});

/*labelValue={"Ваше имя"}
                            changeHandler={this.inputChangeHandler}
                            errorText={this.state.nameError}*/

const elements = {

    'name': {
        elementType: 'input',
        elementAttrs: {
            type: 'text',
            name: 'name',
            id: 'name123',
            placeholder: 'Олимпиада'
        },
        labelValue: "Ваше имя",
        validators: {
            required: true,
            length: {min: 2, max: 100},
            regex: {pattern: /[a-z]*/}
        },
        value: ''
    },
    'phone': {
        elementType: 'input',
        elementAttrs: {
            type: 'text',
            name: 'phone',
            id: 'phone123',
            placeholder: '586-34-23'
        },
        labelValue: "Ваш номер телефона",
        validators: {
            required: true,
            length: {min: 7, max: 50},
            regex: {pattern: /[0-9]*/}
        },
        value: ''
    }
};

describe("Form", () => {

    let wrapper = null;

    describe("Unit tests", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<Form
                elements={elements}
                submitUrl={"url://"}
                submitButtonValue={'Submit'}
                submitButtonHandler={() => {}}
                getCloseButton={() => {}}
                closeButtonHandler={() => {}}
            />);
        
        });


        describe("Constructor", () => {

            test("Must init builder, validator and create state", () => {

                expect(wrapper.instance().validator).toBeInstanceOf(FormValidator);
                expect(wrapper.instance().builder).toBeInstanceOf(FormBuilder);


                expect(wrapper.instance().state).toEqual({

                    name: {
                        value: '',
                        errors: []
                    },
                    phone: {
                        value: '',
                        errors: []
                    }
                });



            });

        });

        describe("inputChangeHandler", () => {


            const event = {};
            /*const event = {
                target: {
                    value: 'nick',
                    name: 'name'
                }
            };*/


            test("Must set state with value = nick", () => {


                wrapper.instance().inputChangeHandler(event, 'name', 'nick');

                expect(wrapper.instance().state).toEqual( {

                    name:  {
                            errors: [],
                            value: "nick",
                           },
                        phone:  {
                            errors: [],
                            value: "",
                        },
                 });

            });

            test("Must set state with value = 921-56-76 and error with ['Использованы недопустимые символы...']", () => {

               /* event.target.value = '921-56-76';
                event.target.name = 'phone';*/

                wrapper.instance().inputChangeHandler(event, 'phone', '921-56-76');

                expect(wrapper.instance().state).toEqual( {

                    name:  {
                        errors: [],
                        value: "",
                    },
                    phone:  {
                        errors: ['Использованы недопустимые символы...'],
                        value: "921-56-76",
                    },
                });

                wrapper.instance().inputChangeHandler(event, 'phone', '9216');

                expect(wrapper.instance().state).toEqual( {

                    name:  {
                        errors: [],
                        value: "",
                    },
                    phone:  {
                        errors: [],
                        value: "9216",
                    },
                });

            });


        });


        describe("submitFormHandler", () => {

            const event = {};
            event.preventDefault = jest.fn();
            event.stopPropagation = jest.fn();

            test("If grabErrors return errors, state must be fulled with errors", () => {

                //expect(wrapper.instance().state).toEqual({});
                const errors = {name: ["name_error1", "name_error2"], phone: ["phone_error1", "phone_error2"]};

                wrapper.instance().validator.getErrors = jest.fn().mockReturnValue(errors);
                wrapper.instance().validator.hasErrors = jest.fn().mockReturnValue(true);

                wrapper.instance().submitFormHandler(event);

                expect(event.preventDefault).toHaveBeenCalledTimes(1);
                expect(event.stopPropagation).toHaveBeenCalledTimes(1);

                expect(wrapper.instance().validator.hasErrors).toHaveBeenCalledTimes(1);
                expect(wrapper.instance().validator.hasErrors).toHaveBeenCalledWith(errors);

                expect(wrapper.instance().validator.getErrors).toHaveBeenCalledTimes(1);

                expect(wrapper.instance().state).toEqual( {

                       "name":  {
                            "errors":  [
                               "name_error1",
                               "name_error2",
                            ],
                            "value": "",
                       },
                        "phone":  {
                            "errors":  [
                               "phone_error1",
                               "phone_error2",
                             ],
                             "value": "",
                        },
                 });

            })

        });
    });
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<Form
                elements={elements}
                submitUrl={"url://"}
                submitButtonValue={'Submit'}
                submitButtonHandler={() => {}}
                getCloseButton={() => {}}
                closeButtonHandler={() => {}}
            />);
        
        });
    
        describe("Init render", () => {
    
            test("Must render two inputs and submit button", () => {
            
                expect(wrapper.find(Input)).toHaveLength(2);

                expect(wrapper.find(SubmitButton)).toHaveLength(1);

            
            });
    
        });
    
    });

});

