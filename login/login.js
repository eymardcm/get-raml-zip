//const request = require('request')
const request = require('postman-request')

const login = (requestParams) => {
    return new Promise((resolve, reject) => {
        const url = `${requestParams.host}/accounts/login?username=${requestParams.credentials.username}&password=${requestParams.credentials.password}`
        const options = {
            url: url,
            json: true
        }

        request.post(options, (error, response) => {
            if (error) {
                // console.log('Error:', error)
                reject(error)
            } else {
                // console.log('Response:', response.body)
                resolve(response.body.access_token)
            } 
        });
    })
    
}

module.exports = login