
class Validator
{

    isString = (value) => {

        if(typeof value !== 'string'){

            console.error("We need string...");

        }

    };

    isEmpty = (value) => {

        this.isString(value);

        if(value.length === 0)
            return "Как-то пусто...";
        else
            return "";

    };

    length = (value, options) => {

        this.isString(value);

        if(!options){

            console.error("Where is options, MFK...");
            return '';

        }

        const length = value.length;

        if(options.min && length < options.min){

            return "Коротковато будет.";

        }

        if(options.max && length > options.max){

            return "Длинновато будет.";

        }

        return "";

    };

    regex = (value, options) => {

        this.isString(value);

        if(!options || !options.pattern){

            console.error("Where is options with pattern, MFK...");
            return '';

        }

        if(value.length === 0)
            return "";

        const match = value.match(options.pattern);

        if(match === null){

            return 'Использованы недопустимые символы...';

        }else if(match[0] !== value){

            return 'Использованы недопустимые символы...';

        }

        return '';

    };



}

export default Validator;