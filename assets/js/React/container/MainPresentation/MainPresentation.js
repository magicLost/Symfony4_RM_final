import React from 'react';
import classes from './MainPresentation.module.scss';
import PropTypes from 'prop-types';
import CarouselTranslate from "../Carousel/CarouselTranslate/CarouselTranslate";
import ArrowCarouselControls from "../ArrowCarouselControls/ArrowCarouselControls";
import ControlsFeature, {formType, type} from "../ControlsFeature/ControlsFeature";


class MainPresentation extends React.PureComponent
{
    /*constructor(props){
        super(props);
    }*/

    contolsFeatureConfig = {
        mainDivStyle: { top: '-30px' },
        mainItemStyle: { backgroundColor: "#fafafa" }
    };

    state = {

        activeIndex: 0

    };

    increaseActiveIndex = () => {

        this.setState((prevState) => {

            if(prevState.activeIndex === this.props.carouselItems.length - 1)
                return null;

            return { activeIndex: prevState.activeIndex + 1 };

        })

    };

    decreaseActiveIndex = () => {

        this.setState((prevState) => {

            if(prevState.activeIndex === 0)
                return null;

            return { activeIndex: prevState.activeIndex - 1 };

        })

    };

    setActiveIndex = (index) => {

        //this.setState({ activeIndex: index });
        this.setState((prevState) => {

            if(prevState.activeIndex === index)
                return null;

            return { activeIndex: index };

        })

    };
    
    render(){

        const items = this.getCarouselItems();

        return (
        
            <div className={classes.MainPresentation}>

                <CarouselTranslate
                    itemsLength={this.props.carouselItems.length}
                    activeIndex={this.state.activeIndex}
                    decreaseActiveIndex={this.decreaseActiveIndex}
                    increaseActiveIndex={this.increaseActiveIndex}
                >

                    { items }

                </CarouselTranslate>

                <div className={classes.Arrows}>
                    <ArrowCarouselControls
                        increaseActiveIndex={this.increaseActiveIndex}
                        decreaseActiveIndex={this.decreaseActiveIndex}
                        activeIndex={this.state.activeIndex}
                        length={this.props.carouselItems.length}
                        arrowSizeClass={classes.ArrowsSize}
                    />
                </div>

                <div className={classes.MobileControls}>
                    <ControlsFeature
                        itemClickHandler={this.setActiveIndex}
                        formType={formType.CIRCLE}
                        type={type.SVG}
                        itemsLength={this.props.carouselControlsItems.length}
                        items={this.props.carouselControlsItems}
                        isShowTitle={true}
                        isMainItemText={false}
                        config={this.contolsFeatureConfig}
                    />
                </div>

            </div>
            
        );
    }

    getCarouselItems = () => {

        return this.props.carouselItems.map((value, index) => {

            return (

                <li
                    key={classes.MainPresentation + index}
                    className={classes.Item}
                >

                    <div className={classes.Content}>

                        <h3>{ value.title }</h3>
                        <p className={classes.Paragraph}>{ value.text }</p>
                        <a className={classes.Link} href={value.href}>Подробнее</a>

                    </div>

                </li>

            );

        });

    };

}

MainPresentation.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
    carouselItems: PropTypes.array.isRequired,
    carouselControlsItems: PropTypes.array.isRequired
 
};

export default MainPresentation;
        