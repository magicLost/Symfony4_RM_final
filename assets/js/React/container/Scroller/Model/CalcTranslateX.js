
class CalcTranslateX
{

    numberOfItems = 0;

    listWidth = 0;
    itemWidth = 0;

    swipeDist = 0;

    //translateXDifferencial = 0;

    minTranslateOffset = 0;
    maxTranslateOffset = 0;

    //checkClickTranslateX = 0;

    pageXStart = 0;
    pageYStart = 0;
    prevPageX = 0;
    pageX = 0;
    //startTranslateX = 0;
    //translateX = 0;

    setValues = (listWidth, itemWidth, numberOfItems) => {

        this.numberOfItems = numberOfItems;

        this.listWidth = listWidth;
        this.itemWidth = itemWidth;

        this.setTranslateOffsets();

        this.swipeDist = Math.round(this.itemWidth * this.numberOfItems / 10);

        /* console.log("minTranslateOffset = " + this.minTranslateOffset);
         console.log("maxTranslateOffset = " + this.maxTranslateOffset);
         console.log("listWidth = " + this.listWidth);
         console.log("itemWidth = " + this.itemWidth);*/


    };

    setTranslateOffsets = () => {

        this.maxTranslateOffset = 0;
        this.minTranslateOffset = this.listWidth - this.itemWidth * this.numberOfItems;

    };

    isOutsideOffset = (translateX) => {

        return translateX > this.maxTranslateOffset || translateX < this.minTranslateOffset;

    };

    calcTranslateXOnMove = (stateTranslateX, pageX) => {

        let translateX = 0;

        if(stateTranslateX > this.maxTranslateOffset){

            if(pageX > this.prevPageX){

                translateX += 0.3;

            }else{

                //translateX -= 0.3;
                translateX = pageX - this.prevPageX;

            }

        }else if(stateTranslateX < this.minTranslateOffset){

            if(pageX > this.prevPageX){

                //translateX += 0.3;
                translateX = pageX - this.prevPageX;

            }else{

                translateX -= 0.3;


            }

        }else{

            translateX = pageX - this.prevPageX;

        }

        this.prevPageX = pageX;


        return translateX;

    };

    calcTranslateXOnSwipe = (speed) => {

        return this.swipeDist * speed;

    }


}

export default CalcTranslateX;