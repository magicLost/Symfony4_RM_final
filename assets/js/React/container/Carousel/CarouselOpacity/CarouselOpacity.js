import React from 'react';
import classes from './CarouselOpacity.module.scss';
import PropTypes from 'prop-types';
import MobileCarouselControls from "../../MobileCarouselControls/MobileCarouselControls";
        
class CarouselOpacity extends React.Component
{
    pageXStart = 0;
    dist = 0;

    delta = 0;

    nextIndex = 1;

    state = {

        activeIndex: 0,
        currentOpacity: 1,
        prevOpacity: 0

    };

    /*constructor(props){
        super(props);
    }*/

    mouseDownHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this._onPointerDown(event.pageX);

        window.addEventListener('mousemove', this.mouseMoveHandler, false );
        window.addEventListener('mouseup', this.mouseUpHandler, false );

    };

    mouseMoveHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this._onPointerMove(event.pageX);

    };

    mouseUpHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("mouseUpHandler");
        //console.log(event.pageX);

        window.removeEventListener('mousemove', this.mouseMoveHandler, false );
        window.removeEventListener('mouseup', this.mouseUpHandler, false );

        this._onPointerUp();

    };

    touchStartHandler = (event) => {

        //event.preventDefault();
        //event.stopPropagation();

        console.log("touchStartHandler");

        this._onPointerDown(event.changedTouches[0].pageX);

    };

    touchMoveHandler = (event) => {

        this._onPointerMove(event.changedTouches[0].pageX);

    };

    touchEndHandler = (event) => {

        this._onPointerUp();

    };
    
    render(){

        const items = this.getItems();

        return (
        
            <div className={classes.CarouselOpacity}>

                <ul
                    className={classes.ItemsList}
                    onMouseDown={this.mouseDownHandler}
                    onTouchStart={this.touchStartHandler}
                    onTouchMove={this.touchMoveHandler}
                    onTouchEnd={this.touchEndHandler}
                >

                    { items }

                </ul>

                <MobileCarouselControls />

            </div>
            
        );
    }

    getItems = () => {

        return this.props.items.map((value, index) => {

            let style = null;

            if(this.state.activeIndex === index){

                if(this.state.currentOpacity === 1){

                    style = {
                        transitionProperty: 'opacity',
                        transitionDuration: '1s',
                        opacity: this.state.currentOpacity
                    }

                }else{

                    style = { opacity: this.state.currentOpacity }

                }

            }

            if(this.nextIndex === index){

                style = { opacity: this.state.prevOpacity }

            }

            return (

                <li
                    key={classes.Item + index}
                    className={classes.Item}
                    style={style}
                >

                    <h3>{index}</h3>
                    <p>Hello, my friend</p>
                    <button
                        onClick={(event) => { console.log("click")}}
                    >Click {index}</button>

                </li>

            );

        });

    };

    _getNextIndex = (activeIndex) => {

        if(activeIndex >= this.props.items.length - 1){

            return 0;

        }

        return activeIndex + 1;

    };

    _getPrevIndex = (activeIndex) => {

        if(activeIndex <= 0){

            return this.props.items.length - 1;

        }

        return activeIndex - 1;

    };

    _onPointerDown = (pageX) => {

        this.dist = 0;
        this.delta = document.documentElement.clientWidth / 100;

        //const touches = event.changedTouches[0];
        this.pageXStart = pageX;

    };

    _onPointerMove = (pageX) => {


        this.setState((prevState) => {

            this.dist = this.pageXStart - pageX;

            if(this.dist > 0){

                this.nextIndex = this._getNextIndex(prevState.activeIndex);

                const currentOpacity = 1 - Math.abs(Math.round(this.dist / this.delta)) / 100;
                const prevOpacity = 1 - currentOpacity;

                /*console.log("currentOpacity == " + currentOpacity);
                console.log("prevOpacity == " + prevOpacity);*/

                return {

                    currentOpacity: currentOpacity,
                    prevOpacity: prevOpacity

                }

            }else if(this.dist < 0){

                this.nextIndex = this._getPrevIndex(prevState.activeIndex);

                const currentOpacity = 1 - Math.abs(Math.round(this.dist / this.delta)) / 100;
                const prevOpacity = 1 - currentOpacity;

               /* console.log("currentOpacity == " + currentOpacity);
                console.log("prevOpacity == " + prevOpacity);*/

                return {

                    currentOpacity: currentOpacity,
                    prevOpacity: prevOpacity

                }

            }

            return null;

        });

    };

    _onPointerUp = () => {

        if(Math.abs(this.dist) < 25)
            return;

        this.setState((prevState) => {

            if(prevState.activeIndex !== this.nextIndex){

                const nextIndex = this.nextIndex;
                this.nextIndex++;

                return {

                    activeIndex: nextIndex,
                    currentOpacity: 1,
                    prevOpacity: 0

                }
            }
        });
    };

}

CarouselOpacity.propTypes = {

    items: PropTypes.array.isRequired
 
};

export default CarouselOpacity;
        