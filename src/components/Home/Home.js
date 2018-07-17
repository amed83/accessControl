import React , { Component } from 'react';
import {Divider, Button} from 'semantic-ui-react';

import {connect } from 'react-redux';

import classes from './Home.css'
import CreateDataSet from '../../components/CreateDataSet/CreateDataSet'
import QueryAsset from '../../components/QueryAsset/QueryAsset'
import {addDataSet,showingOldAssets} from '../../actions/index'
import RequestResult from '../../components/RequestResult/RequestResult'
import ReceiveRequest from '../../components/ReceiveRequest/ReceiveRequest'
import OldAssets from '../../components/OldAssets/OldAssets'

class Home extends Component {

      handleCreate(){
         this.props.addDataSet()
      }

      handleShow(){
          this.props.showingOldAssets()
      }

      render(){
        let child = this.props.addingDataSet ? <CreateDataSet /> : ""
        let RequestResults =  this.props.showResults ? <RequestResult results={this.props.showResults} /> : ""
        const showAssets= this.props.oldAssets
        return(
              <div>
                      <h1 className={classes.TitleContainer}>Demo App</h1>
                      <Divider />

                      <div className={classes.OuterContainer}>
                            <div className={classes.LeftContainer}>
                                      <h3 className={classes.UserTitle}>Assets Owner</h3>
                                      <div className={classes.MainContainer} >
                                            <Button primary onClick={this.handleCreate.bind(this)}>Create Asset</Button>
                                            <Button color = "green"  onClick={this.handleShow.bind(this)}>Show Assets</Button>
                                            {showAssets && <OldAssets /> }
                                      </div>
                                      <span className={classes.Request}>{this.props.receiveRequest && <ReceiveRequest/>}</span>
                                         {child}
                            </div>
                            <div className={classes.RigthContainer}>
                                   <h3 className={classes.UserTitle}>Recevier</h3>
                                  <QueryAsset showForm={this.props.addingDataSet} />
                            </div>
                      </div>
              </div>
         )
    }

}


const mapDispatchToProps = dispatch => ({
      addDataSet: ()=> dispatch(addDataSet()),
      showingOldAssets:()=> dispatch(showingOldAssets())
})

const mapStateToProps = (state) => ({
    addingDataSet:state.main.addDataSet,
    showResults:state.main.requestResults,
    receiveRequest:state.main.receiveRequest,
    oldAssets:state.main.showOldAssets
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)
