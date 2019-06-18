import React from 'react';
import Button from "@material-ui/core/Button";
import MileStones from "../Components/stepper";
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as excludingWords from '../excludingWords.json';
var randomWords = require('random-words');

const dictionary = excludingWords.default;


//import { makeStyles } from '@material-ui/core/styles';
//import { red } from '@material-ui/core/colors';
//import Icon from '@material-ui/core/Icon';

console.log(randomWords({exactly: 1, minLength: 5}))






//c5e8ace1-2ce9-4e02-826d-81e1814c4a17
//https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=c5e8ace1-2ce9-4e02-826d-81e1814c4a17


let open = false;

class Word extends React.Component {

    state = {
        value: null,
        initialWords : ['name', 'planet', 'curiosity', 'love','feelings', 'house'],
        theWord :"",
        chain:[],
        currentDescription:'',
        textArr:[],
        curIndex:-1,
        theEnd:false
    };




    constructor(props) {
        super(props);
        this.start = this.start.bind(this);
        this.getDefinition = this.getDefinition.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.handleStep = this.handleStep.bind(this);
        this.isFinished = this.isFinished.bind(this);
        this.snackbarHandleClose = this.snackbarHandleClose.bind(this);

    }

    prev(){
        if(this.state.curIndex<=0){
            return;
        }
        this.setState({curIndex:this.state.curIndex-1, theWord:this.state.chain[this.state.curIndex-1].searchedWord, textArr: this.state.chain[this.state.curIndex-1].description.split(" ")})
    }

    next(){
        if(this.state.curIndex===this.state.chain.length-1){
            return;
        }

        this.setState({curIndex:this.state.curIndex+1, theWord:this.state.chain[this.state.curIndex+1].searchedWord, textArr: this.state.chain[this.state.curIndex+1].description.split(" ")})
    }

    start(){

        let me =  this;
        let firstWord = randomWords({exactly: 1, minLength: 5})[0]
        this.setState({chain:[],theWord:firstWord, theEnd:false},() => {
            me.getDesc();
        });


    }

    getDefinition(e, word){

        this.setState({theWord:word, chain:this.state.chain.slice(0,this.state.curIndex+1)},()=>{this.getDesc();});

    }


    handleStep(index){
        this.setState({curIndex:index, theWord:this.state.chain[index].searchedWord, textArr: this.state.chain[index].description.split(" ")})
    }

    isFinished(){
        this.state.textArr.forEach((currentItem, index)=>{
            if(!dictionary.hasOwnProperty(currentItem)){
                if(currentItem===this.state.chain[0].searchedWord){
                    this.setState({theEnd:true},()=>{open = true})
                }
            }
        })
    }

    getDesc(){

        let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/word?key=c5e8ace1-2ce9-4e02-826d-81e1814c4a17';
        url = url.replace('word',this.state.theWord);
        let me = this;
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(response => {
                let text = "";
                response[0].shortdef.forEach(x=>text+=" "+x);
                if(me.state.curIndex===3){
                    let tmp= text.split(" ");
                    tmp[0] = this.state.chain[0].searchedWord;
                    text = tmp.join(" ");
                }

                me.setState({curIndex: me.state.curIndex + 1, currentDescription:text,textArr:text.split(" "),chain:me.state.chain.concat({searchedWord:me.state.theWord, description:text})},()=>{this.isFinished()});

            })
            .catch(error => console.error('Error:', error));


    }


    snackbarHandleClose(){
        //this.start();
        open = false;

    }


    render() {
        return (
            <div>

            <Button variant="contained" color="primary"
                onClick={this.start}>
                START
            </Button>

                <Button onClick={this.prev}>Prev</Button>
                <Button onClick={this.next}>Next</Button>
                <h2>{this.state.theWord}</h2>
                <MileStones  activeStep={this.state.curIndex} chain={this.state.chain}  handleStep = {this.handleStep}/>


           {/*     <div>{this.state.chain.map((x,i)=>{
                    return <span key={"_"+i}>{x.searchedWord}"->"</span>
                })}</div>*/}
            <div style={{'width':'90%',
                'textAlign':'left',
                'borderRadius':'15px',
                'border':'1px solid #ededed',
                'padding':'2em'}}>{this.state.textArr.map((currentItem, index)=>{
                if(!dictionary.hasOwnProperty(currentItem)){
                    return <div key={'cont_'+index}  style={{'display':'inline'}}><Link key={'lnk_'+index}  component="button" variant="body2" onClick={(e) => {this.getDefinition(e,currentItem)}}>{currentItem}</Link><span key={'sp_'+index} > </span></div>
                }else{
                    return currentItem  + " "
                }

            })}</div>

                <div style={{'display':(this.state.theEnd?'block':'none'),'color':'white', 'fontWeight':'bold','margin':'30px 0 0 0','border':'1px solid #e35bea', 'padding':'2em', 'borderRadius':'15px', 'background':'#e35bea', 'boxShadow':'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                    Congratulations! You finished with {this.state.chain.length} steps
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClose={this.snackbarHandleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Congratulations! You finidshed with {this.state.chain.length} steps</span>}
                    action={[

                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                           /* className={classes.close}*/
                            onClick={this.snackbarHandleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>

        );
    }
}

export default Word;
