import FormValidator from "./FormValidator";
import Validation from "../../../helper/Validation/Validation";


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
        validation: {
            onSubmit: {
                required: true,
                length: {min: 2, max: 100}
            },
            onChange: {
                regex: {pattern: /[a-z]*/}
            }
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
        validation: {
            onSubmit: {
                required: true,
                length: {min: 7, max: 50}
            },
            onChange: {
                regex: {pattern: /[0-9]*/}
            }
        },
        value: ''
    }
};

const state = {
    visible: false,
    loading: [1, 3, 4],
    name: {
        value: 'Nick',
        errors: []
    },
    phone: {
        value: '569-12-34',
        errors: []
    }
};



describe("FormValidator", () => {

    let formValidator = null;

    beforeEach(() => {

        formValidator = new FormValidator(elements);

    });

    describe("Constructor", () => {

        test("Must init validator and validations arrays", () => {

            /*
            * validation = null;
    validationsOnChange = {};
    validationsOnSubmit = {};
            * */

            expect(formValidator.validation).toBeInstanceOf(Validation);

            expect(formValidator.validationsOnChange).toHaveProperty('name');
            expect(formValidator.validationsOnChange).toHaveProperty('phone');

            expect(formValidator.validationsOnSubmit).toHaveProperty('name');
            expect(formValidator.validationsOnSubmit).toHaveProperty('phone');

        });

    });

    describe("setValidations", () => {

        test("We must init validationsOnChange and validationsOnSubmit", () => {

            formValidator.setValidations(elements);

            expect(formValidator.validationsOnChange).toEqual({
                name: {
                    regex: {pattern: /[a-z]*/}
                },
                phone: {
                    regex: {pattern: /[0-9]*/}
                }
            } );

            expect(formValidator.validationsOnSubmit).toEqual({
                name: {
                    required: true,
                    length: {min: 2, max: 100}
                },
                phone: {
                    required: true,
                    length: {min: 7, max: 50}
                }
            } );

        });

    });

    describe("getValues", () => {

        test("Must return object with elements name and value", () => {

            const result = formValidator.getValues(state, elements);

            expect(result).toEqual({"name": "Nick", "phone": "569-12-34" });

        });

    });

    describe("getErrors", () => {

        test("If valid must return {}", () => {

            formValidator.validation.validate = jest.fn().mockReturnValue([]);

            const result = formValidator.getErrors(state);

            expect(formValidator.validation.validate).toHaveBeenCalledTimes(2);

            expect(result).toEqual({});

        });

        test("If not valid must return obj with errors", () => {

            formValidator.validation.validate = jest.fn()
                .mockReturnValueOnce(['name_error1', "name_error2"])
                .mockReturnValueOnce(['phone_error1', "phone_error2"])
            ;

            const result = formValidator.getErrors(state);

            expect(formValidator.validation.validate).toHaveBeenCalledTimes(2);

            expect(result).toEqual({"name": ["name_error1", "name_error2"], "phone": ["phone_error1", "phone_error2"]});

        });

    });

    describe("hasErrors", () => {

        console.error = jest.fn();

        test("If empty errors array - no errors", () => {

            const result = formValidator.hasErrors({});

            expect(console.error).toHaveBeenCalledTimes(0);
            expect(result).toEqual(false);

        });

        test("If not empty errors array - has errors", () => {

            const result = formValidator.hasErrors({hello: 'buy'});

            expect(console.error).toHaveBeenCalledTimes(0);
            expect(result).toEqual(true);

        });

        test("If given argument did not object we must see console error and false", () => {

            let result = formValidator.hasErrors('hello');

            expect(console.error).toHaveBeenCalledTimes(1);
            expect(result).toEqual(false);

            result = formValidator.hasErrors(123);

            expect(console.error).toHaveBeenCalledTimes(2);
            expect(result).toEqual(false);

            result = formValidator.hasErrors([]);

            expect(console.error).toHaveBeenCalledTimes(3);
            expect(result).toEqual(false);

        });

    });

});