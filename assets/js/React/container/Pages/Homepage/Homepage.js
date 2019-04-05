import React from 'react';
import classes from './Homepage.module.scss';
//import PropTypes from 'prop-types';
        
class Homepage extends React.Component
{
   /* constructor(props){
        super(props);
    }*/

    
    render(){
        return (
        
            <div className={classes.Homepage}>
                <h1>This is homePAGE mF...</h1>
                <a href="http://public.local/large-print">Широкоформатная печать.</a>
            </div>
            
        );
    }
}

Homepage.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default Homepage;
        