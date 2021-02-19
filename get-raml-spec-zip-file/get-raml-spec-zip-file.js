//const request = require('request')
const request = require('postman-request')
const fs = require('fs')

const getRamlSpecZipFile = (requestParams) => {
    return new Promise((resolve, reject) => {
    
        const url = `${requestParams.host}/exchange/files/api/v1/organizations/${requestParams.orgId}/assets/${requestParams.groupId}/${requestParams.asset.id}/${requestParams.asset.assetVersion}/fat-raml/zip`
        const file = fs.createWriteStream(requestParams.ramlDestinationFile)
        const sendReq = request.get(url)
    
        // verify response code
        sendReq.on('response', (response) => {
            if (response.statusCode !== 200) {
                reject(`Response status was ${response.statusCode}`)
            }
            sendReq.pipe(file)
        })
    
        file.on('finish', () => {
                file.close()
                resolve('Download completed successfully.')
            }
        )
    
        sendReq.on('error', (err) => {
            fs.unlink(requestParams.ramlDestinationFile)
            reject(err.message)
        })
    
        file.on('error', (err) => {
            fs.unlink(requestParams.ramlDestinationFile)
            reject(err.message)
        })
    }) 
        
}

module.exports = getRamlSpecZipFile