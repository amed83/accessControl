
import * as bdb from '../bdb'

export default class Asset {
      constructor(data){
          this.owner= data.owner
          this.description= data.description
          this.format= data.format
          this.year= data.year
          this.conditions= data.conditions

      }

      create(assetData,dispatch,getState,metadata=null){
          const form = getState().main.keypair
          const {privateKey, publicKey} = form
          return bdb.publish(
              publicKey,
              privateKey,
              assetData,
              {
                data:metadata
              }
          )
           .then(tx=> console.log('create asset result', tx))
      }


}
