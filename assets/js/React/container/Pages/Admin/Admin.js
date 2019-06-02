import React from 'react';
import classes from './Admin.module.scss';
import PropTypes from 'prop-types';

import AddPhotoForm from "../../Forms/AddPhotoForm/AddPhotoForm";

class Admin extends React.PureComponent
{
    constructor(props){
        super(props);
    }


    render(){
        return (
        
            <div className={classes.Admin}>

                <AddPhotoForm
                    photoSizes={['300', '600']}
                    isShowForm={true}
                    url="http://public.local/admin/add_photos"
                    submitButtonValue={"Поехали"}
                    successMessage={"Урааааааааааааааааа!!!!!!!!"}
                    hiddenFields={ [{ name: "category", value: this.props.category }] }
                />

            </div>
            
        );
    }
}

Admin.propTypes = {

    mountNode: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired
 
};

export default Admin;
        