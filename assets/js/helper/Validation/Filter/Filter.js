
class Filter
{

    ///[a-zA-Zа-яА-Я0-9_-]*/
    regex = (value, regex) => {

        if(!regex){

            console.error("No regex");
            return { error: 'Какая-то ошибочка...', value: ''};

        }

        if(value.length === 0)
            return {
                error: '',
                value: value
            };

        const match = value.match(regex);

        if(match === null){
            return {
                error: 'Плохой символ...',
                value: ''
            };
        }else if(match[0] !== value){
            return {
                error: 'Плохой символ...',
                value: match[0]
            };
        }

        return {
            error: '',
            value: value
        };

    };


}

export default Filter;