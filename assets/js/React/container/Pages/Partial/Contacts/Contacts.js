import React from 'react';
import classes from './Contacts.module.scss';
import PropTypes from 'prop-types';
//import map from '../../../../../../static/map/RM_named_map.png';
import ListSvg, {svgType} from "../../../../component/UI/ListSvg/ListSvg";
import ListSvgWithText from "../../../../component/UI/ListSvgWithText/ListSvgWithText";
import { social, contacts } from "../../../../../data/contacts_data";

class Contacts extends React.PureComponent
{
    
    render(){
        return (
        
            <div className={classes.Wrapper}>

                <div className={classes.Map}>

                    <a href={'#'} > Санкт-Петербург, ул. Сабировская, 37</a>

                </div>

                <div className={classes.Contacts}>

                    <ListSvgWithText title={"Наши контакты"} items={contacts}/>

                </div>

                <div className={classes.Social}>

                    <ListSvg title={"Мы в социальных сетях"} items={social} typeSvg={svgType.SOCIAL}/>

                </div>

            </div>
            
        );
    }
}

Contacts.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default Contacts;
        