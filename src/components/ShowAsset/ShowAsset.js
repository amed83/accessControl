import React from 'react';
import {connect} from 'react-redux'
import classes from './ShowAsset.css'
import {List,Divider, Button} from 'semantic-ui-react'
import CreateAccessors from '../CreateAccessors/CreateAccessors'
import {showAccessorForm} from '../../actions/index'

const ShowAsset = (props)=> {

      const {queryResult,showQueryResult,index,showAccessorForm} = props
      const results= queryResult.length > 0 && showQueryResult ? queryResult.map((result,i)=> {
          return(
                  <div key= {i} className={classes.ListContainer}>
                      <List >
                          <List.Item><b>Owner: </b> {result.data.owner}</List.Item>
                          <List.Item><b>Description: </b> {result.data.description}</List.Item>
                          <List.Item><b>Format: </b> {result.data.format}</List.Item>
                          <List.Item><b>Year: </b> {result.data.year}</List.Item>
                          <List.Item><b>Public Key:</b>{result.data.publicKey} </List.Item>
                          <Button onClick={()=>handleClick({...props}, {i})} >Require Access</Button>
                          <Divider/>

                      </List>
                      <div className= {classes.ShowAccessor}>
                            {showAccessorForm && i === index ? <CreateAccessors assetId={result.id}/> : ""}
                      </div>
                  </div>
          )})
         : ""
      return(
           <div>
                {results}

           </div>
      )

}

const handleClick = (props,index)=> {
    props.showingAccessorForm(index.i)
}


const mapDispatchToProps = dispatch => ({
      showingAccessorForm: (index)=> dispatch(showAccessorForm(index))
})

const mapStateToProps = state => ({
     queryResult: state.main.queryResult,
     showQueryResult:state.main.showQueryResult,
     showAccessorForm:state.main.showAccessorForm,
     index:state.main.index
})


export default connect(mapStateToProps,mapDispatchToProps)(ShowAsset)
