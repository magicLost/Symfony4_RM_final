import React from 'react';
import classes from './MobileMenu.module.scss';
import PropTypes from 'prop-types';

import MenuTab from "./MenuTab/MenuTab";
import CloseButton from "../../component/UI/CloseButton/CloseButton";
//import icons from '../../static/icons/ICONS.svg';



class MobileMenu extends React.PureComponent
{
    /*constructor(props){
        super(props);
    }*/

    backDropClickHandler = (event) => {

        event.preventDefault();
        event.stopPropagation();


        if(event.target.className !== classes.MobileMenu) return;

        this.props.backDropClickHandler();

    };
    
    render(){

        return (

            <div
                className={classes.MobileMenu}
                onClick={this.backDropClickHandler}
            >

                <div className={classes.Wrapper}>

                    <div className={classes.Menu}>

                        <CloseButton
                            color={"black"}
                            clickHandler={this.props.closeButtonClickHandler}
                        />

                        <MenuTab items={this.props.items} layer={1}/>

                    </div>

                </div>

            </div>

        );
    }
}

MobileMenu.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    closeButtonClickHandler: PropTypes.func.isRequired,
    backDropClickHandler: PropTypes.func.isRequired,
 
};

export default MobileMenu;
        