import React from 'react';
import classes from './Contacts.module.scss';
import PropTypes from 'prop-types';
//import map from '../../../../../../static/map/RM_named_map.png';
import ListSvg, {svgType} from "../../../../component/UI/ListSvg/ListSvg";
import ListSvgWithText from "../../../../component/UI/ListSvgWithText/ListSvgWithText";
import { social, contacts } from "../../../../../data/contacts_data";

class Contacts extends React.PureComponent
{
   /* constructor(props){
        super(props);
    }*/
    
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


               {/* <div className={classes.Contacts}>

                    <h2>Наши контакты.</h2>
                    
                    <ul className={classes.ContactsList}>
                        <li className={classes.ContactsItem}>
                            <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                <use xlinkHref={icons + '#male'} />
                            </svg>
                            <a href={"#"}>
                                info@reklam-market.ru
                            </a>
                        </li>
                        <li className={classes.ContactsItem}>
                            <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                <use xlinkHref={icons + '#phone'} />
                            </svg>
                            <p>+7(812)438-03-78</p>
                        </li>
                        <li className={classes.ContactsItem}>
                            <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                <use xlinkHref={icons + '#map_address'} />
                            </svg>
                            <p>Санкт-Петербург, ул. Сабировская, 37</p>
                        </li>
                        <li className={classes.ContactsItem}>
                            <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                <use xlinkHref={icons + '#clock'} />
                            </svg>
                            <p>
                                Пн-Пт с 10:00 до 19:00
                            </p>
                        </li>
                        <li className={classes.ContactsItem}>
                            <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                <use xlinkHref={icons + '#skype'} />
                            </svg>
                            <p>rpkreklam-market</p>
                        </li>
                        <li className={classes.ContactsItem}>
                            <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                <use xlinkHref={icons + '#icq'}  />
                            </svg>
                            <p>618821130</p>
                        </li>
                    </ul>

                </div>

                <div className={classes.Social}>

                    <h2>Мы в социальных сетях</h2>

                    <ul className={classes.SocialList}>
                        <li >
                            <a href={"#"} className={classes.Vk} >
                                <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                    <use xlinkHref={icons + '#vk'} />
                                </svg>
                            </a>
                        </li>
                        <li >
                            <a href="#" className={classes.Twitter} >
                                <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                    <use xlinkHref={icons + '#twitter'} />
                                </svg>
                            </a>
                        </li>
                        <li >
                            <a href="#" className={classes.Instagram} >
                                <svg width={"10"} height={"10"} viewBox={"0 0 1024 1024"}>
                                    <use xlinkHref={icons + '#instagram'} />
                                </svg>
                            </a>
                        </li>
                    </ul>

                </div>*/}

            </div>
            
        );
    }
}

Contacts.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default Contacts;
        