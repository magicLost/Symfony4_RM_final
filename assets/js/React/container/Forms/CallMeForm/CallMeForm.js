import React from 'react';
import classes from './CallMeForm.module.scss';
import PropTypes from 'prop-types';
        
class CallMeForm extends React.PureComponent
{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
        
            <div className={classes.CallMeForm}></div>
            
        );
    }
}

CallMeForm.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default CallMeForm;
        