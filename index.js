const login = require('./login')
const getEnvironments = require('./get-environments')
const getApplicationEnvironments = require('./get-application-environments')
const getRamlSpecZipFile = require('./get-raml-spec-zip-file')
const requestParams = require('./shared')

var argv = require('yargs/yargs')(process.argv.slice(2))
    //.usage('Usage: $0 <command> [options]')
    
    .option("h", {
        // The alias of -w is --width.
        alias: "anypointhost",
        desc: "Anypoint platform hostname",
        demandOption: "anypointhost is required",
        type: "string"
      })
      .option("o", {
        // The alias of -w is --width.
        alias: "orgid",
        desc: "Anypoint Organization Id",
        demandOption: "orgid is required",
        type: "string"
      })
      .option("a", {
        // The alias of -w is --width.
        alias: "assetid",
        desc: "Asset Id of the RAML spec you intend to retrieve",
        demandOption: "assetid is required",
        type: "string"
      })
      .option("v", {
        // The alias of -w is --width.
        alias: "assetprodver",
        desc: "Asset Product Version of RAML spec you intend to retrieve",
        demandOption: "assetprodver is required",
        type: "string"
      })
      .option("u", {
        // The alias of -w is --width.
        alias: "anypointusername",
        desc: "An Anypoint Platform Username that has access to the RAML spec",
        demandOption: "anypointusername is required",
        type: "string"
      })
      .option("p", {
        // The alias of -w is --width.
        alias: "anypointpassword",
        desc: "An Anypoint Platform password associated with the username",
        demandOption: "anypointpassword is required",
        type: "string"
      })
      .option("d", {
        // The alias of -w is --width.
        alias: "downloadfolder",
        desc: "Name of the download folder you want to receive your downloaded RAML spec",
        demandOption: "downloadfolder is required",
        type: "string"
      })
    .example('node $0 -h anypoint.mulesoft.com -o 000a0000-0ab0-1122-1a1b-000000000000 -a my-great-api -v v1 -u myusername -p mypassword -d /downloads')
    .argv


function assignArgs() {
    requestParams.host = `https://${argv.h}`
    requestParams.orgId = argv.o
    requestParams.asset.id = argv.a
    requestParams.asset.productVersion = argv.v
    requestParams.credentials.username = argv.u
    requestParams.credentials.password = argv.p
    requestParams.downloadFolder = argv.d
}


async function retrieveRamlFromAnypointExchange() {

    // Retrieve a token
    const token = await login(requestParams);
    requestParams.credentials.token = token
    console.log(`Logging token const: ${token}`)
    
    // Retrieve environmentId
    const environment = await getEnvironments(requestParams);
    requestParams.environmentId = environment.environmentId
    console.log(`Logging environment const: ${JSON.stringify(environment)}`)

    // Retrieve the groupId and asset details
    const appEnv = await getApplicationEnvironments(requestParams);
    requestParams.groupId = appEnv.groupId
    requestParams.asset.assetVersion = appEnv.assetVersion
    console.log(`Logging appEnv const: ${JSON.stringify(appEnv)}`)

    // Download the RAML spec in .zip
    const result = await getRamlSpecZipFile(requestParams)
    console.log(`Logging result const:', ${result}`)
    
}

assignArgs()

retrieveRamlFromAnypointExchange()



