
export const EVENT_TYPE = {

    CLICK: "CLICK",
    LONG_TAP: "LONG_TAP",
    SWIPE: "SWIPE",
    SWIPE_MOVE: "SWIPE_MOVE",
    MOVE: "MOVE"

};


//return type of event after mouseUp or touchEnd
export default class EventSorter
{

    startX = 0;
    startY = 0;

    lastX = 0;
    lastFiveXTouchMove = [];
    lastFiveXTouchMoveIndex = 0;
    lastFiveXToucheMoveSum = 0;

    dist = 0;
    threshold = 120; //required min distance traveled to be considered swipe
    restraint = 100; // maximum distance allowed at the same time in perpendicular direction

    allowedTime = 200; // maximum time allowed to travel that distance
    allowedTimeToMoveSwipe = 30;
    elapsedTime = 0;
    elapsedTimeAfterMove = 0;
    startTime = 0;
    startTimeAfterMove = 0;

    swipeSpeed = 0;


    whatEventType = (pageY) => {

        if(this.dist === 0){

            if(this.elapsedTime > 200){

                return EVENT_TYPE.LONG_TAP;

            }else{

                return EVENT_TYPE.CLICK;

            }

        }else{

            if(this.isSwipe(pageY)){

                return EVENT_TYPE.SWIPE;

            }else if(this.isSwipeAfterMoving(pageY)){

                return EVENT_TYPE.SWIPE_MOVE;

            }

            return EVENT_TYPE.MOVE;

        }

    };


    onTouchStart = (pageX, pageY) => {

        this.lastFiveXTouchMove = [];
        this.lastFiveXTouchMoveIndex = 0;
        this.lastFiveXToucheMoveSum = 0;

        this.swipeSpeed = 0;
        this.dist = 0;
        this.startX = pageX;
        this.lastX = pageX;

        this.startY = pageY;
        this.startTime = new Date().getTime(); // record time when finger first makes contact with surface

    };

    onTouchMove = (pageX) => {

        let speed = this.lastX - pageX;

        this.lastX = pageX;


        this.lastFiveXTouchMove[this.lastFiveXTouchMoveIndex] = speed;

        this.lastFiveXTouchMoveIndex = (this.lastFiveXTouchMoveIndex >= 4) ? 0 : this.lastFiveXTouchMoveIndex + 1;

        this.startTimeAfterMove = new Date().getTime();

        //console.log(this.startTimeAfterMove);

    };

    onTouchEnd = (pageX) => {

        this.dist = pageX - this.startX; // get total dist traveled by finger while in contact with surface

        this.elapsedTime = new Date().getTime() - this.startTime; // get time elapsed
        this.elapsedTimeAfterMove = new Date().getTime() - this.startTimeAfterMove;


    };

    isSwipe = (pageY) => {

        for(let value of this.lastFiveXTouchMove){

            this.lastFiveXToucheMoveSum += value;

        }

        return  (this.elapsedTime <= this.allowedTime && Math.abs(this.dist) >= this.threshold && Math.abs(pageY - this.startY) <= this.restraint);

    };

    isSwipeAfterMoving = (pageY) => {

        /* this.lastFiveXTouchMove.map((value) => {

             this.lastFiveXToucheMoveSum += value;

         });*/

        for(let value of this.lastFiveXTouchMove){

            this.lastFiveXToucheMoveSum += value;

        }


        return (Math.abs(this.lastFiveXToucheMoveSum) > 50) && (Math.abs(pageY - this.startY) <= this.restraint && this.elapsedTimeAfterMove <= this.allowedTimeToMoveSwipe);

    };

    /*getSwipeSpeed = (isMoving) => {

        return (isMoving) ? this.lastFiveXToucheMoveSum * -1 / 100 : this.dist / this.elapsedTime;

    };*/

    getSwipeSpeed = () => {

        let speed = this.lastFiveXToucheMoveSum * -1 / 100;

        if(speed > 0){

            if(speed < 1)
                return 1;
            if(speed > 3)
                return 3;

        }else{

            if(speed < -3)
                return -3;
            if(speed > -1)
                return -1;

        }

        return speed;

    };



}