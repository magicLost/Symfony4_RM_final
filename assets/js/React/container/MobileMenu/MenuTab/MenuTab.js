import React from 'react';
import classes from './MenuTab.module.scss';
import PropTypes from 'prop-types';



class MenuTab extends React.PureComponent
{

    //TODO set height for MenuTabWrapper

    mainClass = '';
    itemClass = '';
    buttonClass = '';
    wrapperClass = '';

    //itemButtonRef = React.createRef();


    state = {

        //if props.layer > 1
        //buttonHeight: 0,

        isVisible_2: false,
        isVisible_3: false,

    };

    constructor(props){

        super(props);

        this.state = this._getInitState();

        this._setClasses();

        //console.log(this.props.items);

    }

    componentDidMount(){

        /*if(this.props.layer > 1){

            console.log(this.itemButtonRef.current.getBoundingClientRect().height);

            this.setState({
                buttonHeight: this.itemButtonRef.current.getBoundingClientRect().height
            })

        }*/

    }

    itemClickHandler = (event) => {

        const index = event.target.dataset.index;

        this.setState((prevState) => {

            const newState = {};

            newState["isVisible_" + index] = !prevState["isVisible_" + index];

            return newState;

        })

    };
    
    render(){

        const items = this.getItems();

        console.log("render MenuTabs");


        return (
        
            <div className={this.mainClass}>

                { items }

            </div>
            
        );
    }

    getItems = () => {

        /*let items = [];
        let index = 0;*/

        return this.props.items.map((item, index) => {

            if(item.items === null){

                return (

                    <div key={this.mainClass + index} className={this.itemClass}>

                        <a
                            className={this.buttonClass}
                            data-index={index}
                            href={item.href}
                        >{item.name}</a>

                    </div>

                );
            }else{

                let style = null;

                if(this.state["isVisible_" + index]){

                    //style = {height: "0", overflow: "hidden"};

                }else{

                    style = {height: "0", overflow: "hidden"};

                }


                return (

                    <div key={this.mainClass + index} className={this.itemClass}>

                        <button
                            className={this.buttonClass}
                            data-index={index}
                            onClick={this.itemClickHandler}
                        >{item.name}</button>

                        <div className={this.wrapperClass}  style={style}>

                            <MenuTab
                                layer={this.props.layer + 1}
                                items={item.items}
                            />

                        </div>

                    </div>

                );

            }
        });


    };

    _getInitState = () => {

        const initState = {};

        /*if(this.props.layer > 1){

            initState.buttonHeight = 0;

        }*/

        let index = 0;

       for(let item of this.props.items){

           if(item.items !== null){

               initState["isVisible_" + index] = false;

           }

       }

        return initState;

    };

    _setClasses = () => {

        const layer = this.props.layer;

        switch(layer){
            case 1:
                this.mainClass = classes.MenuTab__1;
                this.itemClass = classes.Item__1;
                this.buttonClass = classes.Button__1;
                this.wrapperClass = classes.MenuTabWrapper__2;
                break;
            case 2:
                this.mainClass = classes.MenuTab__2;
                this.itemClass = classes.Item__2;
                this.buttonClass = classes.Button__2;
                this.wrapperClass = classes.MenuTabWrapper__3;
                break;
            case 3:
                this.mainClass = classes.MenuTab__3;
                this.itemClass = classes.Item__3;
                this.buttonClass = classes.Button__3;
                //this.wrapperClass = classes.MenuTabWrapper__4;
                break;
            default: console.error("No classes for this layer == " + layer);
        }

    };

}

MenuTab.propTypes = {

    items: PropTypes.array.isRequired,
    layer: PropTypes.number.isRequired

 
};

export default MenuTab;
        