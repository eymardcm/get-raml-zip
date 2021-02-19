//const request = require('request')
const request = require('postman-request')

const getEnvironments = (requestParams) => {
    return new Promise((resolve, reject) => {
        
        const url = `${requestParams.host}/accounts/api/organizations/${requestParams.orgId}/environments`
        
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
                var result = response.body.data.filter(val => val.name == 'BETA');
                const data = {
                    organizationID: result[0].organizationId,
                    environmentId: result[0].id
                }
                resolve(data)
            } 
        });
    })   
}

module.exports = getEnvironments