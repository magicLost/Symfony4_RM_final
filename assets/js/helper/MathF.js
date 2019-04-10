export default class MathF
{

    static toRadians = (angle) => {

        return angle * (Math.PI / 180);

    };

    static toDegrees = (angle) => {

        return angle * (180 / Math.PI);

    };

    static sinDegrees = (angleDegrees) => {

        return Math.sin( angleDegrees * Math.PI/180 );

    };

    static cosDegrees = (angleDegrees) => {

        return Math.cos( angleDegrees * Math.PI/180 );

    };

    static clamp = (number, min, max) => {

        //return Math.min(Math.max(number, min), max);
        return number <= min ? min : number >= max ? max : number;

    };

}