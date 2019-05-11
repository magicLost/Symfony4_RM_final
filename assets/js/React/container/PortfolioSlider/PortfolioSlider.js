import React from 'react';
import classes from './PortfolioSlider.module.scss';
import PropTypes from 'prop-types';
import ControlsFeature, {formType, type} from "../ControlsFeature/ControlsFeature";
import CarouselTranslate from "../Carousel/CarouselTranslate/CarouselTranslate";
import ArrowCarouselControls from "../ArrowCarouselControls/ArrowCarouselControls";
import Scroller, { scrollerType } from "../Scroller/Scroller";
import Img from "../../component/UI/Img/Img";
import CarouselOpacity from "../Carousel/CarouselOpacity/CarouselOpacity";
import FeedBackModalForm from "../FeedBackModalForm/FeedBackModalForm";
import {elements} from "../../../data/feedback_form_data";
        
class PortfolioSlider extends React.PureComponent
{

    controlsFeatureConfig = {
        mainDivStyle: { top: '30px' },
        mainItemStyle: { backgroundColor: "#fff" }
    };

    state = {

        categoryIndex: 0,
        photoIndex: 0,
        descriptionId: 0,

        isFeedBackFormCreated: false,
        isShowFeedBackForm: false

    };

    /*constructor(props){
        super(props);
    }*/

    /* CATEGORY INDEX */

    setCategoryIndex = (index) => {

        this.setState((prevState) => {

            if(prevState.categoryIndex === index)
                return null;

            return {
                categoryIndex: index,
                photoIndex: 0
            };

        })


    };

    /* CATEGORY INDEX */

    /* PHOTO INDEX */

    decreasePhotoIndex = () => {

        this.setState((prevState) => {

            if(prevState.photoIndex === 0)
                return null;

            return { photoIndex: prevState.photoIndex - 1 };

        })

    };

    increasePhotoIndex = () => {

        this.setState((prevState) => {

            if(prevState.photoIndex === this.props.photos[this.state.categoryIndex]["300"].length - 1)
                return null;

            return { photoIndex: prevState.photoIndex + 1 };

        })

    };

    /* PHOTO INDEX */

    scrollerItemClickHandler = (index) => {

        //console.log("scrollerItemClickHandler == " + event.target.dataset.index);

        this.setState((prevState) => {

            if(prevState.photoIndex === index)
                return null;

            return { photoIndex: index };

        })

    };

    wantTheSameButtonClickHandler = (event) => {

        event.stopPropagation();
        event.preventDefault();

        const id = this.props.photos[this.state.categoryIndex].desc[this.state.photoIndex].id;

        this.props.showFeedBackFormHandler(
            [
                { name: "photoId", value: id }
            ]
        );

    };

    render(){

        //const items = this.getCarouselItems();
        const desc = this.props.photos[this.state.categoryIndex].desc[this.state.photoIndex];

        return (
        
            <div className={classes.PortfolioSlider}>

                <h3 className={classes.MainTitle}>Наши работы.</h3>

                <div className={classes.CarouselWrapper}>

                    <div className={classes.Carousel}>

                        <CarouselOpacity
                            items={this.props.photos[this.state.categoryIndex]["300"]}
                            getItem={this.getCarouselItem}
                            activeIndex={this.state.photoIndex}
                            decreaseActiveIndex={this.decreasePhotoIndex}
                            increaseActiveIndex={this.increasePhotoIndex}
                        />

                        {/*<CarouselTranslate
                            itemsLength={this.props.photos[this.state.categoryIndex]["300"].length}
                            activeIndex={this.state.photoIndex}
                            decreaseActiveIndex={this.decreasePhotoIndex}
                            increaseActiveIndex={this.increasePhotoIndex}
                        >

                            { items }

                        </CarouselTranslate>*/}

                    </div>

                    <div className={classes.Arrows}>
                        <ArrowCarouselControls
                            increaseActiveIndex={this.increasePhotoIndex}
                            decreaseActiveIndex={this.decreasePhotoIndex}
                            activeIndex={this.state.photoIndex}
                            length={this.props.photos[this.state.categoryIndex]["300"].length}
                            arrowSizeClass={classes.ArrowsSize}
                        />
                    </div>

                </div>

                <div className={classes.Controls}>

                    <ControlsFeature
                        itemClickHandler={this.setCategoryIndex}
                        formType={formType.CIRCLE}
                        type={type.SVG}
                        itemsLength={this.props.categories.length}
                        items={this.props.categories}
                        isShowTitle={true}
                        isMainItemText={false}
                        config={this.controlsFeatureConfig}
                    />

                </div>

                <div className={classes.Scroller}>

                    <Scroller
                        items={this.props.icons[this.state.categoryIndex]}
                        getItem={this.getScrollerItem}
                        itemsLength={this.props.photos[this.state.categoryIndex]["300"].length}
                        type={scrollerType.IMG_ICONS}
                        itemClickHandler={this.scrollerItemClickHandler}
                    />

                </div>

                <div className={classes.Description}>

                    <h4 className={classes.Title}>{ desc.title }</h4>

                    <p className={classes.Text}>
                        { desc.text }
                    </p>

                    <p className={classes.Price}>
                        Примерная стоимость: { desc.price }
                    </p>

                    <button className={classes.wantTheSameButton} onClick={this.wantTheSameButtonClickHandler} >Хочу такую.</button>

                </div>



            </div>
            
        );
    }


    getCarouselItem = (index, activeIndex) => {

        return (

            <Img
                isActive={ index === activeIndex }
                src300={this.props.photos[this.state.categoryIndex]["300"][index]}
                src600={this.props.photos[this.state.categoryIndex]["600"][index]}
            />

        );

    };

    getScrollerItem = (index, imageBgSrc) => {

        console.log("getItem");

        let style = {
            backgroundImage: 'url(' + imageBgSrc + ")",
            backgroundPosition: this._getBGPosition(index, 100)
        };

        return (

            <div
                className={classes.Wrapper}
                data-index={index}
            >
                <div
                    className={classes.Content}
                    data-index={index}
                    style={style}
                >

                </div>
            </div>

        );

    };

    _getBGPosition = (index, offset) => {

        let multi = Math.floor(index / 3);

        return "-" + ((index - 3 * multi) * offset) + "px -" + offset * multi + 'px';

    };

}

PortfolioSlider.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    icons: PropTypes.array.isRequired,
    photos: PropTypes.array.isRequired,

    showFeedBackFormHandler: PropTypes.func.isRequired
 
};

export default PortfolioSlider;
        