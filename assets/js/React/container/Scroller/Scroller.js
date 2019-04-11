import React from 'react';
import classes from './Scroller.module.scss';
import PropTypes from 'prop-types';
import CalcTranslateX from "./Model/CalcTranslateX";
import EventSorter, {EVENT_TYPE} from "../Touches/Model/EventSorter";
import MathF from "../../helper/MathF";
        
class Scroller extends React.Component
{

    listRef = React.createRef();
    itemRef = React.createRef();
    numberOfItems = 0;

    calc = null;
    eventSorter = null;

    listStyle = {
        transitionProperty: 'transform',
        transitionDuration: '0.5s'
    };

    state = {

        translateX: 0

    };

    constructor(props){
        super(props);

        this.calc = new CalcTranslateX();
        this.eventSorter = new EventSorter();

        this.numberOfItems = this.props.items.length;

    }

    componentDidMount(){

        this._init();

    };

    mouseDownHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.calc.pageXStart = event.pageX;
        this.calc.prevPageX = event.pageX;

        this.listStyle = {};

        const translateX = this.listRef.current.getBoundingClientRect().x;

        this.setState({translateX: translateX});

        //console.log(translateX);

        this.eventSorter.onTouchStart(event.pageX, event.pageY);

        window.addEventListener('mousemove', this.mouseMoveHandler, false );
        window.addEventListener('mouseup', this.mouseUpHandler, false );

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

        const eventType = this.eventSorter.whatEventType(event.pageY);

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

            }else if(eventType === EVENT_TYPE.SWIPE || eventType === EVENT_TYPE.SWIPE_MOVE) {

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
    
    render(){

        const items = this.getItems();

        // 'calc(' + translateByActiveIndex + " + " + this.state.translateX + 'px)'
        const listStyle = {
            ...this.listStyle,
            transform: 'translateX(' + this.state.translateX + 'px)'
        };

        return (
        
            <div className={classes.Scroller}>

                <ul
                    ref={this.listRef}
                    className={classes.ItemsList}
                    onMouseDown={this.mouseDownHandler}
                    style={listStyle}
                >

                    { items }

                </ul>

            </div>
            
        );
    }

    getItems = () => {

        return this.props.items.map((value, index) => {

            return (

                <li
                    key={classes.Item + index}
                    className={classes.Item}
                    ref={this.itemRef}
                >

                    <div className={classes.Content}>
                        <h3>{index}</h3>
                        <p>Hello, my friend</p>
                        <button onClick={(event) => { console.log("click"); }}>Click me</button>
                    </div>

                </li>

            );

        });

    };

    _init = () => {

        let listWidth = this.listRef.current.getBoundingClientRect().width;
        let itemWidth = this.itemRef.current.getBoundingClientRect().width;

     /*   if(!this._isNeedScroller(scrollerContainerDivWidth, scrollerItemWidth, this.props.numberOfItems)){

            this.setState(prevState => {

                if(prevState.isNeedScroller === true){
                    return {
                        isNeedScroller: false
                    };
                }

            });

            return;

        }*/

        this.calc.setValues(
            listWidth,
            itemWidth,
            this.numberOfItems
        );

    };

    _isNeedScroller = (scrollerContainerDivWidth, scrollerItemWidth, numberOfItems) => {

        return scrollerItemWidth * numberOfItems - scrollerContainerDivWidth >= scrollerItemWidth * 0.5;

    };

}

Scroller.propTypes = {

    items: PropTypes.array.isRequired
 
};

export default Scroller;
        