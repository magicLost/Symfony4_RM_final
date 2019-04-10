import IsSwipe from "./IsSwipe";

describe("IsSwipe - check is swipe ", () => {

    let swipe = new IsSwipe();

    beforeEach(() => {

        //swipe = new IsSwipe();

    });

    describe("On touch events", () => {

        test("onTouchStart - nullify values and set values ", () => {

            swipe.lastFiveXTouchMove = [ 1, 2];
            swipe.lastFiveXTouchMoveIndex = 12;
            swipe.lastFiveXToucheMoveSum = 23;

            ///const touch = event.changedTouches[0];
            swipe.swipeSpeed = 5;
            swipe.dist = 30;
            swipe.startTime = 0;

            swipe.onTouchStart(100, 200);

            expect(swipe.lastFiveXTouchMove).toEqual([]);
            expect(swipe.lastFiveXTouchMoveIndex).toEqual(0);
            expect(swipe.lastFiveXToucheMoveSum).toEqual(0);

            expect(swipe.swipeSpeed).toEqual(0);
            expect(swipe.dist).toEqual(0);
            expect(swipe.startTime).not.toBe(0);

            expect(swipe.startX).toEqual(100);
            expect(swipe.lastX).toEqual(100);
            expect(swipe.startY).toEqual(200);


        });

        test.each([
            [200, 0, 1, -100],
            [250, 1, 2, -50],
            [260, 2, 3, -10],
            [-200, 3, 4, 460],
            [-180, 4, 0, -20],
            [-100, 0, 1, -80],
        ])("onTouchMove - calc speed, set lastFiveXTouchMove and lastFiveXTouchMoveIndex, lastX", (pageX, index, indexExpected, speedExpected) => {

            swipe.onTouchMove(pageX);

            expect(swipe.lastFiveXTouchMove[index]).toEqual(speedExpected);
            expect(swipe.lastFiveXTouchMoveIndex).toEqual(indexExpected);
            expect(swipe.lastX).toEqual(pageX);

        });

        test("onTouchEnd - set dist and elapsedTime", (done) => {

            swipe = new IsSwipe();
            swipe.startTime = new Date().getTime();


            setTimeout( () => {

                swipe.onTouchEnd(100);

                expect(swipe.dist).toEqual(100);
                expect(swipe.elapsedTime).toBeLessThan(200);
                done();

            }, 70);

        });

    });

    describe("Identify swipe", () => {

        test.each([
            [100, 101, 100, 129, 10, 0, 100, false],
            [100, 101, 200, 129, 101, 0, 100, false],
            [100, 101, 200, 129, 10, 0, 100, true],
        ])("isSwipe", (elapsedTime, allowedTime, dist, threshold, pageY, startY, restraint, expectedIsSwipe) => {

            //this.elapsedTime <= this.allowedTime && Math.abs(this.dist) >= this.threshold && Math.abs(pageY - this.startY) <= this.restraint
            swipe.elapsedTime = elapsedTime;
            swipe.allowedTime = allowedTime;
            swipe.dist = dist;
            swipe.threshold = threshold;
            //swipe.pageY = pageY;
            swipe.startY = startY;
            swipe.restraint = restraint;

            expect(swipe.isSwipe(pageY)).toEqual(expectedIsSwipe);

        });

        test.each([
            [ [1, 2, 3, 4, 5], 20, 10, 100, false, 15 ],
            [ [1, 2, 3, 4, 50], 200, 10, 100, false, 60 ],
            [ [1, 2, -100, 4, 500], 20, 10, 100, true, 407 ],
        ])("isSwipeAfterMoving - first counting lastFiveXToucheMoveSum, then check swipe", (lastFiveXTouchMove, pageY, startY, restraint, expectedIsSwipe, expectedLastFiveXToucheMoveSum) => {

            swipe.startY = startY;
            swipe.restraint = restraint;
            swipe.lastFiveXTouchMove = lastFiveXTouchMove;

            expect(swipe.isSwipeAfterMoving(pageY)).toEqual(expectedIsSwipe);
            expect(swipe.lastFiveXToucheMoveSum).toEqual(expectedLastFiveXToucheMoveSum);

            swipe.lastFiveXToucheMoveSum = 0;

        });

    });


});