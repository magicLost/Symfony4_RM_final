import React from 'react';
import ReactDOM from 'react-dom';

import './../css/style.scss';
/*
import Homepage from "./React/container/Pages/Homepage/Homepage";
import {
    toolbarItemsArray,
    mainPresentationItems,
    mainPresentationItemsControls } from "./data/homepage_data";
import { mainMenuItems } from "./data/header_data";
import { categories, icons, photos } from "./data/portfolio_data";
*/
import { elements } from "./data/feedback_form_data";
import Example from "./React/component/Example/Example";
//import ZForm from "./React/container/ZForm/ZForm";
//import FeedBackForm from "./React/container/FeedBackForm/FeedBackForm";


const mountNode =  document.getElementById('homepage_mount_node');

/*
ReactDOM.render(
    <Homepage

        mountNode={mountNode}

        toolbarItems={toolbarItemsArray}

        mainMenuItems={mainMenuItems}

        mainPresentationItems={mainPresentationItems}
        mainPresentationItemsControls={mainPresentationItemsControls}

        portfolioCategories={categories}
        portfolioCategoriesIcons={icons}
        //portfolioPhotos={photos}
        portfolioPhotos={photos}
    />,
    mountNode
);*/

/*
ReactDOM.render(
    <FeedBackForm
        url={'http://public.local/feedback'}
        elements={elements}
        submitButtonValue={"Отправить"}
        validateOnSubmit={() => { return '';}}
        createToken={(data) => { return 'token'; }}
        successOKButtonClickHandler={() => { console.log("OK") }}
    />,
    mountNode
);*/

ReactDOM.render(
    <Example/>,
    mountNode
);