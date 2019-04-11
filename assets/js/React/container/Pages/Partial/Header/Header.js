import React from 'react';
import PropTypes from 'prop-types';

import classes from './Header.module.scss';
import Logo from "../../../../component/Logo/Logo";
import ControlsFeature, {formType, type} from "../../../ControlsFeature/ControlsFeature";
import MainMenuButton from "../../../../component/UI/MainMenuButton/MainMenuButton";
import ToolButtons from "../../../../component/ToolButtons/ToolButtons";
import MobileMenu from "../../../MobileMenu/MobileMenu";

class Header extends React.PureComponent
{

   render(){

       console.log("header render");

       return (

           <header className={classes.Header}>

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
                       />

                   </div>

                   <div className={classes.MainMenuButton}>

                       <MainMenuButton
                           title={"Меню"}
                           clickHandler={this.props.mainMenuButtonClickHandler}
                       />

                   </div>


               </div>

               <ToolButtons
                   callMeButtonClickHandler={this.props.callMeButtonClickHandler}
               />

               {
                   this.props.isMainMenuCreated &&
                   <nav className={classes.Navigation} style={ this.props.isShowMainMenu ? null : {display: "none"} }>
                       <MobileMenu
                           items={this.props.mainMenuItems}
                           closeButtonClickHandler={this.props.mainMenuCloseButtonClickHandler}
                           backDropClickHandler={this.props.mainMenuCloseButtonClickHandler}
                       />
                   </nav>
               }



           </header>

       );

   }

}



Header.propTypes = {

    //["Главное", "Портфолио", "Контакты"]
    toolbarItems: PropTypes.array.isRequired,
    mainMenuItems: PropTypes.array.isRequired,

    mainMenuButtonClickHandler: PropTypes.func.isRequired,
    mainMenuCloseButtonClickHandler: PropTypes.func.isRequired,
    callMeButtonClickHandler: PropTypes.func.isRequired,
    toolBarItemClick: PropTypes.func.isRequired,

    isMainMenuCreated: PropTypes.bool.isRequired,
    isShowMainMenu: PropTypes.bool.isRequired,

};

export default Header;