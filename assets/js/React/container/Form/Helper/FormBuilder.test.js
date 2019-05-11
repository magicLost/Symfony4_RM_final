import FormBuilder from "./FormBuilder";

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

const stateGlobal = {
    visible: false,
    loading: [1, 3, 4],
    name: {
        value: 'Nick',
        errors: []
    },
    phone: {
        value: '569-12-34',
        errors: ['hello']
    }
};


describe("FromBuilder", () => {

    let builder = null;

    beforeEach(() => {

        builder = new FormBuilder();

    });

    describe("getStartState", () => {

        test("", () => {

            const state = builder.getStartState(elements);
            expect(state).toEqual( {
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

    describe("renderElements", () => {

        test("Must return array with two react components", () => {

            const renderElements = builder.renderElements(elements, stateGlobal, () => {});
            expect(renderElements).toHaveLength(2);

            expect(renderElements[0].props.value).toEqual('Nick');
            expect(renderElements[0].props.errors).toEqual([]);

            expect(renderElements[1].props.value).toEqual('569-12-34');
            expect(renderElements[1].props.errors).toEqual(['hello']);


        });

    });

});