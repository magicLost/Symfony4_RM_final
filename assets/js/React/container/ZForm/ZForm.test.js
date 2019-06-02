
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import ZForm from "./ZForm";
import ZRenderFormElements from "./ZRenderFormElements/ZRenderFormElements";
import SubmitButton from "../../component/UI/Form/SubmitButton/SubmitButton";
import CloseButton from "../../component/UI/CloseButton/CloseButton";
import SendPostRequest from "../SendPostRequest/SendPostRequest";
import {form_elements} from "../../../data/test/form_elements";

configure({adapter: new Adapter()});

describe("ZForm", () => {

    let wrapper = null;

  /*  describe("Unit tests", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<ZForm />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });*/
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<ZForm
                elements={form_elements}
                url={"http://public.local/admin/photo"}
                submitButtonValue={'Go'}
                isCloseButton={true}
                validateOnSubmit={() => {}}
                createToken={() => {}}
                successMessage={'Success'}
            />);
        
        });
    
        describe("Render on creation", () => {
    
            test("Render ZRenderFormElements, SubmitButton - two, CloseButton, Not render - SendPostRequest", () => {

                expect(wrapper.find(ZRenderFormElements)).toHaveLength(1);
                expect(wrapper.find(SubmitButton)).toHaveLength(2);
                expect(wrapper.find(CloseButton)).toHaveLength(1);

                expect(wrapper.find(SendPostRequest)).toHaveLength(0);

            });
    
        });
    
    });

});

