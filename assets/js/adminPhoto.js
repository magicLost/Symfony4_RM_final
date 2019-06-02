import React from 'react';
import ReactDOM from 'react-dom';

import './../css/style.scss';
import EditPhotos from "./React/container/Pages/Admin/EditPhotos/EditPhotos";
//import Admin from "./React/container/Pages/Admin/Admin";

const mountNode =  document.getElementById('adminPhoto_mount_node');

ReactDOM.render(
    <EditPhotos
        mountNode={mountNode}
    />,
    mountNode
);