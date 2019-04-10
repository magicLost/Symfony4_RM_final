import React from 'react';
import classes from './LargeFormatPrint.module.scss';
//import PropTypes from 'prop-types';
        
class LargeFormatPrint extends React.PureComponent
{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        
            <div className={classes.LargeFormatPrint}>

                <h1>LargeFormatPrint</h1>

            </div>
            
        );
    }
}

LargeFormatPrint.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default LargeFormatPrint;
        