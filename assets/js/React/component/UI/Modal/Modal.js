import React from 'react';
import classes from './Modal.module.scss';
import PropTypes from "prop-types";
import BackDrop from "../BackDrop/BackDrop";
import bodyClass from "../../../../../css/CommonClasses.module.scss";


class Modal extends React.Component{

    shouldComponentUpdate(nextProps){

        if(this.props.show === false && nextProps.show === true)
            document.body.classList.add(bodyClass);

        if(this.props.show === true && nextProps.show === false)
            document.body.classList.remove(bodyClass);

        return nextProps.show !== this.props.show;

    }

    render(){
        return (
            <>
                <BackDrop show={this.props.show} backdropClickHandler={this.props.backdropClickHandler} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </>
        );
    }

}

Modal.propTypes = {

    show: PropTypes.bool,
    backdropClickHandler: PropTypes.func,

};

export default Modal;