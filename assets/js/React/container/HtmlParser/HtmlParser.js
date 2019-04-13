import React from 'react';
import classes from './HtmlParser.module.scss';
import PropTypes from 'prop-types';


class HtmlParser extends React.PureComponent
{
   /* constructor(props){
        super(props);
    }*/
    
    render(){

        const paragraphs = this.props.items.map((value) => {

            switch(value.type){
                case "p": return this.getParagraph(value);
                case "ul": return this.getList(value.list);

                default: console.error("Unknown type === " + value.type); return null;
            }


        });


        //this.getParagraph(html_array[0]);

        return (
        
            <div className={classes.HtmlParser}>

                { paragraphs }

            </div>
            
        );
    }
    

    getParagraph = (paragraph) => {

        let header = (paragraph.header && paragraph.header.type) ? this._getHeader(paragraph.header) : null;
        let content = this._getContent(paragraph);
        let key = this._getKey();

        return (
            <div key={key} className={classes.Wrapper}>
                {header}
                <p className={classes.Paragraph}>{content}</p>
            </div>
        ) ;

    };

    getList = (list) => {

        let key = this._getKey();

        const items = list.map((value) => {

            let key = this._getKey();

            if(typeof value === "string"){

                return <li className={classes.Item} key={key}>{ value }</li>;

            }else if(typeof value === "object"){

                return <li className={classes.Item} key={key}><a className={classes.Link} href={value.href}>{ value.text }</a></li>;

            }else{

                console.error("BAd value...");
                return null;

            }

        });

        return <ul key={key} className={classes.List} >{ items }</ul>;



    };


    _getContent = (paragraph) => {

        let content = [];

        let key = 0;
        let linkCount = 0;
        let textCount = 0;

        for(let i = 0; i < paragraph.content.length; i++){

            key = this._getKey();

            switch (paragraph.content[i]) {

                case "^a":

                    if(paragraph.links && paragraph.links[linkCount]){

                        content.push(
                            <a className={classes.Link} key={key} href={paragraph.links[linkCount].href}> {paragraph.links[linkCount].title} </a>
                        );
                        linkCount++; break;

                    }else{

                        console.error("No link...");break;

                    }

                case "^p":

                    if(paragraph.text && paragraph.text[textCount]){

                        content.push(<span key={key} >{paragraph.text[textCount]}</span>);
                        textCount++;break;

                    }else{

                        console.error("No text...");break;

                    }

                default: console.error("Unknown content type === " + paragraph.content[i]);break;

            }

        }

        return content;

    };

    _getHeader = (header) => {

        let key = this._getKey();

        if(header !== null && header !== undefined){

            switch (header.type) {
                case "h1": return (<h1 key={key} className={classes.Title}>{header.text}</h1>);
                case "h2": return (<h2 key={key}  className={classes.Title}>{header.text}</h2>);
                case "h3": return (<h3 key={key}  className={classes.Title}>{header.text}</h3>);
                case "h4": return (<h4 key={key}  className={classes.Title}>{header.text}</h4>);
                case "h5": return (<h5 key={key}  className={classes.Title}>{header.text}</h5>);

                default: console.error("Bad header type == " + header.type);

            }

        }else{
            console.error("Bad header ");
        }

    };
    

    _getKey = () => {

        return Math.floor(Math.random() * (12000 - 38)) + 1;

    };
}

HtmlParser.propTypes = {

    //hasControls: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
 
};

export default HtmlParser;
        