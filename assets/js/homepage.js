import React from 'react';
import ReactDOM from 'react-dom';


//import './../style/style.scss';
import Homepage from "./React/container/Pages/Homepage/Homepage";

const mountNode =  document.getElementById('homepage_mount_node');

ReactDOM.render(
    <Homepage/>,
    mountNode
);