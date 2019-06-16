import React from 'react';
import Button from "@material-ui/core/Button";
//import App from "../App";



//c5e8ace1-2ce9-4e02-826d-81e1814c4a17
//https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=c5e8ace1-2ce9-4e02-826d-81e1814c4a17




class Word extends React.Component {
    state = {
        value: null,
        initialWords : ['name', 'planet', 'curiosity', 'love','feelings', 'house'],
        theWord :"",
        chain:[],
        currentDescription:'',
        textArr:[]
    };


    constructor(props) {
        super(props);
        this.start = this.start.bind(this);
        this.next = this.start.bind(this);

    }

    start(){
        let rand = Math.abs(Math.floor(Math.random() * 10) - 5);
        this.setState({chain:[]});
        this.setState({theWord:this.state.initialWords[rand]});
        console.log("state: ",this.state," word:", this.state.initialWords[rand])
        this.getDesc();

    }

    next(word){
        this.setState({theWord:word});
        this.getDesc();
    }


    getDesc(){
        let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/word?key=c5e8ace1-2ce9-4e02-826d-81e1814c4a17';
        //url = url.replace('word',this.state.theWord);
        let me = this;
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                let text = "";
                response[0].shortdef.forEach(x=>text+=x);
                console.log(text);
                me.setState({currentDescription:text});
                console.log("dada1")
                me.setState({textArr:text.split(" ")});
                console.log("dada2")
                me.state.chain.push({searchedWord:this.state.theWord, description:text})
                console.log("dada3")

            })
            .catch(error => console.error('Error:', error));


    }


    render() {
        return (
            <div>
            <Button
                className="square"
                onClick={this.start}>
                START
            </Button>
                <h2>{this.state.theWord}</h2>
            <div>{this.state.textArr.map((currentItem, index)=>{
                if(index%2===0 && currentItem.length>2){
                   return <Button onClick={() => this.next(currentItem)}>{currentItem}</Button>
                }else{
                    return currentItem
                }

            })}</div>
            </div>

        );
    }
}

export default Word;
