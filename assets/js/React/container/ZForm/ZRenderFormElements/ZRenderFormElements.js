import React from 'react';
import classes from './ZRenderFormElements.module.scss';
import PropTypes from 'prop-types';
import Input from "../../../component/UI/Form/Input/Input";
import Textarea from "../../../component/UI/Form/Textarea/Textarea";
import FileInput from "../../../component/UI/Form/FileInput/FileInput";
        
class ZRenderFormElements extends React.PureComponent
{
    render(){

        const elements = this.renderElements();

        return (

            <div className={classes.ZRenderFormElements}>

                { elements }

            </div>

        );
    }

    renderElements = () => {

        const elements = [];

        for(let element in this.props.elements){

            let config = this.props.elements[element];

            switch(config.elementType){

                case 'input':
                    elements.push(<Input
                        key={classes.ZRenderFormElements + element}
                        elementAttrs={config.elementAttrs}
                        labelValue={config.labelValue}
                        value={this.props.state[element].value}
                        changeHandler={this.props.inputChangeHandler}
                        error={this.props.state[element].error}
                    />); break;

                case 'textarea':
                    elements.push(<Textarea
                        key={classes.ZRenderFormElements + element}
                        resize={config.resize}
                        elementAttrs={config.elementAttrs}
                        labelValue={config.labelValue}
                        value={this.props.state[element].value}
                        changeHandler={this.props.inputChangeHandler}
                        error={this.props.state[element].error}
                    />); break;
                case 'file': elements.push(<FileInput
                        key={classes.ZRenderFormElements + element}
                        elementAttrs={config.elementAttrs}
                        labelValue={config.labelValue}
                        changeHandler={this.props.inputChangeHandler}
                        error={this.props.state[element].error}
                    />); break;
                case 'select': console.log('select'); break;
                case 'checkbox': console.log('checkbox'); break;

                default: console.error("No implementation for element == " + element);

            }

        }

        return elements;

    };
}

ZRenderFormElements.propTypes = {

    elements: PropTypes.object.isRequired,
    inputChangeHandler: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired

};

export default ZRenderFormElements;
        