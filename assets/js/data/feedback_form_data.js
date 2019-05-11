export const elements =  {

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
            required: { errorMessage: "Как к вам обращаться?"},
            regex: {
                pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
                errorMessage: "Недопустимый символ."
            },
            length: {min: 2, max: 100, errorMessages: { min: "Минимум 2 символа.", max: "Максимум 100 символов."}}
        },
        value: ''
    },

    'email': {

        elementType: 'input',
        elementAttrs: {
            type: 'email',
            name: 'email',
            id: 'email123',
            placeholder: 'example@mail.ru'
        },
        labelValue: "Ваш электронный адрес",
        value: ''

    },

    'phone': {
        elementType: 'input',
        elementAttrs: {
            type: 'text',
            name: 'phone',
            id: 'phone123',
            placeholder: '921-586-34-23'
        },
        labelValue: "Ваш номер телефона",
        validators: {
            regex: {
                pattern: /[+0-9][0-9()-]*/,
                errorMessage: "Недопустимый символ."
            },
            length: {min: 7, max: 100, errorMessages: { min: "Минимум 7 символов.", max: "Максимум 100 символов."}}
        },
        value: ''
    },

    'comment': {
        elementType: 'textarea',
        resize: true,
        elementAttrs: {
            name: 'comment',
            id: 'comment123',
            placeholder: 'Я бы хотел(а)...',
            rows: 3
        },
        labelValue: "Ваш комментарий",
        value: ''
    }
};