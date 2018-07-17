import React from 'react';
import classes from './ReceiveRequest.css'
import {connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import {acceptRequest, rejectRequest} from '../../actions/index'

const ReceiveRequest = (props)=> {
    const child = props.requestData[props.requestData.length-1]

    return(
         <div className = {classes.Container}>
              You receive a request from <span className={classes.Receiver}>{child.name}</span>
              {child.name} public-key is: <span className={classes.Receiver}> {child.publicKey} </span>
              <div className={classes.ButtonsContainer}>
                 <Button primary onClick={()=>handleClick({...props})}> Accept </Button>
                 <Button color= "red" onClick={()=>handleReject({...props})}>Reject</Button>
              </div>


         </div>
    )
}

const handleReject= (props)=> {
    props.rejectingrequest()
}


const handleClick = (props) => {
   props.acceptingRequest()
}

const mapDispatchToProps = dispatch =>({
    acceptingRequest:()=> dispatch(acceptRequest()),
    rejectingrequest:()=>dispatch(rejectRequest())

})

const mapStateToProps = state => ({
    requestData:state.main.accessorData,
    rejectRequest:state.main.requestRejected
})

export default connect(mapStateToProps,mapDispatchToProps)(ReceiveRequest)
