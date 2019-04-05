const fs = require('fs');

const args = process.argv.slice(2);

//npm run create:func -- Render component/Render
class CreateReactFunc
{

    constructor(funcName, dir){

        if ( funcName && dir ) {

            this.mainDir = './assets/js/React/';
            let funcFirstLetter = funcName[0];
            let funcOtherLetters = funcName.substr(1);
            this.funcName = funcFirstLetter.toLowerCase() + funcOtherLetters;
            this.funcFileName = funcFirstLetter.toUpperCase() + funcOtherLetters;


            //TODO check if first char in dir equal "/"
            //TODO check if last char in dir equal "/"
            this.dir = this.mainDir + dir;

            this.create();

        }else{

            throw new Error("Empty funcName or dir...");

        }

    }



    create(){

        //create class name dir
        this.createDir();
        //create class file
        this.createClassFile();
        //create scss file
        this.createScssFile();
        //create .test file
        this.createTestFile();

    };

    createDir(){

        if (!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir);
        }

    };

    createClassFile(){

        const content = `import React from 'react';
import classes from './${this.funcFileName}.module.scss';
        
const ${this.funcName} = ({}) => {
    return (
        
        <div className={classes.${this.funcFileName}}></div>
            
    );
};

export default ${this.funcName};
        `;

        const fileName = this.dir + '/' + this.funcFileName + '.js';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись main файла завершена. Содержимое файла:");

        });

    };

    createScssFile(){

        const content = `.${this.funcFileName}{
            
}`;

        const fileName = this.dir + '/' + this.funcFileName + '.module.scss';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись css файла завершена. Содержимое файла:");

        });

    };

    createTestFile(){

        const content = `
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import ${this.funcFileName} from "./${this.funcFileName}";

configure({adapter: new Adapter()});

describe("${this.funcFileName}", () => {

    let wrapper = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<${this.funcFileName} />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        `;

        const fileName = this.dir + '/' + this.funcFileName + '.test.js';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись тестогого файла завершена. Содержимое файла:");

        });

    };


}

new CreateReactFunc(...args);






