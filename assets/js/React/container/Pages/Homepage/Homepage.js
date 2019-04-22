import React from 'react';
import PropTypes from 'prop-types';
import './../../../../../css/style.scss';

import classes from './Homepage.module.scss';
import commonClasses from './../../../../../css/CommonClasses.module.scss';

import Header from "../Partial/Header/Header";
import MainContent from "./Content/MainContent/MainContent";
import Contacts from "../Partial/Contacts/Contacts";
import PortfolioContent from "./Content/PortfolioContent/PortfolioContent";

        
class Homepage extends React.PureComponent
{
   /* constructor(props){
        super(props);
    }*/

    mainSectionClasses = classes.Section;
    portfolioSectionClasses = classes.Section;
    contactsSectionClasses = classes.Section;


    state = {

        activeSectionIndex: 0,

        isMainMenuCreated: false,
        isCallMeFormCreated: false,

        isShowMainMenu: false,
        isShowCallMeForm: false,

        isPortfolioSectionCreated: false,
        isContactsSectionCreated: false

    };

    mainMenuButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("mainMenuButtonClickHandler");

        this.setState({

            isMainMenuCreated: true,
            isShowMainMenu: true

        });

        document.body.classList.add(commonClasses.StopScrolling);

    };

    mainMenuCloseButtonClickHandler = (event) => {

        if(event){
            event.preventDefault();
            event.stopPropagation();
        }

        this.setState({
            isShowMainMenu: false
        });

        document.body.classList.remove(commonClasses.StopScrolling);

    };

    callMeButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("callMeButtonClickHandler");

    };

    toolBarButtonClick = (index) => {

        //const index = parseInt(event.target.dataset.index);

        this.setState((prevState) => {

            if(prevState.activeSectionIndex !== index){

                const newState = {};

                if(index === 1 && !prevState.isPortfolioSectionCreated){

                    newState.isPortfolioSectionCreated = true;

                }

                if(index === 2 && !prevState.isContactsSectionCreated){

                    newState.isContactsSectionCreated = true;

                }

                this._setClassesByActiveIndex(index, prevState.activeSectionIndex);

                newState.activeSectionIndex = index;

                return newState;
            }

            return null;

        });

    };


    // mainMenuItems, toolbarItems, mainMenuButtonClickHandler, mainMenuCloseButtonClickHandler, callMeButtonClickHandler

    render(){

        console.log("Homepage render");

        return (

            <div className={classes.Homepage}>

                <Header
                    mainMenuItems={this.props.mainMenuItems}
                    toolbarItems={this.props.toolbarItems}
                    mainMenuButtonClickHandler={this.mainMenuButtonClickHandler}
                    mainMenuCloseButtonClickHandler={this.mainMenuCloseButtonClickHandler}
                    callMeButtonClickHandler={ this.callMeButtonClickHandler }
                    toolBarItemClick={ this.toolBarButtonClick }

                    isMainMenuCreated={this.state.isMainMenuCreated}
                    isShowMainMenu={this.state.isShowMainMenu}
                />

                <main>

                    <div
                        className={this.mainSectionClasses}
                        style={(this.state.activeSectionIndex !== 0) ? { display: 'none'} : null}
                    >
                        <MainContent
                            mainPresentationItems={this.props.mainPresentationItems}
                            mainPresentationItemsControls={this.props.mainPresentationItemsControls}
                        />
                    </div>

                    { this.state.isPortfolioSectionCreated &&
                        <div
                            className={this.portfolioSectionClasses}
                            style={(this.state.activeSectionIndex !== 1) ? { display: 'none'} : null}
                        >
                            <PortfolioContent
                                categories={this.props.portfolioCategories}
                                icons={this.props.portfolioCategoriesIcons}
                                photos={this.props.portfolioPhotos}
                            />
                        </div>
                    }

                </main>

                <footer>

                    { this.state.isContactsSectionCreated &&
                        <div
                            className={this.contactsSectionClasses}
                            style={(this.state.activeSectionIndex !== 2) ? { display: 'none'} : null}
                        >
                            <Contacts/>
                        </div>
                    }

                </footer>


            </div>
            
        );
    }

    _setClassesByActiveIndex = (activeIndex, prevIndex) => {

        switch(activeIndex){

            case 0:

                if(prevIndex === 1){

                    this.mainSectionClasses = [ classes.Section, classes.AnimationMoveFromRightToCenter ].join(' ');
                    this.portfolioSectionClasses = classes.Section;
                    this.contactsSectionClasses = classes.Section;

                }else{

                    this.mainSectionClasses = [ classes.Section, classes.AnimationMoveFromLeftToCenter ].join(' ');
                    this.portfolioSectionClasses = classes.Section;
                    this.contactsSectionClasses = classes.Section;

                }

                break;

            case 1:

                this.mainSectionClasses = classes.Section;
                this.portfolioSectionClasses = [ classes.Section, classes.AnimationMoveFromLeftToCenter ].join(' ');
                this.contactsSectionClasses = classes.Section;
                break;

            case 2:
                this.mainSectionClasses = classes.Section;
                this.portfolioSectionClasses = classes.Section;
                this.contactsSectionClasses = [ classes.Section, classes.AnimationMoveFromRightToCenter ].join(' ');
                break;

            default: console.error("no implementation for index == " + activeIndex);

        }

    };
}

Homepage.propTypes = {

    toolbarItems: PropTypes.array.isRequired,

    mainMenuItems: PropTypes.array.isRequired,

    mainPresentationItems: PropTypes.array.isRequired,
    mainPresentationItemsControls: PropTypes.array.isRequired,

    portfolioCategories: PropTypes.array.isRequired,
    portfolioCategoriesIcons: PropTypes.array.isRequired,
    portfolioPhotos: PropTypes.array.isRequired

};

export default Homepage;
        