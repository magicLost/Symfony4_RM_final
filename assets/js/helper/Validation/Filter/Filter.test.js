import Filter from "./Filter";

describe("Filter", () => {

    let inputFilter = null;

    beforeEach(() => {

        inputFilter = new Filter();

    });

    describe('filter', () => {



        test("We set value = hello and regex = /[a-zA-Zа-яА-Я0-9_-]*/, must return { error: '', value: 'hello' } ", () => {

            expect(inputFilter.regex('hello', /[a-zA-Zа-яА-Я0-9_-]*/)).toEqual({ error: '', value: 'hello' });

        });

        test("We set value = !!hello and regex = /[a-zA-Zа-яА-Я0-9_-]*/, must return { error: 'Плохой символ...', value: 'hello' }", () => {

            expect(inputFilter.regex('!!hello', /[a-zA-Zа-яА-Я0-9_-]*/)).toEqual({ error: 'Плохой символ...', value: '' });

        });

        test("We set value = hello!! and regex = /[a-zA-Zа-яА-Я0-9_-]*/, must return { error: 'Плохой символ...', value: 'hello' }", () => {

            expect(inputFilter.regex('hello!!', /[a-zA-Zа-яА-Я0-9_-]*/)).toEqual({ error: 'Плохой символ...', value: 'hello' });

        });

        test("We set value = !hello and do not set regex, must show console error and return { error: 'Какая-то ошибочка...', value: '' }", () => {

            console.error = jest.fn();


            expect(inputFilter.regex('!hello')).toEqual({ error: 'Какая-то ошибочка...', value: '' });
            expect(console.error).toHaveBeenCalledTimes(1);

        });

    })

});