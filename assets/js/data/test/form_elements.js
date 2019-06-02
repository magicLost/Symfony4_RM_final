export const form_elements =  {

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
    },

    'photo': {

        elementType: 'file',
        elementAttrs: {
            type: 'file',
            name: 'photo1',
            id: 'photo1',
            placeholder: 'Выберите файл...'
        },
        labelValue: "Фото",
        validators: {
            //required: { errorMessage: "Нет файла для этого разрешения"},
            fileType: {
                fileTypes: [
                    'image/jpeg',
                    'image/jpg',
                    'image/png'
                ],
                errorMessage: "Недопустимый тип файла."
            },
            fileSize: {
                maxSize: 100000,
                errorMessage: 'Слишком большой файл'
            },
            fileNameRegex: {
                pattern:  /[a-zA-Z0-9-._]*/,
                errorMessage: 'Недопустимый символ в имени файла.'
            }
        },
        value: ''

    }
};
