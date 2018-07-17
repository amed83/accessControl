
import React , { Component } from 'react';
import {connect } from 'react-redux';
import Home from  '../../components/Home/Home'
import {addDataSet,showingOldAssets} from '../../actions/index'
import CreateDataSet from '../../components/CreateDataSet/CreateDataSet'
import RequestResult from '../../components/RequestResult/RequestResult'

class HomeContainer extends Component {

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
        <Home props={'fuck'}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
