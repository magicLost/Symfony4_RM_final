const fs = require('fs');

const args = process.argv.slice(2);

//npm run create:class -- Render container/Render
class CreateReactClass
{

    constructor(className, dir){

        console.log("className = ", className);
        console.log("dir = ", dir);

        this.mainDir = './assets/js/React/';
        this.className = className;
        //TODO check if first char in dir equal "/"
        //TODO check if last char in dir equal "/"
        this.dir = this.mainDir + dir;

        this.create();
    }

    create(){

        if ( this.className && this.dir ) {

            //create class name dir
            this.createDir();
            //create class file
            this.createClassFile();
            //create scss file
            this.createScssFile();
            //create .test file
            this.createTestFile();

        }else{

            throw new Error("Empty className or dir...");

        }

    };

    createDir(){

        if (!fs.existsSync(this.dir)){
            fs.mkdirSync(this.dir);
        }

    };

    createClassFile(){

        const content = `import React from 'react';
import classes from './${this.className}.module.scss';
import PropTypes from 'prop-types';
        
class ${this.className} extends React.Component
{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        
            <div className={classes.${this.className}}></div>
            
        );
    }
}

${this.className}.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default ${this.className};
        `;

        const fileName = this.dir + '/' + this.className + '.js';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись main файла завершена. Содержимое файла:");

        });

    };

    createScssFile(){

        const content = `.${this.className}{
            
}`;

        const fileName = this.dir + '/' + this.className + '.module.scss';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись css файла завершена. Содержимое файла:");

        });

    };

    createTestFile(){

        const content = `/*
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import ${this.className} from "./${this.className}";

configure({adapter: new Adapter()});

describe("${this.className}", () => {

    let wrapper = null;

    describe("Unit tests", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<${this.className} />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<${this.className} />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

       */ `;

        const fileName = this.dir + '/' + this.className + '.test.js';

        //console.log(fileName);
        //console.log(content);

        fs.writeFile(fileName, content, (error) => {

            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись тестогого файла завершена. Содержимое файла:");

        });

    };


}

const createClass = new CreateReactClass(...args);






