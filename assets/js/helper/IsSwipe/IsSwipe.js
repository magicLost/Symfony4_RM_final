
class IsSwipe
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
    elapsedTime = 0;
    startTime = 0;

    swipeSpeed = 0;

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

    };

    onTouchEnd = (pageX) => {

        this.dist = pageX - this.startX; // get total dist traveled by finger while in contact with surface

        this.elapsedTime = new Date().getTime() - this.startTime; // get time elapsed

    };

    isSwipe = (pageY) => {

        return  (this.elapsedTime <= this.allowedTime && Math.abs(this.dist) >= this.threshold && Math.abs(pageY - this.startY) <= this.restraint);

    };

    isSwipeAfterMoving = (pageY) => {

       /* this.lastFiveXTouchMove.map((value) => {

            this.lastFiveXToucheMoveSum += value;

        });*/

        for(let value of this.lastFiveXTouchMove){

            this.lastFiveXToucheMoveSum += value;

        }

        return (Math.abs(this.lastFiveXToucheMoveSum) > 50) && (Math.abs(pageY - this.startY) <= this.restraint);

    };

    getSwipeSpeed = (isMoving) => {

        return (isMoving) ? this.lastFiveXToucheMoveSum * -1 / 100 : this.dist / this.elapsedTime;

    };

}

export default IsSwipe;