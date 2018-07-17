import React  from 'react';
import {Input} from 'semantic-ui-react';
import { Field, reduxForm,reset } from 'redux-form';
import classes from './OldAssets.css'
import {oldAssetsList} from '../../actions/index'
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
            <div className={classes.AssetsList}>
                  <OldAssetsResults />
            </div>

         </div>
    )
}


const onSubmit= (value, dispatch)=> {
  console.log('about to dispatch action ', value)
    dispatch(oldAssetsList(value.data_owner))
}

const afterSubmit = (result, dispatch)=> {
   dispatch(reset('oldassets'))
}

export default reduxForm({
    form:'oldassets',
    onSubmit,
    onSubmitSuccess:afterSubmit
})(OldAssets)
