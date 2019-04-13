import React from 'react';
import classes from './Paragraph.module.scss';

//const paragraph1 = [ "Hello, ", "^a", "^i", " friend."];
const paragraph1 = [ "Hello, ", " friend."];
const links = [{
    title: "my",
    href: '#'
}];

const getContent = () => {

    let final_paragraph = [];

    for(let i = 0; i < paragraph1.length; i++){

        final_paragraph.push(<>{paragraph1[i]}</>);

        if(i < paragraph1.length - 1){

            final_paragraph.push(<a href={links[i].href}>{links[i].title}</a>);

        }

    }

};

const paragraph = () => {

    return (
        
        <p className={classes.Paragraph}>

            { getContent() }

        </p>
            
    );
};

export default paragraph;
        