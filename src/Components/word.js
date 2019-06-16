import React from 'react';
import Button from "@material-ui/core/Button";
//import { makeStyles } from '@material-ui/core/styles';
//import { red } from '@material-ui/core/colors';
//import Icon from '@material-ui/core/Icon';






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
        this.getDefinition = this.getDefinition.bind(this);

    }

    start(){
        let rand = Math.abs(Math.floor(Math.random() * 10) - 5);
        let me =  this;
        this.setState({chain:[],theWord:me.state.initialWords[rand]},() => {
            me.getDesc();
        });


    }

    getDefinition(e, word){

        this.setState({theWord:word});

        this.getDesc();
    }


    getDesc(){
        let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/word?key=c5e8ace1-2ce9-4e02-826d-81e1814c4a17';
        //console.log(this.state.theWord);
        url = url.replace('word',this.state.theWord);
        let me = this;
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                let text = "";
                response[0].shortdef.forEach(x=>text+=" "+x);

                me.setState({currentDescription:text,textArr:text.split(" "),chain:me.state.chain.concat({searchedWord:me.state.theWord, description:text})});

            })
            .catch(error => console.error('Error:', error));


    }


    render() {
        return (
            <div>

            <Button variant="contained" color="primary"

                onClick={this.start}>
                START
            </Button>

                <Button>Prev</Button>
                <Button>Next</Button>
                <h2>{this.state.theWord}</h2>
                <div>{this.state.chain.map((x,i)=>{
                    return <span key={"_"+i}>{x.searchedWord}"->"</span>
                })}</div>
            <div style={{'width':'90%',
                'textAlign':'left',
                'borderRadius':'15px',
                'border':'1px solid #ededed',
                'padding':'2em'}}>{this.state.textArr.map((currentItem, index)=>{
                if(index%2===0 && currentItem.length>3){
                   return <Button key={'btn_'+index} variant="outlined" onClick={(e) => {this.getDefinition(e,currentItem)}}>{currentItem}</Button>
                }else{
                    return currentItem  + " "
                }

            })}</div>
            </div>

        );
    }
}

export default Word;
