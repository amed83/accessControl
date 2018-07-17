import React from 'react';
import { Button,Input} from 'semantic-ui-react';
import { Field, reduxForm,reset } from 'redux-form';
import classes from './QueryAsset.css'
import {queryAsset} from '../../actions/index'
import ShowAsset from '../ShowAsset/ShowAsset'
import ShowRequestResult from '../ShowRequestResult/ShowRequestResult'


const renderField = ({input,placeholder})=> (

      <div className={classes.InputForm} >
          <Input {...input} placeholder={placeholder}/>
      </div>
)



const QueryAsset = ({handleSubmit,input,showForm}) => {
    console.log('props in query asset ', showForm)
   return(
          <div className={classes.MainContainer}>
             <form onSubmit={handleSubmit}>
                 <Field
                   name="search"
                   component={renderField}
                   placeholder="Search Asset"
                 />
                 <Button secondary type="submit">Search </Button>
             </form>
             <div className={classes.ShowAsset}>
                  <ShowAsset />
             </div>
            <ShowRequestResult />
        </div>
    )
}


const onSubmit =(value,dispatch)=> {
    dispatch(queryAsset(value))
}

const afterSubmit = (result, dispatch)=> {
   dispatch(reset('query'))
}



export default reduxForm({
  form:'query',
  onSubmit,
  onSubmitSuccess:afterSubmit
})(QueryAsset)
