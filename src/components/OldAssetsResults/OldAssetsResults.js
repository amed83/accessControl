import React  from 'react';
import {connect} from 'react-redux'
import classes from './OldAssetsResults.css'
import {Divider} from 'semantic-ui-react';

const OldAssetsResults = (props) => {

      let oldAssets;
      if(props.queryResults.length>0) {
        oldAssets=  props.queryResults.map((asset,index)=>{
            return(
                  <ul key= {index}>
                      <li> <b>Owner:</b> {asset.data.owner} </li>
                      <li> <b>Description:</b>{asset.data.description} </li>
                      <li> <b>Format:</b>{asset.data.format} </li>
                      <li> <b>Year:</b>{asset.data.year} </li>
                      <Divider />
                  </ul>

            )

        })
      }
      return(
         <div className={classes.AssetsList}>
              {oldAssets}

         </div>
      )

}

const mapStateToProps = state => ({
    queryResults:state.main.oldAssetQuery
})


export default connect(mapStateToProps)(OldAssetsResults)
