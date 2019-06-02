export const element = {

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

};

export const other_elements = {

    title: {
        elementType: 'input',
        elementAttrs: {
            type: 'text',
            name: 'title',
            id: 'title123',
            placeholder: 'Наша супер работа.'
        },
        labelValue: "Заголовок для описания.",
            value: ''
    },
    desc: {
        elementType: 'textarea',
        resize: true,
        elementAttrs: {
            name: 'desc',
            id: 'desc123',
            placeholder: 'Вышито на супер материле золотыми буквами.',
            rows: 3
        },
        labelValue: "Описание фотографии.",
            value: ''
    },

    price: {
        elementType: 'input',
        elementAttrs: {
            type: 'number',
            name: 'price',
            id: 'price123',
            placeholder: '1 000 000'
        },
        labelValue: "Примерная стоимость.",
            value: ''
},

};