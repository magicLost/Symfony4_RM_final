import React from 'react';
import classes from './CarouselOpacity.module.scss';
import PropTypes from 'prop-types';
        
class CarouselOpacity extends React.PureComponent
{
    pageXStart = 0;
    pageYStart = 0;

    isYScroll = false;
    isFirstMove = true;

    dist = 0;
    delta = 0;

    isTranslated = false;

    state = {


        opacity: 1,

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

        console.log("mouseUpHandler");
        //console.log(event.pageX);

        window.removeEventListener('mousemove', this.mouseMoveHandler, false );
        window.removeEventListener('mouseup', this.mouseUpHandler, false );

        this._onPointerUp();

    };

    touchStartHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("touchStartHandler");

        const touches = event.changedTouches[0];

        this._onPointerDown(touches.pageX, touches.pageY);

    };

    touchMoveHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        const touches = event.changedTouches[0];

        this._onPointerMove(touches.pageX, touches.pageY);

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

            </div>
            
        );
    }

    getItems = () => {

        return this.props.items.map((value, index) => {

            let style = null;

            if(this.props.activeIndex === index){

                if(this.isTranslated){

                    style = {
                        transitionProperty: 'opacity',
                        opacity: this.state.opacity
                    }

                }else{

                    style = {
                        transitionProperty: 'opacity',
                        transitionDuration: '1s',
                        opacity: this.state.opacity
                    }

                }

            }

            return (

                <li
                    key={classes.Item + index}
                    className={classes.Item}
                    style={style}
                >

                    { this.props.getItem(index, this.props.activeIndex) }

                </li>

            );

        });

    };

    _onPointerDown = (pageX, pageY) => {

        this.pageXStart = pageX;
        this.pageYStart = pageY;

        this.isTranslated = true;

        this.dist = 0;
        this.delta = document.documentElement.clientWidth / 100;

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

            this.setState((prevState) => {

                this.dist = this.pageXStart - pageX;

                return {

                    /*currentOpacity: currentOpacity,
                    prevOpacity: prevOpacity*/
                    opacity: 1 - Math.abs(Math.round(this.dist / this.delta)) / 100

                };

            });

        }

    };

    _onPointerUp = () => {

        if(!this.isYScroll){

            this.setState(() => {

                if(Math.abs(this.dist) > 25){

                    if(this.dist > 0){

                        this.props.increaseActiveIndex();

                    }else{

                        this.props.decreaseActiveIndex();

                    }

                }

                return { opacity: 1 };

            });

        }

        this.isTranslated = false;
        this.isYScroll = false;
        this.isFirstMove = true;

    };

}

CarouselOpacity.propTypes = {

    items: PropTypes.any.isRequired,
    getItem: PropTypes.func.isRequired,

    activeIndex: PropTypes.number.isRequired,
    increaseActiveIndex: PropTypes.func.isRequired,
    decreaseActiveIndex: PropTypes.func.isRequired
 
};

export default CarouselOpacity;
        