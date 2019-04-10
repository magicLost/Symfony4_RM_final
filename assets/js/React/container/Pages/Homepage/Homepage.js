import React from 'react';
import PropTypes from 'prop-types';
import './../../../../../css/style.scss';

import classes from './Homepage.module.scss';
import commonClasses from './../../../../../css/CommonClasses.module.scss';

import Header from "../../../component/Header/Header";

/*import ControlsFeature, { formType, type } from "../../ControlsFeature/ControlsFeature";
import Logo from "../../../component/Logo/Logo";
import MainMenuButton from "../../../component/UI/MainMenuButton/MainMenuButton";
import MobileMenu from "../../MobileMenu/MobileMenu";
import ToolButtons from "../../../component/ToolButtons/ToolButtons";*/




        
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

    controlsFeatureItemClickHandler = (index) => {

        console.log("set state active section with index == " + index);

        this.setState((prevState) => {

            if(prevState.activeSectionIndex !== index){

                return {
                    activeSectionIndex: index
                }

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
                    toolBarItemClick={ this.controlsFeatureItemClickHandler }

                    isMainMenuCreated={this.state.isMainMenuCreated}
                    isShowMainMenu={this.state.isShowMainMenu}
                />

                {/*<header className={classes.Header}>

                    <div className={classes.Wrapper}>

                        <div className={classes.Logo}>

                            <Logo />

                        </div>

                        <div className={classes.Toolbar}>

                            <ControlsFeature
                                itemClickHandler={() => {}}
                                formType={formType.BOTTOM_HALF_CIRCLE}
                                type={type.TEXT}
                                itemsLength={3}
                                items={this.props.toolbarItems}
                                isShowTitle={false}
                                isMainItemText={false}
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
                        callMeButtonClickHandler={() => { console.log("callMeButtonClickHandler"); }}
                    />

                    {
                        this.state.isMainMenuCreated &&
                        <nav className={classes.Navigation} style={ this.state.isShowMainMenu ? null : {display: "none"} }>
                            <MobileMenu
                                items={this.props.mainMenuItems}
                                closeButtonClickHandler={this.mainMenuCloseButtonClickHandler}
                                backDropClickHandler={this.mainMenuBackDropClickHandler}
                            />
                        </nav>
                    }



                </header>*/}

                <main>

                    <h1>Content {this.state.activeSectionIndex}</h1>

                </main>

                <footer>



                </footer>


            </div>
            
        );
    }
}

Homepage.propTypes = {

    //["Главное", "Портфолио", "Контакты"]
    toolbarItems: PropTypes.array.isRequired,
    mainMenuItems: PropTypes.array.isRequired,
 
};

export default Homepage;
        