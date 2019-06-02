
class Validator
{

    isString = (value) => {

        return typeof value === 'string';

    };

    isFileList = (value) => {

        return typeof value === 'object' && value instanceof FileList;

    };



    isEmpty = (value, options) => {

        if(!this.isString(value)){
            console.error("We need string.");
            return '';
        }

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

        if(!this.isString(value)){
            console.error("We need string.");
            return '';
        }

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

    //options - { errorMessage: '', fileTypes: [] }
    fileType = (fileList, options) => {

        if(!this.isFileList(fileList)){

            console.error("We need FileList.");
            return '';

        }

        if(fileList.length === 0) return '';

        for(let i = 0; i < options.fileTypes.length; i++) {
            if(fileList[0].type === options.fileTypes[i]) {
                return '';
            }
        }

        return options.errorMessage;

    };

    //options - { errorMessage: '', maxSize: 5 * 1048576 }
    fileSize = (fileList, options) => {

        if(!this.isFileList(fileList)){

            console.error("We need FileList.");
            return '';

        }

        if(fileList.length === 0) return '';

        if(fileList[0].size > options.maxSize){

            return options.errorMessage;

        }

        return '';

    };

    fileNameRegex = (fileList, options) => {

        if(!this.isFileList(fileList)){

            console.error("We need FileList.");
            return '';

        }

        if(fileList.length === 0) return '';

        return this.regex(fileList[0].name, options);

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