import React from 'react';
import classes from './MainContent.module.scss';
import PropTypes from 'prop-types';
import MainPresentation from "../../../../MainPresentation/MainPresentation";
        
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

                <h3>What the f..k.</h3>
                <p>Hello, my friend..</p>

            </div>
            
        );
    }
}

MainContent.propTypes = {

    mainPresentationItems: PropTypes.array.isRequired,
    mainPresentationItemsControls: PropTypes.array.isRequired
 
};

export default MainContent;
        