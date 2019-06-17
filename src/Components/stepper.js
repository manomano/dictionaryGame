import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
/*import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';*/





//completed={props.completed[index]}

const MileStones =(props)=>{
    return (<div>
        <Stepper activeStep={props.activeStep}>
            {
                props.chain.map((x, index)=>{
                    return (
                        <Step key={x.searchedWord+'_'+index}>

                            <StepButton onClick={() =>{props.handleStep(index)}} >
                                {x.searchedWord}
                            </StepButton>


                        </Step>



                    );

                })

            }
        </Stepper>
    </div>);

}

export default MileStones;
