import ValidatorChain from './ValidatorChain';

let validators = {

    required: true,
    length: {min: 2, max: 5},
    regex: {pattern: /[a-z]*/}

};

describe("Validation", () => {

    let validation = null;

    beforeEach(() => {

        validation = new ValidatorChain();

        validation.validator.regex = jest.fn().mockReturnValue('error1');
        validation.validator.isEmpty = jest.fn().mockReturnValue('');
        validation.validator.length = jest.fn().mockReturnValue('error3');

    });

    describe("validate", () => {

        test("We set value = 123hello, must to be validation.errors = ['Плохой символ...'], validation.value = 'hello'", () => {

            const result = validation.validate("123hello", validators);

            expect(validation.validator.regex).toHaveBeenCalledTimes(1);
            expect(validation.validator.regex).toHaveBeenCalledWith('123hello', {pattern: /[a-z]*/});

            expect(validation.validator.isEmpty).toHaveBeenCalledTimes(1);
            expect(validation.validator.isEmpty).toHaveBeenCalledWith('123hello');

            expect(validation.validator.length).toHaveBeenCalledTimes(1);
            expect(validation.validator.length).toHaveBeenCalledWith('123hello', {min: 2, max: 5});

            expect(result).toEqual(['error3', 'error1']);


        })

        test("We set value = hello, must to be result = []", () => {

            validation.validator.regex = jest.fn().mockReturnValue('');
            validation.validator.isEmpty = jest.fn().mockReturnValue('');
            validation.validator.length = jest.fn().mockReturnValue('');

            const result = validation.validate("hello", validators);

            expect(validation.validator.regex).toHaveBeenCalledTimes(1);
            expect(validation.validator.regex).toHaveBeenCalledWith('hello', {pattern: /[a-z]*/});

            expect(validation.validator.isEmpty).toHaveBeenCalledTimes(1);
            expect(validation.validator.isEmpty).toHaveBeenCalledWith('hello');

            expect(validation.validator.length).toHaveBeenCalledTimes(1);
            expect(validation.validator.length).toHaveBeenCalledWith('hello', {min: 2, max: 5});

            expect(result).toEqual([]);


        })

    })

});