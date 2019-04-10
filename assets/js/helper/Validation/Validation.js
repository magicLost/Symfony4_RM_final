import Validator from "./Validator/Validator";

class Validation
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

        this.errors = [];

        if(validators){

            for(let validatorName in validators){

                let result = '';

                switch(validatorName){
                    case 'regex': result = this.validator.regex(value, validators[validatorName]) ;break;
                    case 'length': result = this.validator.length(value, validators[validatorName]) ;break;
                    case 'required': result = this.validator.isEmpty(value) ;break;
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

        return this.errors;

    };

}

export default Validation;