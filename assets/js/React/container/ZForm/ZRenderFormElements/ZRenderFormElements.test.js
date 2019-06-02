//get array with form elements and render it

import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import ZRenderFormElements from "./ZRenderFormElements";

import Textarea from "../../../component/UI/Form/Textarea/Textarea";
import FileInput from "../../../component/UI/Form/FileInput/FileInput";
import Input from "../../../component/UI/Form/Input/Input";
import {form_elements} from "../../../../data/test/form_elements";



configure({adapter: new Adapter()});


const state = {

    name: {
        error: '',
        value: ''
    },

    comment: {
        error: '',
        value: ''
    },

    photo: {
        error: '',
        value: ''
    },

};


describe("ZRenderFormElements", () => {

    let wrapper = null;

   /* describe("Unit tests", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<ZRenderFormElements />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });*/
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<ZRenderFormElements elements={form_elements} inputChangeHandler={() => {}} state={state} />);
        
        });
    
        describe("Must render one Input, one FileInput and one Textarea", () => {
    
            test("", () => {
            
                expect(wrapper.find(FileInput)).toHaveLength(1);
                expect(wrapper.find(Input)).toHaveLength(1);
                expect(wrapper.find(Textarea)).toHaveLength(1);

            });
    
        });
    
    });

});

