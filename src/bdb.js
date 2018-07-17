import reconnectCore from 'reconnect-core'
import SimpleWebsocket from 'simple-websocket'
import * as driver from 'bigchaindb-driver'


export const BDB_SERVER_URL = process.env.REACT_APP_BDB_SERVER_URL || 'http://localhost:9984'
export const BDB_API_PATH = `${BDB_SERVER_URL}/api/v1/`
export const BDB_WS_URL = process.env.REACT_APP_BDB_WS_URL || 'ws://localhost:9985'
export const BDB_WS_PATH = `${BDB_WS_URL}/api/v1/streams/valid_transactions`
console.log('BDB_SERVER_URL', BDB_SERVER_URL)
console.log('BDB_WS_URL', BDB_WS_URL)

const conn = new driver.Connection(BDB_API_PATH)

export const keypair = (seed) => new driver.Ed25519Keypair(seed.slice(0, 32))

export const publish = (publicKey, privateKey, payload, metadata) => {

    const tx = driver.Transaction.makeCreateTransaction(
        payload,
        {metadata:'create new asset',
         timestamp: new Date()},
        [
            driver.Transaction.makeOutput(
                driver.Transaction.makeEd25519Condition(publicKey))
        ],
        publicKey
    )

    const txSigned = driver.Transaction.signTransaction(tx, privateKey)

    return conn.postTransactionCommit(txSigned)
          .then(() =>txSigned)
}



export  async function requestAccess (keypair, assetId) {

      const assetOwnerKey = await conn.getTransaction(assetId)
      const assetOwnerPublicKey = assetOwnerKey.inputs[0].owners_before[0]
      let txCreateRequest;

        txCreateRequest = driver.Transaction.makeCreateTransaction(

             {asset:assetId},
             {metadata:'request asset',
              timestamp: new Date()},            // to avoi double spent error
             [
               driver.Transaction.makeOutput(
                   driver.Transaction.makeEd25519Condition(keypair.publicKey))
             ],
             keypair.publicKey
         )

       const txCreateRequestSigned = driver.Transaction.signTransaction(txCreateRequest,keypair.privateKey)
       await conn.postTransactionCommit(txCreateRequestSigned)

       const txTransferAsset = driver.Transaction.makeTransferTransaction(
          [{tx:txCreateRequestSigned,output_index:0}],
           [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(assetOwnerPublicKey))],
          {TransferRequestTo: 'Asset Owner'}
       )

       const txTransferAssetSigned = driver.Transaction.signTransaction(txTransferAsset,keypair.privateKey)
       return conn.postTransactionCommit(txTransferAssetSigned)

}

export async function  ownerApproveRequest (txTransferAssetSigned,assetOwnerPrivateKey,assetOwnerPublicKey,accessorPublicKey,unspent=undefined) {

const documentAddress = 'https://docs.google.com/document/d/1qww-kuxo0f0KfQmE8vDbd7YxmdPxzMM6Hj1aADxQ3yE/edit'

      const inputTransactions = []
      const list = await conn.listTransactions(txTransferAssetSigned.asset.id)
       .then(txList=> {
             if (txList.length <= 1) {
             return txList
             }
              txList.forEach((tx) => {
                  tx.inputs.forEach(input => {
                  // Create transaction have fulfills = null
                  if (input.fulfills) {
                      inputTransactions.push(input.fulfills.transaction_id)
                     }
                  })
              })

            return txList.filter((tx) => inputTransactions.indexOf(tx.id) === -1)
       })

        const Transactions = await conn.getTransaction(list[0].id)


               const txTransferToAccessor = driver.Transaction.makeTransferTransaction(
                 [{tx:Transactions, output_index:0}],
                 [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(accessorPublicKey))],
                 {address:documentAddress}
               )

           const txTransferToAccessorSigned = driver.Transaction.signTransaction(txTransferToAccessor,assetOwnerPrivateKey)

           return conn.postTransactionCommit(txTransferToAccessorSigned)

 }




   // return conn.listOutputs(assetOwnerPublicKey,unspent)
   //   .then(list=> {
   //
   //      return conn.getTransaction(list[list.length-1].transaction_id)
   //       .then(response=> {
   //             if(response.outputs[0].public_keys== assetOwnerPublicKey){
   //                const txTransferToAccessor = driver.Transaction.makeTransferTransaction(
   //                  [{tx:response, output_index:0}],
   //                  [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(accessorPublicKey))],
   //                  {address:documentAddress}
   //                )
   //
   //                const txTransferToAccessorSigned = driver.Transaction.signTransaction(txTransferToAccessor,assetOwnerPrivateKey)
   //
   //                return conn.postTransactionCommit(txTransferToAccessorSigned)
   //               }
   //       })
   //   })



export const searchAssets = (search) =>
  conn.searchAssets(search)
    .then(assetList => assetList.map(asset => asset))



export function connect(handleEvent) {
    console.log(`subscribing to ${BDB_WS_PATH}`) // eslint-disable-line no-console

    const reconnect = reconnectCore(() => new SimpleWebsocket(BDB_WS_PATH))



    return new Promise((resolve, reject) => {
        this.connection = reconnect({ immediate: true }, (ws) => {
            ws.on('open', () => {
                console.log(`ws connected to ${BDB_WS_PATH}`) // eslint-disable-line no-console
            })
            ws.on('data', (msg) => {
                const ev = JSON.parse(msg)
                handleEvent(ev)
            })
            ws.on('close', () => {
                console.log(`ws disconnected from ${BDB_WS_PATH}`) // eslint-disable-line no-console
            })
        })
        .once('connect', () => resolve(null))
            .on('error', (err) => {
                console.warn(`ws error on ${BDB_WS_PATH}:  ${err}`) // eslint-disable-line no-console
                reject(err)
            })
            .connect()
    })
}
