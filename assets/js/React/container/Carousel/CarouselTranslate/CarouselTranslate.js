import React from 'react';
import classes from './CarouselTranslate.module.scss';
import PropTypes from 'prop-types';
        
class CarouselTranslate extends React.Component
{
    //itemsLength = 0;

    listStyle = {
        transitionProperty: 'transform',
        transitionDuration: '0.5s'
    };

    prevPageX = 0;
    pageXStart = 0;
    pageYStart = 0;

    isYScroll = false;
    isFirstMove = true;

    state = {

        //activeIndex: 0,
        translateX: 0,

    };

    constructor(props){
        super(props);

        //this.itemsLength = this.props.itemsLength;
    }

    mouseDownHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this._onPointerDown(event.pageX, event.pageY);

        window.addEventListener('mousemove', this.mouseMoveHandler, false );
        window.addEventListener('mouseup', this.mouseUpHandler, false );

    };

    touchStartHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        this._onPointerDown(touches.pageX, touches.pageY);

    };

    mouseMoveHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this._onPointerMove(event.pageX, event.pageY);

    };

    touchMoveHandler = (event) => {

        const touches = event.changedTouches[0];

        this._onPointerMove(touches.pageX, touches.pageY);

    };

    mouseUpHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this._onPointerUp(event.pageX);

        window.removeEventListener('mousemove', this.mouseMoveHandler, false );
        window.removeEventListener('mouseup', this.mouseUpHandler, false );

    };

    touchEndHandler = (event) => {

        this._onPointerUp(event.changedTouches[0].pageX);

    };
    
    render(){

        //const items = this.getItems();

        const translateX = this._getTranslateX();

        //console.log(translateX);
        //console.log("render carousel");
        //const mainDivStyle =

        const listStyle = {
            ...this.listStyle,
            transform: 'translateX(' + translateX + ')'
        };

        //console.log(listStyle);

        return (
        
           <>
               <div className={classes.CarouselTranslate}>

                   <ul
                       className={classes.ItemsList}
                       onMouseDown={this.mouseDownHandler}
                       onTouchStart={this.touchStartHandler}
                       onTouchMove={this.touchMoveHandler}
                       onTouchEnd={this.touchEndHandler}
                       style={listStyle}
                   >

                       { this.props.children }

                   </ul>

               </div>


           </>

        );
    }


    _onPointerDown = (pageX, pageY) => {

        this.pageXStart = pageX;
        this.pageYStart = pageY;
        this.prevPageX = pageX;

        this.listStyle = {};

    };

    _onPointerMove = (pageX, pageY) => {

        if(this.isFirstMove){

            const distX = Math.abs(pageX - this.pageXStart);
            const distY = Math.abs(pageY - this.pageYStart);

            //console.log("distX " + distX);
            //console.log(event);

            if(distY > distX)
                this.isYScroll = true;

            this.isFirstMove = false;

        }

        if(!this.isYScroll){

            //event.preventDefault();
            //event.stopPropagation();

            const translateX = this._calcTranslateX(pageX);

            this.setState((prevState) => {

                return {

                    translateX: prevState.translateX + translateX

                }

            });

        }


    };

    _onPointerUp = (pageX) => {


        if(!this.isYScroll){

            this.listStyle = {
                transitionProperty: 'transform',
                transitionDuration: '0.5s'
            };

            const dist = this.pageXStart - pageX;

            if(Math.abs(dist) > 15){

                if(dist < 0){

                    this.props.decreaseActiveIndex();
                    this.setState({ translateX: 0 });

                }else{

                    this.props.increaseActiveIndex();
                    this.setState({ translateX: 0 });

                }

            }else{

                this.setState({ translateX: 0 });

            }

        }

        this.isYScroll = false;
        this.isFirstMove = true;

    };

    _getTranslateX = () => {

        const translateByActiveIndex = - this.props.activeIndex * 100 + '%';

        return  'calc(' + translateByActiveIndex + " + " + this.state.translateX + 'px)';

    };

    _calcTranslateX = (pageX) => {

        let translateX = 0;

        if(this.props.activeIndex === 0){

            if(this.pageXStart - pageX < 0){

                if(pageX > this.prevPageX){

                    translateX += 0.3;

                }else{

                    translateX -= 0.3;

                }

            }else{

                translateX = pageX - this.prevPageX;

            }

        }else if(this.props.activeIndex === this.props.itemsLength - 1){

            if(this.pageXStart - pageX > 0){

                if(pageX > this.prevPageX){

                    translateX += 0.3;

                }else{

                    translateX -= 0.3;

                }

            }else{

                translateX = pageX - this.prevPageX;

            }

        }else{

            translateX = pageX - this.prevPageX;

        }

        this.prevPageX = pageX;

        return translateX;

    }

}

CarouselTranslate.propTypes = {

    //items: PropTypes.array.isRequired,
    itemsLength: PropTypes.number.isRequired,
    activeIndex: PropTypes.number.isRequired,
    increaseActiveIndex: PropTypes.func.isRequired,
    decreaseActiveIndex: PropTypes.func.isRequired

};

export default CarouselTranslate;
        