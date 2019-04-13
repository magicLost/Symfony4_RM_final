import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import HtmlParser from "./HtmlParser";

configure({adapter: new Adapter()});

const html_array = [

    {
        header: { type: "h2", text: "О КОМПАНИИ" },
        content: [
            "Основной составляющей нашей продукции является ",
            "^a",
            " и ",
            "^a",
            ". Поэтому к вашим услугам готовы предложить изготовление наклеек, временных вывесок, наклеек на автомобиль, интерьерные наклейки, постеры, листовки, печать на холсте, наклейки на окна, таблички и многое многое другое."
        ],
        links: [
            { title: "широкоформатная печать", href: "#"},
            { title: "плоттерная резка", href: "#"}
        ]
    }

];

describe("HtmlParser", () => {

    let wrapper = null;

    describe("Unit tests", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<HtmlParser />);
        
        });
    
        describe("renderParagraph", () => {
    
            test("Must return paragraph with anchors inside", () => {
            
                expect(wrapper.instance().renderParagraph(html_array[0])).toHaveLength(6);
            
            });
    
        });
    
    });
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<HtmlParser />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

