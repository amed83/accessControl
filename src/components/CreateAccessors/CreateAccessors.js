import React from 'react';
import { Input} from 'semantic-ui-react';
import { Field, reduxForm,reset } from 'redux-form';

import {creatingAccessor} from '../../actions/index'


const renderField = ({input, placeholder}) => (
     <div>
          <Input {...input} placeholder={placeholder}/>
    </div>
)


const CreateAccessors = ({handleSubmit, input,assetId}) => {
    return(
          <div>
               <form onSubmit={handleSubmit} >
                  <Field
                    name="accessor_name"
                    component={renderField}
                    placeholder="Accessor Name"
                  />
              </form>
           </div>
         )
}

const onSubmit = (value,dispatch,assetId)=> {
   dispatch(creatingAccessor( value.accessor_name,assetId.assetId))
}

const afterSubmit = (result, dispatch)=> {
   dispatch(reset('accessors'))
}


export default reduxForm({
  form:'accessors',
  onSubmit,
  onSubmitSuccess:afterSubmit
})(CreateAccessors)
