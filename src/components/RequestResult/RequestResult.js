import React from 'react';

import classes from './RequestResult.css'

const RequestResult = (props) => {
  return(
      <div className= {classes.Results}>
           <h3>Request Accepted </h3>
            <b>Transaction Id:</b> {props.results.id}
      </div>
  )



}


export default RequestResult
