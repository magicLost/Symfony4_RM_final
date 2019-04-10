import Validator from "./Validator";

describe("Validator", () => {

    let validator = null;

    beforeEach(() => {

        validator = new Validator();
        console.error = jest.fn();

    });

    describe('regex', () => {

        let regex = { pattern: /[a-zA-Zа-яА-Я0-9_-]*/};

        test("We set value = hello and regex = /[a-zA-Zа-яА-Я0-9_-]*!/, must return '' ", () => {

            expect(validator.regex('hello', regex)).toEqual('');

            expect(console.error).toHaveBeenCalledTimes(0);

        });

        test("We set value = !!hello and regex = /[a-zA-Zа-яА-Я0-9_-]*!/, must return 'Использованы недопустимые символы...'", () => {

            expect(validator.regex('!!hello', { pattern: "/[a-zA-Zа-яА-Я0-9_-]*!/"})).toEqual('Использованы недопустимые символы...');

            expect(console.error).toHaveBeenCalledTimes(0);

        });

        test("We set value = hello!! and regex = /[a-zA-Zа-яА-Я0-9_-]*!/, must return 'Использованы недопустимые символы...'", () => {

            expect(validator.regex('hello!!', { pattern: "/[a-zA-Zа-яА-Я0-9_-]*/"})).toEqual('Использованы недопустимые символы...');

            expect(console.error).toHaveBeenCalledTimes(0);

        });

        test("We set value = !hello and do not set regex, must show console error and return 'Какая-то ошибочка...'", () => {

            expect(validator.regex('!hello')).toEqual('');

            expect(console.error).toHaveBeenCalledTimes(1);

        });

    });

    describe("length", () => {

        let length = { min: 2, max: 7};

        test("We do not set options and must see console error", () => {

            expect(validator.length('!hello')).toEqual('');

            expect(console.error).toHaveBeenCalledTimes(1);

        });

        test("Must return 'Коротковато будет.' ", () => {

            expect(validator.length('o', length)).toEqual('Коротковато будет.');

            expect(console.error).toHaveBeenCalledTimes(0);

        });

        test("Must return 'Длинновато будет.' ", () => {

            expect(validator.length('Maxishmullerjan', length)).toEqual('Длинновато будет.');

            expect(console.error).toHaveBeenCalledTimes(0);

        });

    });

    describe("isEmpty", () => {

        test("Must return '' ", () => {

            expect(validator.isEmpty('Isoshmapenhuller')).toEqual('');

        });

        test("Must return 'Как-то пусто...' ", () => {

            expect(validator.isEmpty('')).toEqual('Как-то пусто...');

        });

    });

});