
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import ErrorRequest from "./ErrorRequest";

configure({adapter: new Adapter()});

describe("ErrorRequest", () => {

    let wrapper = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<ErrorRequest />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        