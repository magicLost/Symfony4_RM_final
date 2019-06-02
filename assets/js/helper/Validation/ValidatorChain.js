import Validator from "./Validator/Validator";

class ValidatorChain
{
    validator = null;

    //validators = {};

    //errors = [];
    //value = '';

    constructor(){

       /* if(!config)
            console.error("Need config");

        if(config)
            this.validators = config;*/

        this.validator = new Validator();

    }

    validate = (value, validators) => {

        let error = '';

        if(validators){

            if(validators["required"] === undefined && value === ''){

                return '';

            }

            for(let validatorName in validators){

                switch(validatorName){

                    case 'regex': error = this.validator.regex(value, validators[validatorName]);break;
                    case 'length': error = this.validator.length(value, validators[validatorName]);break;
                    case 'required': error = this.validator.isEmpty(value, validators[validatorName]);break;

                    case 'fileType': error = this.validator.fileType(value, validators[validatorName]);break;
                    case 'fileSize': error = this.validator.fileSize(value, validators[validatorName]);break;
                    case 'fileNameRegex': error = this.validator.fileNameRegex(value, validators[validatorName]);break;

                    default: console.error("Bad validator name  - " + validatorName);
                }

                if(error) return error;

            }

        }else{

            console.error("No validators...");

        }

        return error;

        /*this.errors = [];

        if(validators){

            for(let validatorName in validators){

                let result = '';

                switch(validatorName){
                    case 'regex': result = this.validator.regex(value, validators[validatorName]) ;break;
                    case 'length': result = this.validator.length(value, validators[validatorName]) ;break;
                    case 'required':
                        if(validators[validatorName] === false && value === ''){
                            return [];
                        }else{
                            result = this.validator.isEmpty(value, validators[validatorName]) ;break;
                        }

                    default: console.error("Bad validator name  - " + validatorName); result = ''; break;
                }

                //console.log(result);
                //console.log(validators[index].pattern);

                if(result){
                    this.errors.push(result);
                }

            }

        }else{

            console.error("No validators...");

        }

        return this.errors;*/

    };

}

export default ValidatorChain;