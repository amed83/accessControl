import React from 'react';
import { Button,Input} from 'semantic-ui-react';
import classes from './CreateDataSet.css'
import {creatingDataSet} from '../../actions/index'
import { Field, reduxForm,reset } from 'redux-form';

const renderField = ({input,placeholder})=> (

      <div className={classes.InputForm} >
          <Input {...input} placeholder={placeholder}/>
      </div>
)



const CreateDataSet = ({handleSubmit, input})=> {
     return(
       <div className={classes.MainContainer}>
           <form onSubmit={handleSubmit}  >
               <Field
                 name="data_owner"
                 component={renderField}
                 placeholder="Owner"
                  />
                <Field
                  name="data_description"
                  component={renderField}
                  placeholder="Description"
                 />
                 <Field
                   name="data_format"
                   component={renderField}
                   placeholder="Format"
                  />
                  <Field
                    name="data_year"
                    component={renderField}
                    placeholder="Year"
                   />
                 <Field
                   name="access_conditions"
                   component={renderField}
                   placeholder="Access Condition"
                 />
            <Button className={classes.Button} primary type="submit">Create</Button>
          </form>
       </div>
     )
}

const onSubmit = (values, dispatch) => {
   dispatch(creatingDataSet(values))
};

const afterSubmit = (result, dispatch)=> {
   dispatch(reset('dataset'))
}

export default reduxForm({
  form:'dataset',
  onSubmit,
  onSubmitSuccess:afterSubmit
}) (CreateDataSet)
