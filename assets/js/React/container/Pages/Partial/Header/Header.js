import React from 'react';
import PropTypes from 'prop-types';

import classes from './Header.module.scss';
import commonClasses from "../../../../../../css/CommonClasses.module.scss";

import Logo from "../../../../component/Logo/Logo";
import ControlsFeature, {formType, type} from "../../../ControlsFeature/ControlsFeature";
import MainMenuButton from "../../../../component/UI/MainMenuButton/MainMenuButton";
import ToolButtons from "../../../../component/ToolButtons/ToolButtons";
import MobileMenu from "../../../MobileMenu/MobileMenu";
//import FeedBackModalForm from "../../../FeedBackModalForm/FeedBackModalForm";
//import { elements } from "../../../../../data/feedback_form_data";

class Header extends React.PureComponent
{

    previousY = 0;
    body = null;

    controlsFeatureConfig = {
        mainItemStyle: { backgroundColor: "#fff" }
    };

    state = {

        isShow: true,

        isShowMainMenu: false,
        isShowCallMeForm: false,

        //isFeedBackFormCreated: false,
        //isShowFeedBackForm: false,

    };

    componentDidMount = () => {

        this.body = document.body;
        window.addEventListener('scroll', this.windowScrollHandler, false);

    };

    windowScrollHandler = (event) => {

        const y = this.body.getBoundingClientRect().y;

        if(this.previousY > y){

            console.log("Hide");
            this.setState((prevState) => {

                if(prevState.isShow === true){
                    return { isShow: false };
                }

                return null;

            });

        }else{

            console.log("Show");
            this.setState((prevState) => {

                if(prevState.isShow === false){
                    return { isShow: true };
                }

                return null;

            });

        }

        this.previousY = y;

        //console.log(document.body.getBoundingClientRect());

    };

    mainMenuButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("mainMenuButtonClickHandler");

        this.setState({

            isMainMenuCreated: true,
            isShowMainMenu: true

        });

        this.body.classList.add(commonClasses.StopScrolling);

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

  /*  callMeButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("callMeButtonClickHandler");

        this.setState({

            isFeedBackFormCreated: true,
            isShowFeedBackForm: true

        });

        this.body.classList.add(commonClasses.StopScrolling);

    };

    feedBackFormCloseButtonClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();

        console.log("feedBackFormCloseButtonClickHandler");

        this.setState({
            isShowFeedBackForm: false
        });

        document.body.classList.remove(commonClasses.StopScrolling);

    };*/


    render(){

       console.log("header render");

       const style = (!this.state.isShow) ? { display: "none"} : null;

       return (

           <header
               className={classes.Header}
               style={style}
           >

               <div className={classes.Wrapper}>

                   <div className={classes.Logo}>

                       <Logo
                           isHomepage={false}
                           homePagePath={''}
                       />

                   </div>

                   <div className={classes.Toolbar}>

                       <ControlsFeature
                           itemClickHandler={this.props.toolBarItemClick}
                           formType={formType.BOTTOM_HALF_CIRCLE}
                           type={type.TEXT}
                           itemsLength={this.props.toolbarItems.length}
                           items={this.props.toolbarItems}
                           isShowTitle={false}
                           isMainItemText={false}
                           config={this.controlsFeatureConfig}
                       />

                   </div>

                   <div className={classes.MainMenuButton}>

                       <MainMenuButton
                           title={"Меню"}
                           clickHandler={this.mainMenuButtonClickHandler}
                       />

                   </div>


               </div>

               <ToolButtons
                   callMeButtonClickHandler={this.props.showFeedBackFormButtonClickHandler}
                   activeSectionIndex={this.props.activeSectionIndex}
                   increaseSectionIndex={this.props.increaseSectionIndex}
                   decreaseSectionIndex={this.props.decreaseSectionIndex}
                   sectionsLength={this.props.toolbarItems.length}
               />



               {
                   this.state.isMainMenuCreated &&
                   <nav className={classes.Navigation} style={ this.state.isShowMainMenu ? null : {display: "none"} }>
                       <MobileMenu
                           items={this.props.mainMenuItems}
                           closeButtonClickHandler={this.mainMenuCloseButtonClickHandler}
                           backDropClickHandler={this.mainMenuCloseButtonClickHandler}
                       />
                   </nav>
               }

             {/*  {
                   this.props.isFeedBackFormCreated &&
                   <div className={classes.FeedBackForm} style={ this.props.isShowFeedBackForm ? null : {display: "none"} }>
                       <FeedBackModalForm
                           formElements={elements}
                           url={"#"}
                           submitButtonValue={"Отправить"}
                           closeButtonClickHandler={this.feedBackFormCloseButtonClickHandler}
                       />
                   </div>
               }*/}

           </header>

       );

   }

}



Header.propTypes = {

    //["Главное", "Портфолио", "Контакты"]
    toolbarItems: PropTypes.array.isRequired,
    mainMenuItems: PropTypes.array.isRequired,

/*    mainMenuButtonClickHandler: PropTypes.func.isRequired,
    mainMenuCloseButtonClickHandler: PropTypes.func.isRequired,
    callMeButtonClickHandler: PropTypes.func.isRequired,*/
    toolBarItemClick: PropTypes.func.isRequired,

    // activeSectionIndex, increaseSectionIndex, decreaseSectionIndex
    activeSectionIndex: PropTypes.number.isRequired,
    increaseSectionIndex: PropTypes.func.isRequired,
    decreaseSectionIndex: PropTypes.func.isRequired,

   /* isMainMenuCreated: PropTypes.bool.isRequired,
    isShowMainMenu: PropTypes.bool.isRequired,*/

   /* isFeedBackFormCreated: PropTypes.bool.isRequired,
    isShowFeedBackForm: PropTypes.bool.isRequired,*/

    showFeedBackFormButtonClickHandler: PropTypes.func.isRequired,
    //closeFeedBackFormButtonClickHandler: PropTypes.func.isRequired,


};

export default Header;