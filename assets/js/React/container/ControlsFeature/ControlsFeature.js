import React from 'react';
import classes from './ControlsFeature.module.scss';
import PropTypes from 'prop-types';
import MathF from "../../../helper/MathF";

import icons from "./../../../../static/icons/ICONS.svg";

export const type = {

    TEXT: "TEXT",
    SVG: "SVG"

};

export const formType = {

    CIRCLE: "CIRCLE",

    TOP_HALF_CIRCLE: 'TOP_HALF_CIRCLE',
    BOTTOM_HALF_CIRCLE: 'BOTTOM_HALF_CIRCLE',
    RIGHT_HALF_CIRCLE: 'RIGHT_HALF_CIRCLE',
    LEFT_HALF_CIRCLE: 'LEFT_HALF_CIRCLE',

    TOP_RIGHT_QUARTER: "TOP_RIGHT_QUARTER",
    TOP_LEFT_QUARTER: "TOP_LEFT_QUARTER",
    BOTTOM_RIGHT_QUARTER: "BOTTOM_RIGHT_QUARTER",
    BOTTOM_LEFT_QUARTER: "BOTTOM_LEFT_QUARTER",

};

class ControlsFeature extends React.PureComponent
{

    itemsLength = 0;
    radius = 100;

    //-----------change by type

    mainItemClass = '';
    itemClass = '';

    //-------------

    //---------change by formType

    itemsLengthForDegreesCalc = 0;

    degreesAll = 0;
    degreesMarga = 0;

    topRightBgClasses = classes.TopRight;
    topLeftBgClasses = classes.TopLeft;
    bottomRightBgClasses = classes.BottomRight;
    bottomLeftBgClasses = classes.BottomLeft;

    titleStyle = null;

    //---------------

    state = {

        isShowItems: false,
        title: '',
        mainItemText: 'Главное'

    };

    constructor(props){

        super(props);

        //set settings by type - bgItems visibility, degreesAll, degreesMarga

        this.itemsLength = this.props.itemsLength;
        this.itemsLengthForDegreesCalc = this.itemsLength - 1;

        this._config();

    }

    /* SHOW ITEM MOUSE EVENTS */
    mainItemsMouseDownHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.setState((prevState) => {

            if(!prevState.isShowItems){

                window.addEventListener('mouseup', this.windowMouseUpHandler, false);
                return { isShowItems: true };

            }

        });

    };

    /* SHOW ITEM TOUCH EVENTS */
    mainItemTouchStartHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.setState((prevState) => {

            if(!prevState.isShowItems){

                return {
                    isShowItems: true,
                    isTouchStart: true
                };

            }

        });

    };

    mainItemTouchEndHandler = (event) => {

        //console.log("showItemTouchEndHandler");

        //console.log("showItemTouchEndHandler");

        event.preventDefault();
        event.stopPropagation();

        const touch = event.changedTouches[0];

        this.setState((prevState) => {

            if(prevState.isShowItems){

                let index = -1;

                const target = document.elementFromPoint(touch.clientX, touch.clientY);


                if(target && target.dataset && target.dataset.index){

                    const index = parseInt(target.dataset.index);
                    console.log("call this.props.setActiveCarouselIndex with index == " + index);
                    this.props.itemClickHandler(index);

                }

                if(this.props.type === type.TEXT){

                    const mainItemText = (index !== -1) ? this.props.items[index] : prevState.mainItemText;

                    return {
                        isShowItems: false,
                        mainItemText: mainItemText,
                        title: ''
                    }

                }

                return {
                    isShowItems: false,
                    title: ''
                };

            }

        });

    };

    mainItemTouchMoveHandler = (event) => {

        //console.log("showItemTouchMoveHandler");

        event.preventDefault();
        event.stopPropagation();

        const touch = event.changedTouches[0];

        this.setState((prevState) => {

            if(prevState.isShowItems){

                const target = document.elementFromPoint(touch.clientX, touch.clientY);

                if(target){

                    if(target.dataset && target.dataset.name){
                        //console.log("call this.props.setActiveCarouselIndex with index == " + target.dataset.index);


                        const name = target.dataset.name;

                        if(prevState.title !== name){
                            return { title: name};
                        }

                        return null;

                    }else{

                        if(prevState.title !== ''){
                            return { title: ''};
                        }

                        return null;

                    }

                }

            }

            return null;

        });

    };


    /* ITEMS MOUSE EVENTS */

    itemMouseUpHandler = (event) => {

        let pageX = event.pageX;
        let pageY = event.pageY;

        this.setState((prevState) => {

            if(prevState.isShowItems){

                let index = -1;

                const target = document.elementFromPoint(pageX, pageY);


                if(target && target.dataset && target.dataset.index){

                    index = parseInt(target.dataset.index);
                    console.log("call this.props.setActiveCarouselIndex with index == " + index);
                    this.props.itemClickHandler(index);

                }

                if(this.props.type === type.TEXT){

                    const mainItemText = (index !== -1) ? this.props.items[index] : prevState.mainItemText;

                    return {
                        isShowItems: false,
                        mainItemText: mainItemText,
                        title: ''
                    }

                }

                return {
                    isShowItems: false,
                    title: ''
                };

            }

        });

    };

    itemMouseEnter = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("itemMouseEnter");

        const name = event.target.dataset.name;

        this.setState((prevState) => {

            if(prevState.title !== name){

                return {
                    title: name
                };

            }

            return null;

        });

    };

    itemMouseLeave = (event) => {

        console.log("itemMouseEnter");

        event.preventDefault();
        event.stopPropagation();

        this.setState({
            title: ''
        });

    };

    windowMouseUpHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.setState((prevState) => {

            if(prevState.isShowItems){

                window.removeEventListener('mouseup', this.windowMouseUpHandler, false);
                return {
                    isShowItems: false,
                    title: ''
                };

            }

        });

    };
    
    render(){

        console.log("controls feature render");

        let title = '';
        let bgStyle = null;

        let mainItem = this.getMainItem();
        const items = this.getItems();

        if(this.state.isShowItems){

            bgStyle = {
                transform: 'scale(10.5, 10.5)',
                opacity: 1,
            } ;

            title = this.getTitle();

        }

        return (
        
            <div className={classes.ControlsFeature}>

                { title }

                <div
                    className={classes.ItemBG}
                    style={bgStyle}
                >
                    <div className={this.topLeftBgClasses}> </div>
                    <div  className={this.topRightBgClasses}> </div>
                    <div  className={this.bottomLeftBgClasses}> </div>
                    <div  className={this.bottomRightBgClasses}> </div>
                </div>

                { items }

                { mainItem }

            </div>
            
        );
    }

    getMainItem = () => {

        let mainItemContent = '';
        let className = classes.ItemMain;
        let onTouchMove = null;

        if(this.props.isShowTitle){

            onTouchMove = this.mainItemTouchMoveHandler;

        }

        if(this.props.isMainItemText === true){

            mainItemContent = this.state.mainItemText;
            className = classes.ItemMainText;

        }else{
            mainItemContent = (
                <svg
                    className={classes.Svg}
                    width="5"
                    height={"5"}
                >
                    <use  xlinkHref={ icons + "#hamburger" }/>
                </svg>
            )
        }

        return (

            <button
                className={className}
                onMouseDown={this.mainItemsMouseDownHandler}
                onTouchStart={this.mainItemTouchStartHandler}
                onTouchEnd={this.mainItemTouchEndHandler}
                onTouchMove={onTouchMove}
            >
                { mainItemContent }
            </button>

        );

    };

    getTitle = () => {

        let titleStyle = null;

        if(this.props.isShowTitle){

            titleStyle = {...this.titleStyle};

            if(this.state.title !== ''){

                titleStyle.opacity = 1;
                //title = this.state.title;

            }

            return (

                <div
                    style={titleStyle}
                    className={classes.Title}
                >
                    <div><p>{ this.state.title }</p></div>
                </div>

            );

        }

        return null;

    };

    getItems = () => {



        return this.props.items.map((value, index) => {

            let style = null;

            let onMouseEnter = null;
            let onMouseLeave = null;

            if(this.state.isShowItems){

                let degrees = this._getDegrees(index);


                let translate = this._getTranslateByCircle(degrees);

                style = { transform: translate, opacity: 1 };
                style.boxShadow = "0 10px 18px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22)";

                if(this.props.isShowTitle){

                    onMouseEnter = this.itemMouseEnter;
                    onMouseLeave = this.itemMouseLeave;

                }

            }

            return (

                <button
                    key={classes.Item + index}
                    className={classes.ItemText}

                    data-name={value}
                    data-index={index}

                    onMouseUp={this.itemMouseUpHandler}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}

                    style={style}
                >
                    {value}
                </button>

            );

        });

    };

    _getTranslateByCircle = (degrees) => {

        let x, y;

        /*const center = { x: 0, y: 0};

        x = center.x + radius * MathF.sinDegrees(degrees);
        y = center.y + radius * MathF.cosDegrees(degrees);*/

        x = this.radius * MathF.sinDegrees(degrees);
        y = this.radius * MathF.cosDegrees(degrees);

        return 'translate(' + x + 'px, ' + y + 'px)';

    };

    _getDegrees = (index) => {

        //console.log("degreesAll == " )

        //console.log("degrees == " + (index * (this.degreesAll / this.itemsLength - 1) + this.degreesMarga));

        if(this.props.type === type.TEXT && this.props.formType === formType.BOTTOM_HALF_CIRCLE && this.props.itemsLength < 4){

            if(index === 0){

                return index * (this.degreesAll / this.itemsLengthForDegreesCalc ) + this.degreesMarga + 20;

            }

            if(index === this.props.itemsLength - 1){

                return index * (this.degreesAll / this.itemsLengthForDegreesCalc ) + this.degreesMarga - 20;

            }

        }

        return index * (this.degreesAll / this.itemsLengthForDegreesCalc ) + this.degreesMarga;

    };

    _config = () => {

        const form = this.props.formType;

        switch(form){

            case formType.CIRCLE:

                this.degreesAll = 360;
                this.itemsLengthForDegreesCalc = this.itemsLength;
                this.titleStyle = { top: '-160px', left: '-150px'};

                break;

            case formType.TOP_HALF_CIRCLE:

                this.degreesAll = 180;
                this.degreesMarga = 90;
                this.bottomLeftBgClasses += ' ' + classes.Hidden;
                this.bottomRightBgClasses += ' ' + classes.Hidden;
                this.titleStyle = { top: '-160px', left: '-150px'};

                break;

            case formType.BOTTOM_HALF_CIRCLE:

                this.degreesAll = 180;
                this.degreesMarga = 270;
                this.topLeftBgClasses += ' ' + classes.Hidden;
                this.topRightBgClasses += ' ' + classes.Hidden;
                this.titleStyle = { top: '150px', left: '-150px'};

                break;

            case formType.RIGHT_HALF_CIRCLE:

                this.degreesAll = 180;
                this.degreesMarga = 0;
                this.bottomLeftBgClasses += ' ' + classes.Hidden;
                this.topLeftBgClasses += ' ' + classes.Hidden;

                this.titleStyle = {
                    top: '-170px',
                    left: '120px',
                    transformOrigin: 'top left',
                    transform: 'rotate(60deg)'
                };

                break;

            case formType.LEFT_HALF_CIRCLE:

                this.degreesAll = 180;
                this.degreesMarga = 180;
                this.topRightBgClasses += ' ' + classes.Hidden;
                this.bottomRightBgClasses += ' ' + classes.Hidden;

                this.titleStyle = {
                    top: '-170px',
                    left: '-410px',
                    transformOrigin: 'top right',
                    transform: 'rotate(-60deg)'
                };

                break;

            case formType.TOP_RIGHT_QUARTER:

                this.degreesAll = 90;
                this.degreesMarga = 90;
                this.topLeftBgClasses += ' ' + classes.Hidden;
                this.bottomRightBgClasses += ' ' + classes.Hidden;
                this.bottomLeftBgClasses += ' ' + classes.Hidden;

                this.titleStyle = {
                    top: '-235px',
                    left: '30px',
                    transformOrigin: 'top left',
                    transform: 'rotate(45deg)'
                };

                break;

            case formType.TOP_LEFT_QUARTER:

                this.degreesAll = 90;
                this.degreesMarga = 180;
                this.topRightBgClasses += ' ' + classes.Hidden;
                this.bottomRightBgClasses += ' ' + classes.Hidden;
                this.bottomLeftBgClasses += ' ' + classes.Hidden;

                this.titleStyle = {
                    top: '-30px',
                    left: '-235px',
                    transformOrigin: 'top left',
                    transform: 'rotate(-45deg)'
                };

                break;

            case formType.BOTTOM_RIGHT_QUARTER:

                this.degreesAll = 90;
                this.degreesMarga = 0;
                this.topRightBgClasses += ' ' + classes.Hidden;
                this.topLeftBgClasses += ' ' + classes.Hidden;
                this.bottomLeftBgClasses += ' ' + classes.Hidden;

                this.titleStyle = {
                    top: '210px',
                    left: '0',
                    transformOrigin: 'top left',
                    transform: 'rotate(-45deg)'
                };

                break;

            case formType.BOTTOM_LEFT_QUARTER:

                this.degreesAll = 90;
                this.degreesMarga = 270;
                this.topRightBgClasses += ' ' + classes.Hidden;
                this.topLeftBgClasses += ' ' + classes.Hidden;
                this.bottomRightBgClasses += ' ' + classes.Hidden;

                this.titleStyle = {
                    top: '0',
                    left: '-210px',
                    transformOrigin: 'top left',
                    transform: 'rotate(45deg)'
                };

                break;

            default: console.error("Unknown form type == " + form);
        }

    }

}

ControlsFeature.propTypes = {

    itemClickHandler: PropTypes.func.isRequired,
    formType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    itemsLength: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired,

    isShowTitle: PropTypes.bool.isRequired,
    isMainItemText: PropTypes.bool.isRequired

};

export default ControlsFeature;
        