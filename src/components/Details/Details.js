import React from 'react';
import { Button, List} from 'semantic-ui-react';
import ChallengeContainer from '../../containers/ChallengeContainer/ChallengeContainer';
import VoteContainer from '../../containers/VoteContainer/VoteContainer';
import classes from './Details.css'
import FindById from '../../containers/FindById/FindById'


const Details = (props)=> {

   const {name,description,stakes,id} = props.details
   const {onHide}= props

    return(
          <div>
              <List>
                    <div className={classes.DetailsList}>
                        <List.Item><b>Name:</b> {name}   </List.Item>
                        <List.Item> <b>Description:</b> {description}  </List.Item>
                        <List.Item><b>Stakes:</b> {stakes}   </List.Item>
                        <List.Item><b>Id:</b> {id}   </List.Item>
                    </div>
                    <Button color='grey' onClick={onHide} >Hide Details </Button>
              </List>
              <div className={classes.Buttons}>
                    <ChallengeContainer id={id}/>
                    <VoteContainer />
              </div>
              <div className={classes.FindById}>
                      <FindById />
              </div>

          </div>
    )
}


export default Details
