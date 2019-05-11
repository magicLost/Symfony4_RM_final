import React from 'react';
import classes from './PortfolioContent.module.scss';
import PropTypes from 'prop-types';
import PortfolioSlider from "../../../../PortfolioSlider/PortfolioSlider";
        
class PortfolioContent extends React.PureComponent
{
   /* constructor(props){
        super(props);
    }*/
    
    render(){

        return (
        
            <div className={classes.PortfolioContent}>

                <PortfolioSlider
                    categories={this.props.categories}
                    icons={this.props.icons}
                    photos={this.props.photos}
                    showFeedBackFormHandler={this.props.showFeedBackFormHandler}
                />

            </div>
            
        );
    }
}

PortfolioContent.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
    categories: PropTypes.array.isRequired,
    icons: PropTypes.array.isRequired,
    photos: PropTypes.array.isRequired,

    showFeedBackFormHandler: PropTypes.func.isRequired

};

export default PortfolioContent;
        