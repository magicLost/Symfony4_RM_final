import React from 'react';
import classes from './ArrowCarouselControls.module.scss';
import PropTypes from 'prop-types';
import icons from "../../../../static/icons/ICONS.svg";
        
class ArrowCarouselControls extends React.PureComponent
{
   /* constructor(props){
        super(props);
    }*/
    
    render(){

        let rightArrowStyle = null;
        let leftArrowStyle = null;

        if(this.props.activeIndex <= 0){

            leftArrowStyle = { visibility: "hidden" };

        }else if(this.props.activeIndex >= this.props.length - 1){

            rightArrowStyle = { visibility: "hidden" };

        }

        return (
        
            <div className={classes.ArrowCarouselControls}>

                <button
                    className={classes.LeftArrow}
                    onClick={this.props.decreaseActiveIndex}
                    style={ leftArrowStyle }
                >

                    <svg
                        className={classes.LeftSvg}
                        width={"10"}
                        height={"10"}
                        viewBox="0 0 984 991.55"
                    >
                        <use xlinkHref={icons + "#arrow"}></use>
                    </svg>

                </button>

                <button
                    className={classes.RightArrow}
                    onClick={this.props.increaseActiveIndex}
                    style={ rightArrowStyle }
                >

                    <svg
                        className={classes.RightSvg}
                        width={"10"}
                        height={"10"}
                        viewBox="0 0 984 991.55"
                    >
                        <use xlinkHref={icons + "#arrow"}></use>
                    </svg>

                </button>

            </div>
            
        );
    }
}

ArrowCarouselControls.propTypes = {

    increaseActiveIndex: PropTypes.func.isRequired,
    decreaseActiveIndex: PropTypes.func.isRequired,

    activeIndex: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired

};

export default ArrowCarouselControls;
        