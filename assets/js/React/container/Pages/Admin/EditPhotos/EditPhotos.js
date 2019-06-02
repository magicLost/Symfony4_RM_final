import React from 'react';
import classes from './EditPhotos.module.scss';
import PropTypes from 'prop-types';
import CarouselOpacity from "../../../Carousel/CarouselOpacity/CarouselOpacity";
import Switcher from "../../../../component/Switcher/Switcher";
import { element } from "../../../../../data/editPhoto_data";
import Button from "../../../../component/UI/Button/Button";
import AddPhotoForm from "../../../Forms/AddPhotoForm/AddPhotoForm";



class EditPhotos extends React.PureComponent
{
    categories = [];
    photoSizes = [];
    photos = [];

    addPhotoFormUrl = '';

    addPhotoFormElements = {};

    state = {

        categoryIndex: 0,
        isShowAddPhotoForm: false

    };

    constructor(props){

        super(props);

        //[ { id: 0, name: 'Оклейка авто'} ]
        this.categories = JSON.parse(this.props.mountNode.dataset.categories);
        //[ "size1", "size2" ]
        this.photoSizes = JSON.parse(this.props.mountNode.dataset.photoSizes);
        this.photos = JSON.parse(this.props.mountNode.dataset.photos);

        this.addPhotoFormUrl = this.props.mountNode.dataset.addPhotoFormUrl;

        let i = 1;

        for( let size of this.photoSizes ){

            let name = "photo_" + size;

            this.addPhotoFormElements[name] = {...element};
            this.addPhotoFormElements[name].elementAttrs = {...element.elementAttrs};
            this.addPhotoFormElements[name].validators = {...element.validators};
            this.addPhotoFormElements[name].validators.fileSize = {...element.validators.fileSize};

            this.addPhotoFormElements[name].elementAttrs.name = name;
            this.addPhotoFormElements[name].elementAttrs.id = name;

            this.addPhotoFormElements[name].validators.fileSize.maxSize = this.addPhotoFormElements[name].validators.fileSize.maxSize * i;

            i++;

        }

        console.log(this.categories);
        console.log(this.photoSizes);
        console.log(this.photos);
        console.log(this.addPhotoFormUrl);

    }

    decreaseCategoryIndex = () => {

        this.setState((prevState) => {

            if(prevState.categoryIndex === 0)
                return null;

            return { categoryIndex: prevState.categoryIndex - 1 };

        })

    };

    increaseCategoryIndex = () => {

        this.setState((prevState) => {

            if(prevState.categoryIndex === this.categories.length - 1)
                return null;

            return { categoryIndex: prevState.categoryIndex + 1 };

        })

    };

    getCarouselItem = (index, activeIndex) => {

        return this.photoSizes.map((sizeName, ind) => {

            let photos = null;

            if(this.photos[this.categories[index].id]){

                photos = this.photos[this.categories[index].id].map((photoName) => {

                    //<img key={photoName + "_" + sizeName + ".jpg"} src={ photoName + "_" + sizeName + ".jpg"} alt=""/>

                    return (
                        <div key={photoName + "_" + sizeName + ".jpg"} className={classes.Img}>
                            <h5>{ photoName + "_" + sizeName + ".jpg"}</h5>
                        </div>
                    );

                });

            }



            return (

                <div key={classes.CategorySection + ind} className={classes.CategorySection}>

                    <h4>{ "Размер фото - " +  sizeName }</h4>

                    <div className={classes.Photos}>

                        { photos }

                    </div>

                </div>

            );

        })

    };

    addPhotoButtonClick = (event) => {

        event.preventDefault();
        event.stopPropagation();

        this.setState((prevState) => {

            if(prevState.isShowAddPhotoForm === false)
                return { isShowAddPhotoForm: true };

            return null;

        });

    };

    closeAddPhotoButtonClick = () => {

        //event.preventDefault();
        //event.stopPropagation();

        this.setState((prevState) => {

            if(prevState.isShowAddPhotoForm === true)
                return { isShowAddPhotoForm: false };

            return null;

        });

    };


    render(){
        return (
        
            <div className={classes.EditPhotos}>

                { this.state.isShowAddPhotoForm &&
                        <AddPhotoForm
                            photoSizes={this.photoSizes}
                            isShowForm={this.state.isShowAddPhotoForm}
                            url={this.addPhotoFormUrl}
                            submitButtonValue={"Отправить"}
                            successMessage={"Фотки успешно добавлены..."}
                            hiddenFields={ [{ name: "category", value: this.categories[this.state.categoryIndex].name }] }
                            closeButtonClickHandler={this.closeAddPhotoButtonClick}
                        />
                }

                <Switcher
                    title={this.categories[this.state.categoryIndex].name}
                    increaseFunc={this.increaseCategoryIndex}
                    decreaseFunc={this.decreaseCategoryIndex}
                />

                <CarouselOpacity
                    items={this.categories}
                    getItem={this.getCarouselItem}
                    activeIndex={this.state.categoryIndex}
                    increaseActiveIndex={this.increaseCategoryIndex}
                    decreaseActiveIndex={this.decreaseCategoryIndex}
                />

                <Button value={"Добавить фото..."} style={{marginTop: '30px'}} onClick={this.addPhotoButtonClick}/>

            </div>
            
        );
    }
}

EditPhotos.propTypes = {

    mountNode: PropTypes.object.isRequired,
 
};

export default EditPhotos;
        