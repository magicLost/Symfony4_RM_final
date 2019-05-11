import React from 'react';
import PropTypes from 'prop-types';
import './../../../../../css/style.scss';

import classes from './Homepage.module.scss';
import commonClasses from './../../../../../css/CommonClasses.module.scss';

import Header from "../Partial/Header/Header";
import MainContent from "./Content/MainContent/MainContent";
import Contacts from "../Partial/Contacts/Contacts";
import PortfolioContent from "./Content/PortfolioContent/PortfolioContent";
import FeedBackModalForm from "../../FeedBackModalForm/FeedBackModalForm";

import { elements } from "../../../../data/feedback_form_data";


class Homepage extends React.PureComponent
{
   /* constructor(props){
        super(props);
    }*/

    html = null;
    body = null;

    feedBackFormUrl = '';
    //wantTheSameFeedBackFormUrl = '';

    mainSectionClasses = classes.Section;
    portfolioSectionClasses = classes.Section;
    contactsSectionClasses = classes.Section;


    state = {

        activeSectionIndex: 1,

        isPortfolioSectionCreated: false,
        isContactsSectionCreated: false,


        isFeedBackFormCreated: false,
        isShowFeedBackForm: false,
        feedBackFormHiddenFields: [],
        feedBackFormUrl: ''

    };

    constructor(props){

        super(props);

        //this.mainFeedBackFormUrl = props.mountNode.dataset.mainFeedbackformUrl;
        //this.wantTheSameFeedBackFormUrl = props.mountNode.dataset.wantthesameFeedbackformUrl;
        this.feedBackFormUrl = props.mountNode.dataset.feedbackformUrl;

        this.html = document.querySelector("html");
        this.body = document.body;

        /*console.log("mainFeedBackFormUrl = " + this.mainFeedBackFormUrl);
        console.log("wantTheSameFeedBackFormUrl = " + this.wantTheSameFeedBackFormUrl);*/

    }


    toolBarButtonClick = (index) => {

        //const index = parseInt(event.target.dataset.index);

        this.setState((prevState) => {

            if(prevState.activeSectionIndex !== index){

                const newState = {};

                if(index === 0 && !prevState.isPortfolioSectionCreated){

                    newState.isPortfolioSectionCreated = true;

                }

                if(index === 2 && !prevState.isContactsSectionCreated){

                    newState.isContactsSectionCreated = true;

                }

                this._setClassesByActiveIndex(index, prevState.activeSectionIndex);

                newState.activeSectionIndex = index;

                this.html.scrollTop = 0;

                return newState;
            }

            return null;

        });

    };

    increaseSectionIndex = (event) => {

        event.stopPropagation();
        event.preventDefault();

        this.setState((prevState) => {

            if(prevState.activeSectionIndex < this.props.toolbarItems.length - 1){

                const newState = {};

                const newIndex = prevState.activeSectionIndex + 1;

                if(newIndex === 2 && !prevState.isContactsSectionCreated){

                    newState.isContactsSectionCreated = true;

                }

                this._setClassesByActiveIndex(newIndex, prevState.activeSectionIndex);

                newState.activeSectionIndex = newIndex;

                this.html.scrollTop = 0;

                return newState;

            }

            return null;

        });

    };

    decreaseSectionIndex = (event) => {

        event.stopPropagation();
        event.preventDefault();

        /*console.log(document.querySelector('main').scrollTop);
        console.log(document.querySelector('div.' + classes.Homepage).scrollTop);
        console.log(document.querySelector('#homepage_mount_node').scrollTop);*/

        this.setState((prevState) => {

            if(prevState.activeSectionIndex > 0){

                const newState = {};

                const newIndex = prevState.activeSectionIndex - 1;

                if(newIndex === 0 && !prevState.isPortfolioSectionCreated){

                    newState.isPortfolioSectionCreated = true;

                }

                this._setClassesByActiveIndex(newIndex, prevState.activeSectionIndex);

                newState.activeSectionIndex = newIndex;

                this.html.scrollTop = 0;

                return newState;

            }

            return null;

        });

    };


    showMainFeedBackForm = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("callMeButtonClickHandler");

        this.setState({

            isFeedBackFormCreated: true,
            isShowFeedBackForm: true,
            feedBackFormUrl: this.feedBackFormUrl

        });

        this.body.classList.add(commonClasses.StopScrolling);

    };

    showPortfolioFeedBackForm = (hiddenFields) => {

        console.log("callMeButtonClickHandler");

        this.setState({

            isFeedBackFormCreated: true,
            isShowFeedBackForm: true,
            feedBackFormHiddenFields: hiddenFields,
            feedBackFormUrl: this.feedBackFormUrl

        });

        this.body.classList.add(commonClasses.StopScrolling);

    };

    feedBackFormCloseButtonClickHandler = () => {

        console.log("feedBackFormCloseButtonClickHandler");

        this.setState({
            isShowFeedBackForm: false,
            feedBackFormHiddenFields: []
        });

        document.body.classList.remove(commonClasses.StopScrolling);

    };

    // mainMenuItems, toolbarItems, mainMenuButtonClickHandler, mainMenuCloseButtonClickHandler, callMeButtonClickHandler

    render(){

        console.log("Homepage render");

        return (

            <div className={classes.Homepage}>

                <Header

                    mainMenuItems={this.props.mainMenuItems}

                    toolbarItems={this.props.toolbarItems}
                    toolBarItemClick={ this.toolBarButtonClick }

                    activeSectionIndex={this.state.activeSectionIndex}
                    increaseSectionIndex={this.increaseSectionIndex}
                    decreaseSectionIndex={this.decreaseSectionIndex}
                    showFeedBackFormButtonClickHandler={this.showMainFeedBackForm}

                />

                {
                    this.state.isFeedBackFormCreated &&
                    <div className={classes.FeedBackForm} style={ this.state.isShowFeedBackForm ? null : {display: "none"} }>
                        <FeedBackModalForm
                            formElements={elements}
                            url={this.state.feedBackFormUrl}
                            submitButtonValue={"Отправить"}
                            closeButtonClickHandler={this.feedBackFormCloseButtonClickHandler}
                            hiddenFields={this.state.feedBackFormHiddenFields}
                        />
                    </div>
                }

                <main>

                    <div
                        className={this.mainSectionClasses}
                        style={(this.state.activeSectionIndex !== 1) ? { display: 'none'} : null}
                    >
                        <MainContent
                            mainPresentationItems={this.props.mainPresentationItems}
                            mainPresentationItemsControls={this.props.mainPresentationItemsControls}
                        />
                    </div>

                    { this.state.isPortfolioSectionCreated &&
                        <div
                            className={this.portfolioSectionClasses}
                            style={(this.state.activeSectionIndex !== 0) ? { display: 'none'} : null}
                        >
                            <PortfolioContent
                                categories={this.props.portfolioCategories}
                                icons={this.props.portfolioCategoriesIcons}
                                photos={this.props.portfolioPhotos}
                                showFeedBackFormHandler={this.showPortfolioFeedBackForm}
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

            case 1:

                if(prevIndex === 0){

                    this.mainSectionClasses = [ classes.Section, classes.AnimationMoveFromRightToCenter ].join(' ');
                    this.portfolioSectionClasses = classes.Section;
                    this.contactsSectionClasses = classes.Section;

                }else{

                    this.mainSectionClasses = [ classes.Section, classes.AnimationMoveFromLeftToCenter ].join(' ');
                    this.portfolioSectionClasses = classes.Section;
                    this.contactsSectionClasses = classes.Section;

                }

                break;

            case 0:

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

    mountNode: PropTypes.object.isRequired,

    toolbarItems: PropTypes.array.isRequired,

    mainMenuItems: PropTypes.array.isRequired,

    mainPresentationItems: PropTypes.array.isRequired,
    mainPresentationItemsControls: PropTypes.array.isRequired,

    portfolioCategories: PropTypes.array.isRequired,
    portfolioCategoriesIcons: PropTypes.array.isRequired,
    portfolioPhotos: PropTypes.array.isRequired

};

export default Homepage;
        