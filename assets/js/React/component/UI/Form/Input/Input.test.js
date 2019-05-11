/*

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import Input from "./Input";

configure({adapter: new Adapter()});

describe("Input", () => {

    let wrapper = null;

    describe("Render and props test", () => {

        beforeEach(() => {

            wrapper = shallow(<Input />);

        });

        describe("", () => {

            test("", () => {



            });

        });

    });

});

*/


describe("Regex", () => {

    test("Regex name", () => {

        const regex = /[\sA-Za-zА-Яа-я0-9_-]+/;
        const strings = [
            "ab!!!",
            "!!!ab fg",
            " abc",
            "ab c",
            "_qer-123_",
            "Наталья Ивановна   345"
        ];
        const expected = [
            "ab",
            "ab fg",
            ' abc',
            'ab c',
            "_qer-123_",
            "Наталья Ивановна   345"
        ];

        let count = 0;

        for( let string of strings ){

            expect(string.match(regex)[0]).toEqual(expected[count]);

            count++;

        }

    })

    test("Regex phone", () => {

        const regex = /[0-9()+-]+/;
        const strings = [
            "345-34-12",
            "+7(921)-564-23-23",
            "+7(921) 564 23 23",
            "02",
            "_qer-123_",
            "Наталья Ивановна   345"
        ];
        const expected = [
            "345-34-12",
            "+7(921)-564-23-23",
            "+7(921)",
            "02",
            "-123",
            "345"
        ];

        let count = 0;

        for( let string of strings ){

            expect(string.match(regex)[0]).toEqual(expected[count]);

            count++;

        }

    })

});

