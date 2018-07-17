
import {
       ADD_DATA_SET,CREATING_DATA_SET,
       SET_KEYPAIR,SUBMIT_PROFILE,
       QUERY_ASSET,CREATING_ACCESSOR,
       SHOW_ACCESSOR_FORM,REQUEST_RESULT,
       ACCEPT_REQUEST,REJECT_REQUEST,OLD_ASSETS,
       OLD_ASSETS_RESULTS  } from './constants'

import Asset from './asset'
import * as bdb from '../bdb'
import bip39 from 'bip39'
import { push } from 'react-router-redux'

export function addDataSet(dispatch){
      return{
        type:ADD_DATA_SET
      }
}

export function creatingDataSet(){
   return (dispatch,getState)=> {
      const form = getState().form
      const dataSet ={
        owner:form.dataset.values.data_owner,
        description:form.dataset.values.data_description,
        format:form.dataset.values.data_format,
        year: form.dataset.values.data_year,
        conditions:form.dataset.values.access_conditions
      }
      const keypair = bdb.keypair(bip39.mnemonicToSeed(dataSet.owner))
      dataSet.publicKey = keypair.publicKey
      dataSet.privateKey = keypair.privateKey
      const profileAsset = new Asset(dataSet)

      dispatch({
        type:CREATING_DATA_SET,
        dataSet,
        keypair
      })
      dispatch(submitProfile(dataSet,profileAsset))
   }
}

export function submitProfile(dataSet,profileAsset){
      return(dispatch,getState)=>{
          profileAsset.create(dataSet,dispatch,getState)
          dispatch({
            type:SUBMIT_PROFILE
         })
      }
}

export function queryAsset(asset){
        return(dispatch) => {
          bdb.searchAssets(asset.search)
            .then(queryResult=> dispatch({
                  type:QUERY_ASSET,
                  queryResult
            }))
        }
}
let assetIdToTransfer= "";

export function creatingAccessor(accessor_name,assetId){
    assetIdToTransfer = assetId
    return(dispatch,getState)=>{
         const form = getState().form
         const accessorData= form.accessors.values.accessor_name
         const keypair = bdb.keypair(bip39.mnemonicToSeed(accessorData))

         dispatch({
           type:CREATING_ACCESSOR,
           payload:{
             name:accessor_name,
             publicKey:keypair.publicKey
           },
           keypair
         })

           bdb.requestAccess(keypair,assetId)
             .then(response=> dispatch({
                type:REQUEST_RESULT,
                response
             }))
    }

}

export function showAccessorForm(index){
      return{
         type:SHOW_ACCESSOR_FORM,
         index
      }
}

export function rejectRequest(){
   return {
     type:REJECT_REQUEST
   }
}

export function acceptRequest(){
      return(dispatch,getState)=>{
         const accessorPublicKey = getState().main.accessorKeypair.publicKey
         const assetOwnerPrivateKey = getState().main.queryResult[0].data.privateKey
         const assetOwnerPublicKey = getState().main.requestResults.outputs[0].public_keys[0]
         const txTransferAssetSigned = getState().main.requestResults
         bdb.ownerApproveRequest(txTransferAssetSigned,assetOwnerPrivateKey,assetOwnerPublicKey,accessorPublicKey)
           .then(result=>  dispatch({type:ACCEPT_REQUEST, result:result}) )
            .catch(error=> dispatch({type:ACCEPT_REQUEST, result:error}))

      }
}

export function showingOldAssets(assetOwner){
        return(dispatch)=>{
           dispatch({
             type:OLD_ASSETS
           })

           bdb.searchAssets(assetOwner)
           .then(response=> dispatch({
                 type:OLD_ASSETS_RESULTS,
                 payload:response
             }))
        }
}
