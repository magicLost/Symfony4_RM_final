
class Validator
{

    isString = (value, options) => {

        if(typeof value !== 'string'){

            console.error("We need string...");

        }

    };

    isEmpty = (value, options) => {

        this.isString(value);

        if(value.length === 0)
            if(options && options.errorMessage){
                return options.errorMessage;
            }else{
                return "Как-то пусто...";
            }
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

            if(options.errorMessages && options.errorMessages.min){
                return options.errorMessages.min;
            }else{
                return "Коротковато будет.";
            }

        }

        if(options.max && length > options.max){

            if(options.errorMessages && options.errorMessages.max){
                return options.errorMessages.max;
            }else{
                return "Длинновато будет.";
            }

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

            if(options.errorMessage){
                return options.errorMessage;
            }else{
                return 'Использованы недопустимые символы...';
            }

        }else if(match[0] !== value){

            if(options.errorMessage){
                return options.errorMessage;
            }else{
                return 'Использованы недопустимые символы...';
            }

        }

        return '';

    };



}

export default Validator;