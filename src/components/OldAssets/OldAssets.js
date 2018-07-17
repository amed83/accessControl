import React , { Component } from 'react';
import {Divider, Button,Input} from 'semantic-ui-react';
import { Field, reduxForm,reset } from 'redux-form';
import classes from './OldAssets.css'
import {showingOldAssets} from '../../actions/index'
import OldAssetsResults from '../OldAssetsResults/OldAssetsResults'

const renderField = ({input,placeholder})=> (

      <div className={classes.InputForm} >
          <Input {...input} placeholder={placeholder}/>
      </div>
)


const OldAssets = ({handleSubmit})=> {
    return(
         <div>
            <form onSubmit={handleSubmit} >
                <Field
                  name="data_owner"
                  component={renderField}
                  placeholder="Insert your name"
                />
            </form>
            <OldAssetsResults />
         </div>
    )
}


const onSubmit= (value, dispatch)=> {
    dispatch(showingOldAssets(value.data_owner))
}

const afterSubmit = (result, dispatch)=> {
   dispatch(reset('oldassets'))
}

export default reduxForm({
    form:'oldassets',
    onSubmit,
    onSubmitSuccess:afterSubmit
})(OldAssets)
