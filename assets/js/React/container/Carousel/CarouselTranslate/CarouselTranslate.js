import React from 'react';
import classes from './CarouselTranslate.module.scss';
import PropTypes from 'prop-types';
        
class CarouselTranslate extends React.Component
{
    itemsLength = 0;

    listStyle = {
        transitionProperty: 'transform',
        transitionDuration: '0.5s'
    };

    prevPageX = 0;
    pageXStart = 0;

    state = {

        //activeIndex: 0,
        translateX: 0,

    };

    constructor(props){
        super(props);

        this.itemsLength = this.props.itemsLength;
    }

    mouseDownHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //const touches = event.changedTouches[0];
        this.pageXStart = event.pageX;
        this.prevPageX = event.pageX;

        this.listStyle = {};

        window.addEventListener('mousemove', this.mouseMoveHandler, false );
        window.addEventListener('mouseup', this.mouseUpHandler, false );

    };

    mouseMoveHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //console.log(this.pageXStart - event.pageX);

        const translateX = this._calcTranslateX(event.pageX);

        //console.log(translateX);

        this.setState((prevState) => {

            return {

                translateX: prevState.translateX + translateX

            }

        });

    };

    mouseUpHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        //console.log("mouseUpHandler");
        //console.log(event.pageX);

        this.listStyle = {
            transitionProperty: 'transform',
            transitionDuration: '0.5s'
        };

        window.removeEventListener('mousemove', this.mouseMoveHandler, false );
        window.removeEventListener('mouseup', this.mouseUpHandler, false );

        const dist = this.pageXStart - event.pageX;

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


    };
    
    render(){

        //const items = this.getItems();

        const translateX = this._getTranslateX();

        //console.log(translateX);
        //console.log("render carousel");

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
                       style={listStyle}
                   >

                       { this.props.children }

                   </ul>

               </div>


           </>

        );
    }

   /* getItems = () => {

        return this.props.items.map((value, index) => {

            return (

                <li
                    key={classes.Item + index}
                    className={classes.Item}
                >

                    <h3>{index}</h3>
                    <p>Hello, my friend</p>
                    <button>Click {index}</button>

                </li>

            );

        });

    };*/

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

        }else if(this.props.activeIndex === this.itemsLength - 1){

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
    decreaseActiveIndex: PropTypes.func.isRequired,
    setActiveIndex: PropTypes.func.isRequired

};

export default CarouselTranslate;
        