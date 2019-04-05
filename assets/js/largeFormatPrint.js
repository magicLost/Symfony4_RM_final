import React from 'react';
import ReactDOM from 'react-dom';


//import './../style/style.scss';
import LargeFormatPrint from "./React/container/Pages/LargeFormatPrint/LargeFormatPrint";


const mountNode =  document.getElementById('print_mount_node');

ReactDOM.render(
    <LargeFormatPrint/>,
    mountNode
);