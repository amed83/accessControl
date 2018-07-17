import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import {routerReducer } from 'react-router-redux'

import {ADD_DATA_SET,SET_KEYPAIR,
        CREATING_DATA_SET,SUBMIT_PROFILE,QUERY_ASSET,
        CREATING_ACCESSOR,SHOW_ACCESSOR_FORM,
        REQUEST_RESULT,ACCEPT_REQUEST,REJECT_REQUEST,OLD_ASSETS,
        OLD_ASSETS_RESULTS  } from '../actions/constants'

const initialState= {

  addDataSet:false,
  showQueryResult:false,
  dataSet:[],
  keypair:[{
    publicKey:null,
    privateKey:null
  }],
  queryResult:[],
  accessorData:[],
  showAccessorForm:false,
  index:null,
  accessorKeypair:[{
    publicKey:null,
    privateKey:null
  }],
  requestResults:null,
  receiveRequest:false,
  acceptRequest:false,
  requestRejected:false,
  acceptRequestResult:null,
  showOldAssets:false,
  oldAssetQuery:[]

}

function mainReducer(state=initialState,action) {

  switch(action.type) {
    case ADD_DATA_SET:
      return{
        ...state,
        addDataSet:true,
        showQueryResult:false,
        showOldAssets:false
      }

      case CREATING_DATA_SET:{
        return{
           ...state,
           dataSet:[
              ...state.dataSet,
              action.dataSet
           ],
           keypair:{
             publicKey:action.keypair.publicKey,
             privateKey:action.keypair.privateKey
           },
           addDataSet:false
        }
   }

   case SUBMIT_PROFILE : {
       return {
         ...state
       }
   }


    case QUERY_ASSET: {
        return {
          ...state,
          queryResult:action.queryResult,
          showQueryResult:true
        }

    }

    case CREATING_ACCESSOR: {
         return {
           ...state,
           accessorData:[
              ...state.accessorData,
              action.payload
           ],
           accessorKeypair:{
             publicKey:action.keypair.publicKey,
             privateKey:action.keypair.privateKey
           },
           receiveRequest:true
         }
    }

    case SHOW_ACCESSOR_FORM: {
         return {
           ...state,
           showAccessorForm:true,
           index:action.index
         }
    }

    case REQUEST_RESULT: {
         return{
           ...state,
           requestResults:action.response,
           addDataSet:false
         }
    }

    case ACCEPT_REQUEST : {
        return {
           ...state,
           acceptRequest:true,
           acceptRequestResult:action.result
        }
    }

    case REJECT_REQUEST : {
        return {
          ...state,
          requestRejected:true
        }
    }

    case OLD_ASSETS: {
        return {
           ...state,
           showOldAssets:true,
           addDataSet:false
        }
    }

    case OLD_ASSETS_RESULTS: {
         return {
            ...state,
            oldAssetQuery:action.payload
         }
    }

    default:
    return state;


  }
}

const reducer = combineReducers({
      form:formReducer,
      main:mainReducer,
      router:routerReducer
})

export default reducer;
