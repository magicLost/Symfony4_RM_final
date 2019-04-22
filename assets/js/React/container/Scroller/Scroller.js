import React from 'react';
import classes from './Scroller.module.scss';
import PropTypes from 'prop-types';
import CalcTranslateX from "./Model/CalcTranslateX";
import MathF from "../../../helper/MathF";
import EventSorter, { EVENT_TYPE } from "./Model/EventSorter";

export const scrollerType = {

    IMG_ICONS: "IMG_ICONS",
    CARDS: "CARDS"

};

class Scroller extends React.Component
{

    isNeedRenderItems = true;
    items = null;

    containerRef = React.createRef();
    listRef = React.createRef();
    itemRef = React.createRef();
    //numberOfItems = 0;

    calc = null;
    eventSorter = null;
    eventType = '';

    isYScroll = false;
    isFirstMove = true;

    offsetX = 0;

    listStyle = {
        transitionProperty: 'transform',
        transitionDuration: '0.5s'
    };

    state = {

        translateX: 0,

        isNeedScroller: false

    };

    constructor(props){

        super(props);

        this.calc = new CalcTranslateX();
        this.eventSorter = new EventSorter();

        //this.numberOfItems = this.props.items.length;
        this.items = this.getItems();

        window.addEventListener('resize', this.windowResizeHandler, false);

    }

    componentDidMount(){

        this._init();

    };

    shouldComponentUpdate(nextProps, nextState){

        if(JSON.stringify(this.props.items) !== JSON.stringify(nextProps.items)){

            this.isNeedRenderItems = true;

            this._setValues(nextProps.itemsLength);

            return true;

        }else{

            this.isNeedRenderItems = false;

            return JSON.stringify(this.state) !== JSON.stringify(nextState);

        }

    };

    windowResizeHandler = (event) => {

        console.log("windowResizeHandler");

        this._setValues(this.props.itemsLength);

        this.offsetX = this.containerRef.current.getBoundingClientRect().x;

        //console.log(this.listRef.current.getBoundingClientRect().x);

        const isNeedScroller = this._isNeedScroller(
            this.calc.listWidth,
            this.calc.itemWidth,
            this.props.itemsLength);

        console.log("isNeedScroller = " + isNeedScroller);

        this.setState((prevState) => {

            if(prevState.isNeedScroller === false){

                if(isNeedScroller === false){
                    return null;
                }else{

                    return { isNeedScroller: true };

                }

            }else{

                if(isNeedScroller === false){
                    return {
                        isNeedScroller: false,
                        translateX: 0
                    };
                }else{

                    //check if translateX is out offsets
                    //return translateX > this.maxTranslateOffset || translateX < this.minTranslateOffset;
                    let translateX = prevState.translateX;
                    if(translateX > this.calc.maxTranslateOffset){

                        translateX = this.calc.maxTranslateOffset;

                    }else if(translateX < this.calc.minTranslateOffset){

                        translateX = this.calc.minTranslateOffset;

                    }

                    if(translateX !== prevState.translateX){
                        return { translateX: translateX };
                    }

                    return null;


                }

            }

        });


    };

    mouseDownHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.calc.pageXStart = event.pageX;
        this.calc.prevPageX = event.pageX;

        this.listStyle = {};

        const translateX = this.listRef.current.getBoundingClientRect().x - Math.abs(this.offsetX);

        this.setState((prevState) => {

            if(prevState.translateX !== translateX){

                return {translateX: translateX};

            }

            return null;

        });

        this.eventSorter.onTouchStart(event.pageX, event.pageY);

        window.addEventListener('mousemove', this.mouseMoveHandler, false );
        window.addEventListener('mouseup', this.mouseUpHandler, false );

    };

    touchStartHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        this._pointerDownHandler(touches.pageX, touches.pageY);

    };

    mouseMoveHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.eventSorter.onTouchMove(event.pageX);

        this.setState((prevState) => {

            let newTranslateX = this.calc.calcTranslateXOnMove(prevState.translateX, event.pageX);

            newTranslateX = prevState.translateX + newTranslateX;

            newTranslateX = MathF.clamp(newTranslateX, this.calc.minTranslateOffset - 50, this.calc.maxTranslateOffset + 50);

            return {

                translateX: newTranslateX//parseFloat((prevState.translateX + translateX).toFixed(1))

            }

        });

    };

    touchMoveHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        this._pointerMoveHandler(touches.pageX, touches.pageY);

    };

    mouseUpHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        window.removeEventListener('mousemove', this.mouseMoveHandler, false );
        window.removeEventListener('mouseup', this.mouseUpHandler, false );

        this.listStyle = {
            transition: 'transform 0.5s ease-out 0s',
        };

        //what event - move, swipe etc...
        this.eventSorter.onTouchEnd(event.pageX);

        this.eventType = this.eventSorter.whatEventType(event.pageY);

        //console.log(eventType);

        this.setState((prevState) => {

            if(prevState.translateX > this.calc.maxTranslateOffset){

                return {

                    translateX: this.calc.maxTranslateOffset

                }

            }else if(prevState.translateX < this.calc.minTranslateOffset){

                return {

                    translateX: this.calc.minTranslateOffset

                }

            }else if(this.eventType === EVENT_TYPE.SWIPE || this.eventType === EVENT_TYPE.SWIPE_MOVE) {

                //console.log("swipe");
                //console.log(this.eventSorter.getSwipeSpeed());

                let newTranslateX = this.calc.calcTranslateXOnSwipe(this.eventSorter.getSwipeSpeed());

                newTranslateX = prevState.translateX + newTranslateX;

                newTranslateX = MathF.clamp(newTranslateX, this.calc.minTranslateOffset, this.calc.maxTranslateOffset);

                return {

                    translateX: newTranslateX//parseFloat((prevState.translateX + translateX).toFixed(1))

                };

            }

        });

    };

    touchEndHandler = (event) => {

        const touches = event.changedTouches[0];

        this._pointerUpHandler(touches.pageX, touches.pageY);

    };

    itemClickHandler = (event) => {

        event.stopPropagation();
        event.preventDefault();

        console.log("itemClickHandler" + this.eventType);

        if(this.state.isNeedScroller){

            if(this.eventType === EVENT_TYPE.CLICK){

                this.props.itemClickHandler(parseInt(event.target.dataset.index));

            }

        }else{

            this.props.itemClickHandler(parseInt(event.target.dataset.index));

        }



    };
    
    render(){

        console.log("Scroller render");

        if(this.state.isNeedScroller){
            return this.scrollerRender();
        }

        return this.noScrollerRender();

    }

    scrollerRender = () => {

        const items = (this.isNeedRenderItems) ? this.items = this.getItems() : this.items;

        // 'calc(' + translateByActiveIndex + " + " + this.state.translateX + 'px)'
        const listStyle = {
            ...this.listStyle,
            transform: 'translateX(' + this.state.translateX + 'px)'
        };

        return (

            <div
                className={classes.Scroller}
                ref={this.containerRef}
            >

                <ul
                    ref={this.listRef}
                    className={classes.ItemsList}
                    onMouseDown={this.mouseDownHandler}
                    onTouchStart={this.touchStartHandler}
                    onTouchMove={this.touchMoveHandler}
                    onTouchEnd={this.touchEndHandler}
                    style={listStyle}
                >

                    { items }

                </ul>

            </div>

        );

    };

    noScrollerRender = () => {

        const items = (this.isNeedRenderItems) ? this.items = this.getItems() : this.items;

        return (

            <div
                className={classes.Scroller}
                ref={this.containerRef}
            >

                <ul
                    ref={this.listRef}
                    className={classes.ItemsList}
                    style={{justifyContent: "center"}}
                >

                    { items }

                </ul>

            </div>

        );

    };

    getItems = () => {

        console.log("getItems");
        //console.log(this.props.items);

        switch(this.props.type){

            case scrollerType.CARDS:

                return this.props.items.map((value, index) => {

                    return (

                        <li
                            key={classes.Item + index}
                            className={classes.Item}
                            ref={this.itemRef}
                            onClick={this.itemClickHandler}
                        >

                            { this.props.getItem(index) }

                        </li>

                    );

                });

            case scrollerType.IMG_ICONS:

                const items = [];
                let ref = null;

                for(let i = 0; i < this.props.itemsLength; i++){

                    ref = i === 0 ? this.itemRef : null;

                    items.push((
                        <li
                            key={classes.Item + i}
                            className={classes.Item}
                            ref={ref}
                            onClick={this.itemClickHandler}
                        >

                            { this.props.getItem(i, this.props.items) }

                        </li>
                    ));

                }

                return items;

            default: console.error("Unknown scroller type == " + this.props.type);

        }

    };

    _pointerDownHandler = (pageX, pageY) => {

        this.calc.pageXStart = pageX;
        this.calc.pageYStart = pageY;
        this.calc.prevPageX = pageX;

        this.listStyle = {};

        const translateX = this.listRef.current.getBoundingClientRect().x - Math.abs(this.offsetX);

        this.setState((prevState) => {

            if(prevState.translateX !== translateX){

                return {translateX: translateX};

            }

            return null;

        });

        this.eventSorter.onTouchStart(pageX, pageY);

    };

    _pointerMoveHandler = (pageX, pageY) => {

        if(this.isFirstMove){

            const distX = Math.abs(pageX - this.calc.pageXStart);
            const distY = Math.abs(pageY - this.calc.pageYStart);

            //console.log("distX " + distX);
            //console.log(event);

            if(distY > distX)
                this.isYScroll = true;

            this.isFirstMove = false;

        }

        /*console.log(this.isYScroll);
        console.log(this.isFirstMove);*/

        if(!this.isYScroll){

            this.eventSorter.onTouchMove(pageX);

            this.setState((prevState) => {

                let newTranslateX = this.calc.calcTranslateXOnMove(prevState.translateX, pageX);

                newTranslateX = prevState.translateX + newTranslateX;

                newTranslateX = MathF.clamp(newTranslateX, this.calc.minTranslateOffset - 50, this.calc.maxTranslateOffset + 50);

                return {

                    translateX: newTranslateX//parseFloat((prevState.translateX + translateX).toFixed(1))

                }

            });

        }


    };

    _pointerUpHandler = (pageX, pageY) => {

        if(!this.isYScroll){

            this.listStyle = {
                transition: 'transform 0.5s ease-out 0s',
            };

            //what event - move, swipe etc...
            this.eventSorter.onTouchEnd(pageX);

            this.eventType = this.eventSorter.whatEventType(pageY);

            //console.log(eventType);

            this.setState((prevState) => {

                if(prevState.translateX > this.calc.maxTranslateOffset){

                    return {

                        translateX: this.calc.maxTranslateOffset

                    }

                }else if(prevState.translateX < this.calc.minTranslateOffset){

                    return {

                        translateX: this.calc.minTranslateOffset

                    }

                }else if(this.eventType === EVENT_TYPE.SWIPE || this.eventType === EVENT_TYPE.SWIPE_MOVE) {

                    //console.log("swipe");
                    //console.log(this.eventSorter.getSwipeSpeed());

                    let newTranslateX = this.calc.calcTranslateXOnSwipe(this.eventSorter.getSwipeSpeed());

                    newTranslateX = prevState.translateX + newTranslateX;

                    newTranslateX = MathF.clamp(newTranslateX, this.calc.minTranslateOffset, this.calc.maxTranslateOffset);

                    return {

                        translateX: newTranslateX//parseFloat((prevState.translateX + translateX).toFixed(1))

                    };

                }

            });

        }

        this.isYScroll = false;
        this.isFirstMove = true;

    };

    _init = () => {

        //const translateX = this.listRef.current.getBoundingClientRect().x;
        this._setValues(this.props.itemsLength);

        this.offsetX = this.containerRef.current.getBoundingClientRect().right;

        const isNeedScroller = this._isNeedScroller(
            this.calc.listWidth,
            this.calc.itemWidth,
            this.props.itemsLength);

        console.log("isNeedScroller = " + isNeedScroller);

        this.setState(prevState => {

            if(prevState.isNeedScroller !== isNeedScroller){
                return {
                    isNeedScroller: isNeedScroller
                };
            }

        });


    };

    _setValues = (itemsLength) => {

        let listWidth = this.listRef.current.getBoundingClientRect().width;
        let itemWidth = this.itemRef.current.getBoundingClientRect().width;

        this.calc.setValues(
            listWidth,
            itemWidth,
            itemsLength
        );

        console.log("_setValues");
        console.log("itemsLength = " + itemsLength);
        //console.log("listWidth = " + listWidth);
        //console.log("itemWidth = " + itemWidth);


    };

    _isNeedScroller = (containerWidth, itemWidth, numberOfItems) => {

        return itemWidth * numberOfItems - containerWidth > 0;

    };

}

Scroller.propTypes = {

    //if type imgIcons - string with icons url
    items: PropTypes.any.isRequired,
    itemsLength: PropTypes.number.isRequired,
    getItem: PropTypes.func.isRequired,
    itemClickHandler: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
 
};

export default Scroller;
        