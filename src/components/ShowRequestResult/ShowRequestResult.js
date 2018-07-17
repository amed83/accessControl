import React from 'react';
import {connect } from 'react-redux'
import classes from './ShowRequestResult.css'

const ShowRequestResult = (props) => {
             const address =  props.acceptingRequest && props.result.metadata ? `${props.result.metadata.address}` : ""
             const child = props.acceptingRequest && props.result.metadata ?
             `Your request has been accepted. Find the asset `
             : ""
             let link = ""
             const result = child && address ? child: ""
             const error = props.result && props.result.message ? "Error, you can't get this Asset" : ""
             if(result){
                 link =  <a href= {address}> Here</a>
             }
             const rejection = props.rejectRequest && !props.acceptingRequest ? "The access has been denied" : ""
       return(
              <div>
                  {result}
                  {link}
                  {error}
                  <div>
                     <span className={classes.Rejection}>{rejection}</span>
                  </div>

              </div>

       )


}


const mapStateToProps = state =>({
    acceptingRequest:state.main.acceptRequest,
    result:state.main.acceptRequestResult,
    rejectRequest:state.main.requestRejected
})


export default connect (mapStateToProps)(ShowRequestResult)
