import React from 'react';
import classes from './MainContent.module.scss';
import PropTypes from 'prop-types';
import MainPresentation from "../../../../MainPresentation/MainPresentation";
import HtmlParser from "../../../../HtmlParser/HtmlParser";
import {mainText, clients} from "../../../../../../data/homepage_data";
import ListSvg, {svgType} from "../../../../../component/UI/ListSvg/ListSvg";


class MainContent extends React.PureComponent
{
    /*constructor(props){
        super(props);
    }*/
    
    render(){
        return (
        
            <div className={classes.MainContent}>

                <MainPresentation
                    carouselItems={this.props.mainPresentationItems}
                    carouselControlsItems={this.props.mainPresentationItemsControls}
                />

                <HtmlParser items={mainText} />

                <div className={classes.Clients}>
                    <ListSvg title={"Наши клиенты"} items={clients} typeSvg={svgType.CLIENTS} />
                </div>

            </div>
            
        );
    }
}

MainContent.propTypes = {

    mainPresentationItems: PropTypes.array.isRequired,
    mainPresentationItemsControls: PropTypes.array.isRequired
 
};

export default MainContent;
        