//const request = require('request')
const request = require('postman-request')

const getApplicationEnvironments = (requestParams) => {
    return new Promise((resolve, reject) => {
        const url = `${requestParams.host}/apimanager/api/v1/organizations/${requestParams.orgId}/environments/${requestParams.environmentId}/apis`
    
        const options = {
            url: url,
            json: true,
            auth: {
                bearer: requestParams.credentials.token
            }
        }
    
        request(options, (error, response) => {
            if (error) {
                reject(error)
            } else {
                const data = response.body.assets.filter(assets => assets.assetId == requestParams.asset.id)
                const dataVersion = data[0].apis.filter(versions => versions.productVersion === requestParams.asset.productVersion)
                resolve(
                    {
                        groupId: dataVersion[0].groupId,
                        assetId: dataVersion[0].assetId,
                        assetVersion: dataVersion[0].assetVersion
                    }
                )
            } 
        });
    })  
}

module.exports = getApplicationEnvironments