import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import React from 'react';
import ControlsFeature, {formType} from "./ControlsFeature";

configure({adapter: new Adapter()});

describe("ControlsFeature", () => {

    let wrapper = null;

    describe("Unit tests", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<ControlsFeature
                itemClickHandler={() => {  }}
                formType={formType.TOP_HALF_CIRCLE}
                itemsLength={4}
            />);
        
        });
    
        describe("_getDegrees", () => {
    
            test("", () => {

                const instance = wrapper.instance();
                instance.degreesAll = 180;
                instance.degreesMarga = 0;
                //instance.itemsLength = 4;

                expect(instance._getDegrees(0)).toEqual(0);
                expect(instance._getDegrees(1)).toEqual(60);
                expect(instance._getDegrees(2)).toEqual(120);
                expect(instance._getDegrees(3)).toEqual(180);

            });
    
        });
    
    });
    
  /*  describe("Render and props test", () => {
    
        beforeEach(() => {
        
            wrapper = shallow(<ControlsFeature />);
        
        });
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });*/

});

