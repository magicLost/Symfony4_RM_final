import React from 'react';
import classes from './Homepage.module.scss';
import ControlsFeature, { formType, type } from "../../ControlsFeature/ControlsFeature";
import './../../../../../css/style.scss';
//import PropTypes from 'prop-types';
        
class Homepage extends React.PureComponent
{
   /* constructor(props){
        super(props);
    }*/

    
    render(){
        return (
        
            <div className={classes.Homepage}>
                <h1>This is homePAGE mF...</h1>
                <a href="http://public.local/large-print">Широкоформатная печать.</a>

                <section className={classes.Test}>
                    <div className={classes.TestItem}>
                        <ControlsFeature
                            items={[ 'Портфолио', 'Главное', 'Контакты' ]}
                            itemClickHandler={() => {  }}
                            formType={formType.BOTTOM_RIGHT_QUARTER}
                            itemsLength={3}
                            type={type.TEXT}
                            isShowTitle={false}
                        />
                    </div>
                    <div className={classes.TestItem}>
                        <ControlsFeature
                            items={[ 'Портфолио', 'Главное', 'Контакты' ]}
                            itemClickHandler={() => {  }}
                            formType={formType.BOTTOM_HALF_CIRCLE}
                            itemsLength={3}
                            type={type.TEXT}
                            isShowTitle={true}
                        />
                    </div>
                    <div className={classes.TestItem}>
                        <ControlsFeature
                            items={[ 'Портфолио', 'Главное', 'Контакты' ]}
                            itemClickHandler={() => {  }}
                            formType={formType.BOTTOM_RIGHT_QUARTER}
                            itemsLength={3}
                            type={type.TEXT}
                            isShowTitle={false}
                        />
                    </div>
                </section>


            </div>
            
        );
    }
}

Homepage.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
 
};

export default Homepage;
        