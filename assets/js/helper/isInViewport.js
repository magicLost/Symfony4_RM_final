

const isInViewport = (element, fromTop = false) => {

    const distance = element.getBoundingClientRect();
    //console.log(distance);
    //console.log("document.clientHeight == " + document.documentElement.clientHeight);
    //console.log("is visible == " + (distance.top <= document.documentElement.clientHeight));

    if(fromTop){

        return distance.top + distance.height > 0;

    }

    return distance.top <= document.documentElement.clientHeight;

};

export default isInViewport;