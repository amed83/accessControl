import React , { Component } from 'react';
import {connect} from 'react-redux'

const OldAssetsResults = (props) => {

      let oldAssets;
      if(props.queryResults.length>0) {
        oldAssets=  props.queryResults.map(asset=>{
            return(
                  <div>
                    Owner: {asset.data.owner}
                  </div>
            )

        })
      }
      return(
         <div>
              {oldAssets}

         </div>
      )

}

const mapStateToProps = state => ({
    queryResults:state.main.oldAssetQuery
})


export default connect(mapStateToProps)(OldAssetsResults)
